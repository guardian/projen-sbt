import { FileBase, JsiiProject, SourceCode } from 'projen';

const minNodeVersion = '14.17.3';
const maxNodeVersion = '18.10.0'
const projenDep = 'projen@0.27.31';

const project = new JsiiProject({
  projenrcTs: true,
  author: 'The Guardian',
  authorAddress: 'devx@theguardian.com',
  defaultReleaseBranch: 'main',
  name: '@guardian/projen-scala-sbt',
  repositoryUrl: 'https://github.com/guardian/projen-scala-sbt.git',
  minNodeVersion: minNodeVersion,
  maxNodeVersion: maxNodeVersion,
  workflowNodeVersion: maxNodeVersion,
  deps: [projenDep],
  peerDeps: [projenDep],
  mutableBuild: false,
  // deps: [],                          /* Runtime dependencies of this module. */
  // description: undefined,            /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],                       /* Build dependencies for this module. */
  // packageName: undefined,            /* The "name" in package.json. */
  // projectType: ProjectType.UNKNOWN,  /* Which type of project this is (library/app). */
  // release: undefined,                /* Add release management to this project. */
});

const packageJson = project.tryFindObjectFile('package.json');
if (packageJson) {
  packageJson.addOverride('publishConfig', { access: 'public' });
}

const nvmrc = new SourceCode(project, '.nvmrc');
nvmrc.line(maxNodeVersion);

const nodeVersions = new SourceCode(project, 'src/versions.ts');
nodeVersions.line(`// ${FileBase.PROJEN_MARKER}`);
nodeVersions.line(`export const minNodeVersion = '${project.minNodeVersion}';`);
nodeVersions.line(`export const maxNodeVersion = '${project.maxNodeVersion}';`);
nodeVersions.line();

project.addExcludeFromCleanup('test/__snapshots__/**');

project.synth();
