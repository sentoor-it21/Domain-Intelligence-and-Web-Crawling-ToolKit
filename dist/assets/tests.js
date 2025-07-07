'use strict';

define("aiapp/tests/helpers/index", ["exports", "ember-qunit"], function (_exports, _emberQunit) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.setupApplicationTest = setupApplicationTest;
  _exports.setupRenderingTest = setupRenderingTest;
  _exports.setupTest = setupTest;
  0; //eaimeta@70e063a35619d71f0,"ember-qunit"eaimeta@70e063a35619d71f
  // This file exists to provide wrappers around ember-qunit's
  // test setup functions. This way, you can easily extend the setup that is
  // needed per test type.

  function setupApplicationTest(hooks, options) {
    (0, _emberQunit.setupApplicationTest)(hooks, options);

    // Additional setup for application tests can be done here.
    //
    // For example, if you need an authenticated session for each
    // application test, you could do:
    //
    // hooks.beforeEach(async function () {
    //   await authenticateSession(); // ember-simple-auth
    // });
    //
    // This is also a good place to call test setup functions coming
    // from other addons:
    //
    // setupIntl(hooks); // ember-intl
    // setupMirage(hooks); // ember-cli-mirage
  }
  function setupRenderingTest(hooks, options) {
    (0, _emberQunit.setupRenderingTest)(hooks, options);

    // Additional setup for rendering tests can be done here.
  }
  function setupTest(hooks, options) {
    (0, _emberQunit.setupTest)(hooks, options);

    // Additional setup for unit tests can be done here.
  }
});
define("aiapp/tests/test-helper", ["aiapp/app", "aiapp/config/environment", "qunit", "@ember/test-helpers", "qunit-dom", "ember-qunit"], function (_app, _environment, QUnit, _testHelpers, _qunitDom, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"aiapp/app",0,"aiapp/config/environment",0,"qunit",0,"@ember/test-helpers",0,"qunit-dom",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _qunitDom.setup)(QUnit.assert);
  (0, _emberQunit.start)();
});
define("aiapp/tests/unit/controllers/check-promotion-test", ["qunit", "aiapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"aiapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Controller | check-promotion', function (hooks) {
    (0, _helpers.setupTest)(hooks);

    // TODO: Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:check-promotion');
      assert.ok(controller);
    });
  });
});
define("aiapp/tests/unit/controllers/company-check-test", ["qunit", "aiapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"aiapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Controller | company-check', function (hooks) {
    (0, _helpers.setupTest)(hooks);

    // TODO: Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:company-check');
      assert.ok(controller);
    });
  });
});
define("aiapp/tests/unit/controllers/domain-test", ["qunit", "aiapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"aiapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Controller | domain', function (hooks) {
    (0, _helpers.setupTest)(hooks);

    // TODO: Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:domain');
      assert.ok(controller);
    });
  });
});
define("aiapp/tests/unit/controllers/promotion-scan-test", ["qunit", "aiapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"aiapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Controller | promotion-scan', function (hooks) {
    (0, _helpers.setupTest)(hooks);

    // TODO: Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:promotion-scan');
      assert.ok(controller);
    });
  });
});
define("aiapp/tests/unit/controllers/scan-promotion-test", ["qunit", "aiapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"aiapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Controller | scan-promotion', function (hooks) {
    (0, _helpers.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:scan-promotion');
      assert.ok(controller);
    });
  });
});
define("aiapp/tests/unit/controllers/scan-test", ["qunit", "aiapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"aiapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Controller | scan', function (hooks) {
    (0, _helpers.setupTest)(hooks);

    // TODO: Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:scan');
      assert.ok(controller);
    });
  });
});
define("aiapp/tests/unit/routes/app-test", ["qunit", "aiapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"aiapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | app', function (hooks) {
    (0, _helpers.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:app');
      assert.ok(route);
    });
  });
});
define("aiapp/tests/unit/routes/application-test", ["qunit", "aiapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"aiapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | application', function (hooks) {
    (0, _helpers.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:application');
      assert.ok(route);
    });
  });
});
define("aiapp/tests/unit/routes/check-promotion-test", ["qunit", "aiapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"aiapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | check-promotion', function (hooks) {
    (0, _helpers.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:check-promotion');
      assert.ok(route);
    });
  });
});
define("aiapp/tests/unit/routes/company-check-test", ["qunit", "aiapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"aiapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | company-check', function (hooks) {
    (0, _helpers.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:company-check');
      assert.ok(route);
    });
  });
});
define("aiapp/tests/unit/routes/domain-test", ["qunit", "aiapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"aiapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | domain', function (hooks) {
    (0, _helpers.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:domain');
      assert.ok(route);
    });
  });
});
define("aiapp/tests/unit/routes/promotion-scan-test", ["qunit", "aiapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"aiapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | promotion-scan', function (hooks) {
    (0, _helpers.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:promotion-scan');
      assert.ok(route);
    });
  });
});
define("aiapp/tests/unit/routes/scan-promotion-test", ["qunit", "aiapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"aiapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | scan-promotion', function (hooks) {
    (0, _helpers.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:scan-promotion');
      assert.ok(route);
    });
  });
});
define("aiapp/tests/unit/routes/scan-test", ["qunit", "aiapp/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"aiapp/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | scan', function (hooks) {
    (0, _helpers.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:scan');
      assert.ok(route);
    });
  });
});
define('aiapp/config/environment', [], function() {
  var prefix = 'aiapp';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('aiapp/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
