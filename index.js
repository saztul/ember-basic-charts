/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-basic-charts',
  included: function(app) {
    app.import('vendor/bar-chart.css');
    app.import('vendor/value-range-chart.css');
  }
};
