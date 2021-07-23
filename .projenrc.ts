import { JsiiProject } from 'projen';
const project = new JsiiProject({
  author: 'Akash Askoolum',
  authorAddress: 'akash1810@gmail.com',
  defaultReleaseBranch: 'main',
  name: 'projen-sbt',
  projenrcTs: true,
  repositoryUrl: 'git@github.com:guardian/projen-sbt.git',

  // deps: [],                          /* Runtime dependencies of this module. */
  // description: undefined,            /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],                       /* Build dependencies for this module. */
  // packageName: undefined,            /* The "name" in package.json. */
  // projectType: ProjectType.UNKNOWN,  /* Which type of project this is (library/app). */
  // release: undefined,                /* Add release management to this project. */
});
project.synth();