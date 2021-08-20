import * as pj from 'projen';
import { FileBase } from 'projen';
import { Projenrc, ProjenrcOptions } from 'projen/lib/javascript';
import { ProjectOptions } from 'projen/lib/project';
import { maxNodeVersion } from './versions';

export interface SbtPlugin {
  // TODO: for now this is a string but we could type it more nicely
  readonly line: string;
}

export interface SbtProjectOptions extends ProjectOptions {
  readonly sbtVersion?: string;
  readonly projectVersion?: string;
  readonly scalaVersion?: string;

  readonly sbtPlugins?: SbtPlugin[];

  readonly libraryDependencies?: SbtLibraryDependency[];

  readonly projenrcJs?: boolean;
  readonly projenrcJsOptions?: ProjenrcOptions;
}

const defaultSbtVersion = '1.5.5';
const defaultProjectVersion = '1.0-SNAPSHOT';
const defaultScalaVersion = '2.13.6';

const gitIgnored = [
  '**/target/',
  '.idea',
  '.bsp',
];

export type SbtLibraryDependency = string;

export class SbtProject extends pj.Project {
  public static javaDep(org: string, name: string, revision: string, configurations?: string) {
    return SbtProject.dep(org, '%', name, revision, configurations);
  }

  public static scalaDep(org: string, name: string, revision: string, configurations?: string) {
    return SbtProject.dep(org, '%%', name, revision, configurations);
  }

  private static dep(org: string, depSymbol: string, name: string, revision: string, configurations?: string): SbtLibraryDependency {
    const maybeConfigurations = configurations ? ` % "${configurations}"` : '';
    return `"${org}" ${depSymbol} "${name}" % "${revision}"${maybeConfigurations}`;
  }

  readonly sbtPluginsFile: pj.SourceCode;
  readonly buildSbtFile: pj.SourceCode;

  constructor(options: SbtProjectOptions) {
    super(options);

    const sbtVersion = options.sbtVersion ?? defaultSbtVersion;
    const projectVersion = options.projectVersion ?? defaultProjectVersion;
    const scalaVersion = options.scalaVersion ?? defaultScalaVersion;

    const buildPropertiesFile = new pj.SourceCode(this, 'project/build.properties');
    buildPropertiesFile.line(`# ${FileBase.PROJEN_MARKER}`);
    buildPropertiesFile.line(`sbt.version=${sbtVersion}`);

    this.buildSbtFile = new pj.SourceCode(this, 'build.sbt');
    this.buildSbtFile.line(`// ${FileBase.PROJEN_MARKER}`);
    this.buildSbtFile.line(`name := "${options.name}"`);
    this.buildSbtFile.line(`version := "${projectVersion}"`);
    this.buildSbtFile.line(`scalaVersion in ThisBuild := "${scalaVersion}"`);

    options.libraryDependencies?.forEach(dep => {
      this.buildSbtFile.line(`libraryDependencies += ${dep}`);
    });

    this.sbtPluginsFile = new pj.SourceCode(this, 'project/plugins.sbt');
    this.sbtPluginsFile.line(`// ${FileBase.PROJEN_MARKER}`);
    if (options.sbtPlugins) {
      this.addPlugins(...options.sbtPlugins);
    }

    this.addTask('compile', {
      exec: 'sbt compile',
    });

    this.addTask('build', {
      exec: 'sbt clean compile test',
    });

    // generate a projen rc file (without this none is generated)
    const projenrcJs = options.projenrcJs ?? true;
    if (projenrcJs) {
      new Projenrc(this, options.projenrcJsOptions);
    }

    const ciWorkflow = this.github?.addWorkflow('Build');

    ciWorkflow?.on({
      pullRequest: {},
      workflowDispatch: {},
    });

    ciWorkflow?.addJobs({
      Build: {
        runsOn: 'ubuntu-latest',
        steps: [
          { uses: 'actions/checkout@v2' },
          {
            uses: 'actions/setup-node@v2.1.5',
            with: { 'node-version': maxNodeVersion },
          },
          // from https://github.com/actions/cache/blob/master/examples.md#scala---sbt
          // TODO: fix to include coursier
          {
            uses: 'actions/cache@v2',
            with: {
              path: ['~/.ivy2/cache', '~/.sbt'].join('\n'),
              key: "${{ runner.os }}-sbt-${{ hashFiles('**/build.sbt') }}",
            },
          },
          {
            uses: 'actions/setup-java@v2',
            with: { 'java-version': '8', 'distribution': 'adopt' },
          },
          {
            run: 'yarn',
          },
          {
            run: 'npx projen build',
          },
        ],
        permissions: {},
      },
    });


    gitIgnored.forEach(pattern => this.gitignore.exclude(pattern));
  }

  public addPlugins(...plugins: SbtPlugin[]) {
    plugins.forEach(plugin => {
      this.sbtPluginsFile.line(plugin.line);
    });
  }
}
