import * as pj from 'projen';
import { Projenrc, ProjenrcOptions } from 'projen/lib/javascript';
import { ProjectOptions } from 'projen/lib/project';

export interface SbtPlugin {
  // TODO: for now this is a string but we could type it more nicely
  readonly line: string;
}

export interface SbtProjectOptions extends ProjectOptions {
  readonly sbtVersion?: string;
  readonly projectVersion?: string;
  readonly scalaVersion?: string;

  readonly sbtPlugins?: SbtPlugin[];

  readonly projenrcJs?: boolean;
  readonly projenrcJsOptions?: ProjenrcOptions;
}

const defaultSbtVersion = '1.5.5';
const defaultProjectVersion = '1.0-SNAPSHOT';
const defaultScalaVersion = '2.13.6';

export class SbtProject extends pj.Project {
  readonly sbtPluginsFile: pj.SourceCode;

  constructor(options: SbtProjectOptions) {
    super(options);

    const sbtVersion = options.sbtVersion ?? defaultSbtVersion;
    const projectVersion = options.projectVersion ?? defaultProjectVersion;
    const scalaVersion = options.scalaVersion ?? defaultScalaVersion;

    const buildPropertiesFile = new pj.SourceCode(this, 'project/build.properties');
    buildPropertiesFile.line(`sbt.version=${sbtVersion}`);

    const buildSbtFile = new pj.SourceCode(this, 'build.sbt');
    buildSbtFile.line(`name := "${options.name}"`);
    buildSbtFile.line(`version := "${projectVersion}"`);
    buildSbtFile.line(`scalaVersion in ThisBuild := "${scalaVersion}"`);

    this.sbtPluginsFile = new pj.SourceCode(this, 'project/plugins.sbt');
    if (options.sbtPlugins) {
      this.addPlugins(...options.sbtPlugins);
    }

    this.addTask('compile', {
      exec: 'sbt compile',
    });

    // generate a projen rc file (without this none is generated)
    const projenrcJs = options.projenrcJs ?? true;
    if (projenrcJs) {
      new Projenrc(this, options.projenrcJsOptions);
    }
  }

  public addPlugins(...plugins: SbtPlugin[]) {
    plugins.forEach(plugin => {
      this.sbtPluginsFile.line(plugin.line);
    });
  }
}
