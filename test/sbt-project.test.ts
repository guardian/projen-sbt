import { LogLevel } from 'projen';
import { synthSnapshot, mkdtemp, SynthOutput } from 'projen/lib/__tests__/util';
import { SbtProject } from '../src';

test('a simple sbt project', () => {
  const sbtProject = new SbtProject({
    name: 'test',
    outdir: mkdtemp(),
    logging: {
      level: LogLevel.OFF,
    },
  });

  const snapshot = synthSnapshot(sbtProject) as SynthOutput;
  expect(snapshot).toMatchSnapshot();
});
