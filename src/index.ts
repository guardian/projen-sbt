import * as pj from 'projen';
import { ProjectOptions } from 'projen/lib/project';

export interface SbtProjectOptions extends ProjectOptions {
  readonly sbtVersion?: string;
}

const defaultSbtVersion = '1.5.5';

export class SbtProject extends pj.Project {
  constructor(options: SbtProjectOptions) {
    super(options);

    const buildProperties = new pj.SourceCode(this, 'project/build.properties');
    buildProperties.line(`sbt.version=${options.sbtVersion ?? defaultSbtVersion}`);
  }
}
