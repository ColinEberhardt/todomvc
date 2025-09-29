module.exports = {
  default: {
    requireModule: [],
    require: [
      'step_definitions/**/*.js',
      'support/**/*.js'
    ],
    format: [
      'progress-bar',
      'json:reports/cucumber-report.json'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    parallel: 1
  }
};