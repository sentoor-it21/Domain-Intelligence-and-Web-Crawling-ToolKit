import { module, test } from 'qunit';
import { setupTest } from 'aiapp/tests/helpers';

module('Unit | Controller | scan-promotion', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:scan-promotion');
    assert.ok(controller);
  });
});
