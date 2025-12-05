// karma.conf.js (ESM)
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default function (config) {
  config.set({
    basePath: __dirname,
    frameworks: ['jasmine'],

    // Incluir solo tests; los .jsx del código se arrastran por import
    files: [
      { pattern: 'src/**/*.test.js',  watched: false },
      { pattern: 'src/**/*.test.jsx', watched: false },
    ],

    // Preprocesar tanto tests como código fuente (.js y .jsx)
    preprocessors: {
      'src/**/*.test.js':  ['esbuild'],
      'src/**/*.test.jsx': ['esbuild'],
      'src/**/*.js':       ['esbuild'],
      'src/**/*.jsx':      ['esbuild'],
    },

   esbuild: {
        absWorkingDir: __dirname,
        singleBundle: false,
        target: 'es2020',
        jsx: 'automatic',
        sourcemap: 'inline',
        define: { 'process.env.NODE_ENV': '"test"' },
        loader: {
            '.js': 'jsx',
            '.jsx': 'jsx',
        },
    },



    plugins: [
      'karma-esbuild',
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-coverage',
    ],

    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [{ type: 'html' }, { type: 'text-summary' }],
      includeAllSources: true,
    },

    browsers: ['ChromeHeadless'],
    singleRun: true,
    logLevel: config.LOG_INFO,
    concurrency: Infinity,
  });
}
