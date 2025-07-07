import EmberRouter from '@ember/routing/router';
import config from 'aiapp/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('domain', { path: '/' });
  this.route('scan');
});
