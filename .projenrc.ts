import { JsiiProject, SourceCode } from 'projen';

const nodeLTSVersion = '14.17.3';
const projenDep = 'projen@0.27.6';

const project = new JsiiProject({
  projenrcTs: true,
  author: 'The Guardian',
  authorAddress: 'devx@theguardian.com',
  defaultReleaseBranch: 'main',
  name: '@guardian/projen-sbt',
  repositoryUrl: 'https://github.com/guardian/projen-sbt.git',
  minNodeVersion: nodeLTSVersion,
  maxNodeVersion: nodeLTSVersion,
  workflowNodeVersion: nodeLTSVersion,
  deps: [projenDep],
  peerDeps: [projenDep],
  // deps: [],                          /* Runtime dependencies of this module. */
  // description: undefined,            /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],                       /* Build dependencies for this module. */
  // packageName: undefined,            /* The "name" in package.json. */
  // projectType: ProjectType.UNKNOWN,  /* Which type of project this is (library/app). */
  // release: undefined,                /* Add release management to this project. */
});

const nvmrc = new SourceCode(project, '.nvmrc');
nvmrc.line(nodeLTSVersion);

project.synth();
