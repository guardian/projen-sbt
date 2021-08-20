import { LogLevel } from 'projen';
import { synthSnapshot, mkdtemp, SynthOutput } from 'projen/lib/__tests__/util';
import { SbtProject } from '../src';

describe('The SbtProject type', () => {
  const baseOptions = {
    name: 'test',
    outdir: mkdtemp(),
    logging: {
      level: LogLevel.OFF,
    },
  };

  test('a simple SbtProject', () => {
    const sbtProject = new SbtProject(baseOptions);

    const snapshot = synthSnapshot(sbtProject) as SynthOutput;
    expect(snapshot).toMatchSnapshot();
  });

  test('overriding the sbt version', () => {
    const sbtProject = new SbtProject({
      ...baseOptions,
      sbtVersion: 'x.y.z',
    });
    const snapshot = synthSnapshot(sbtProject) as SynthOutput;
    expect(snapshot['project/build.properties']).toMatchSnapshot();
  });

  test('overriding the project version', () => {
    const sbtProject = new SbtProject({
      ...baseOptions,
      projectVersion: 'x.y.z',
    });
    const snapshot = synthSnapshot(sbtProject) as SynthOutput;
    expect(snapshot['build.sbt']).toMatchSnapshot();
  });

  test('overriding the scala version', () => {
    const sbtProject = new SbtProject({
      ...baseOptions,
      scalaVersion: 'x.y.z',
    });
    const snapshot = synthSnapshot(sbtProject) as SynthOutput;
    expect(snapshot['build.sbt']).toMatchSnapshot();
  });

  test('adding sbt plugins', () => {
    const sbtProject = new SbtProject({
      ...baseOptions,
      sbtPlugins: [
        { line: 'addSbtPlugin("com.typesafe.play" % "sbt-plugin" % "2.8.8")' },
        { line: 'libraryDependencies += "org.vafer" % "jdeb" % "1.8" artifacts Artifact("jdeb", "jar", "jar")' },
      ],
    });
    const snapshot = synthSnapshot(sbtProject) as SynthOutput;
    expect(snapshot['project/plugins.sbt']).toMatchSnapshot();
  });
});
