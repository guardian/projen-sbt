import * as pj from 'projen';
import { Projenrc, ProjenrcOptions } from 'projen/lib/javascript';
import { ProjectOptions } from 'projen/lib/project';

export interface SbtProjectOptions extends ProjectOptions {
  readonly sbtVersion?: string;
  readonly projenrcJs?: boolean;
  readonly projenrcJsOptions?: ProjenrcOptions;
}

const defaultSbtVersion = '1.5.5';

export class SbtProject extends pj.Project {
  constructor(options: SbtProjectOptions) {
    super(options);

    const buildProperties = new pj.SourceCode(this, 'project/build.properties');
    buildProperties.line(`sbt.version=${options.sbtVersion ?? defaultSbtVersion}`);

    const projenrcJs = options.projenrcJs ?? true;
    if (projenrcJs) {
      new Projenrc(this, options.projenrcJsOptions);
    }
  }
}
