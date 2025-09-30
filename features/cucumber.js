module.exports = {
  default: {
    requireModule: [],
    require: [
      'support/**/*.js',
      'step_definitions/**/*.js'
    ],
    format: [
      'progress',
      'json:reports/cucumber_report.json'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    paths: [
      '*.feature'
    ],
    parallel: 1
  }
};