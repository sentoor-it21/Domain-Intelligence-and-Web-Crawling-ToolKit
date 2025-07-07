import Route from '@ember/routing/route';

export default class ScanRoute extends Route {
  // Optional: Reset controller state when entering route
  resetController(controller, isExiting) {
    if (isExiting && controller) {
      controller.set('inputUrl', '');
      controller.set('targetName', '');
      controller.set('baseScreenshot', null);
      controller.set('matchedScreenshot', null);
      controller.set('errorMessage', '');
      controller.set('successMessage', '');
      controller.set('isLoading', false);
    }
  }
}