import { module, test } from 'qunit';
import { setupTest } from 'aiapp/tests/helpers';

module('Unit | Controller | check-promotion', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:check-promotion');
    assert.ok(controller);
  });
});
