import { module, test } from 'qunit';
import { setupTest } from 'aiapp/tests/helpers';

module('Unit | Route | check-promotion', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:check-promotion');
    assert.ok(route);
  });
});
