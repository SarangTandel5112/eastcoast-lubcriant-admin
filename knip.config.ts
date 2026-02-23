import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  ignore: [
    '.storybook/**/*',
    'src/modules/common/helpers/common.helper.ts',
    'tests/**/*.ts',
    'lighthouserc.js',
    'src/libs/feature-flags.ts',
    'src/modules/counter/constants/**',
    'src/modules/counter/helpers/**',
    'src/libs/monitoring.ts',
    'src/modules/common/validations/common.validation.ts',
    'src/modules/common/types/common.type.ts',
    'src/modules/counter/types/counter.types.ts',
    'src/app/(marketing)/counter/actions.ts',
  ],
  ignoreDependencies: [
    '@commitlint/types',
    'conventional-changelog-conventionalcommits',
    'vite',
    '@faker-js/faker',
    'npm-run-all',
    'lefthook',
    'vitest-browser-react',
  ],
  ignoreBinaries: [
    'production',
    'dotenv',
    'checkly',
    'lhci',
  ],
  ignoreExportsUsedInFile: true,
  compilers: {
    css: (text: string) => [...text.matchAll(/(?<=@)import[^;]+/g)].join('\n'),
  },
};

export default config;
