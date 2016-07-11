module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'source-map-support'],

    files: [
      // 'node_modules/es6-promise/dist/es6-promise.js',
      './test/index.ts'
    ],

    port: 14523,

    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    preprocessors: {
      './src/**/.*.ts': ['webpack', 'sourcemap', 'coverage'],
      './test/index.ts': 'webpack'
    },

    webpack: {
      entry: './test/index.ts',
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['', '.ts', '.js']
      },
      module: {
        loaders: [
          {
            test: /\.ts$/,
            loader: 'awesome-typescript-loader',
            exclude: /node_modules/,
            query: {
              tsconfig: 'tsconfig.test.json'
            }
          }
        ],
        postLoaders: [
          {
            test: /\.ts$/,
            exclude: /(test|node_modules)\//,
            loader: 'istanbul-instrumenter'
          }
        ],
      }
    },

    browsers: ['PhantomJS'],

    reporters: ['progress', 'coverage', 'karma-remap-istanbul'],

    coverageReporter: {
      dir: 'coverage',
      reporters: [
        {
          type: 'text-summary'
        },
        {
          type: 'json',
          subdir: '.',
          file: 'coverage-final.json'
        }
      ]
    },

    remapIstanbulReporter: {
      src: 'coverage/coverage-final.json',
      reports: {
        lcovonly: 'coverage/lcov.info',
        html: 'coverage/report'
      },
      timeoutNotCreated: 5000,
      timeoutNoMoreFiles: 1000
    },

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,
    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};