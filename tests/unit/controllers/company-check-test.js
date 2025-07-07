import { module, test } from 'qunit';
import { setupTest } from 'aiapp/tests/helpers';

module('Unit | Controller | company-check', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:company-check');
    assert.ok(controller);
  });
});
