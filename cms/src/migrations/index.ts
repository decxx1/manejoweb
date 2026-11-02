import * as migration_20261102_160913 from './20261102_160913';
import * as migration_20261102_212838 from './20261102_212838';

export const migrations = [
  {
    up: migration_20261102_160913.up,
    down: migration_20261102_160913.down,
    name: '20261102_160913',
  },
  {
    up: migration_20261102_212838.up,
    down: migration_20261102_212838.down,
    name: '20261102_212838'
  },
];
