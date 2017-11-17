import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('pie-chart-demo');
  this.route('bar-chart-demo');
  this.route('value-range-chart-demo');
});

export default Router;
