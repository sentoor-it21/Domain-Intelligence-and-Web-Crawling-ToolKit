'use strict';



;define("aiapp/app", ["exports", "@ember/application", "ember-resolver", "ember-load-initializers", "aiapp/config/environment"], function (_exports, _application, _emberResolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/application",0,"ember-resolver",0,"ember-load-initializers",0,"aiapp/config/environment"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class App extends _application.default {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "modulePrefix", _environment.default.modulePrefix);
      _defineProperty(this, "podModulePrefix", _environment.default.podModulePrefix);
      _defineProperty(this, "Resolver", _emberResolver.default);
    }
  }
  _exports.default = App;
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
});
;define("aiapp/component-managers/glimmer", ["exports", "@glimmer/component/-private/ember-component-manager"], function (_exports, _emberComponentManager) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberComponentManager.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component/-private/ember-component-manager"eaimeta@70e063a35619d71f
});
;define("aiapp/components/welcome-page", ["exports", "ember-welcome-page/components/welcome-page"], function (_exports, _welcomePage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-welcome-page/components/welcome-page"eaimeta@70e063a35619d71f
});
;define("aiapp/container-debug-adapter", ["exports", "ember-resolver/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _containerDebugAdapter.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-resolver/container-debug-adapter"eaimeta@70e063a35619d71f
});
;define("aiapp/controllers/domain", ["exports", "@ember/controller", "@glimmer/tracking", "@ember/object"], function (_exports, _controller, _tracking, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@glimmer/tracking",0,"@ember/object"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let DomainController = _exports.default = (_class = class DomainController extends _controller.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "email", _descriptor, this);
      _initializerDefineProperty(this, "domain", _descriptor2, this);
      _initializerDefineProperty(this, "loading", _descriptor3, this);
      _initializerDefineProperty(this, "error", _descriptor4, this);
      _initializerDefineProperty(this, "screenshotBase64", _descriptor5, this);
      _initializerDefineProperty(this, "emailStatus", _descriptor6, this);
      _initializerDefineProperty(this, "domainInfo", _descriptor7, this);
      _initializerDefineProperty(this, "contactInfo", _descriptor8, this);
      _initializerDefineProperty(this, "comInfo", _descriptor9, this);
    }
    // Prompt for domain classification
    get domainClassifierPrompt() {
      return `You are a domain classifier specialist. Based on the HTML content of a website, analyze and classify the domain.
Analyze the following company: CoreView

Return the following structured information:

1. Industry: [Specific category like "Technology Hardware & Equipment", "Healthcare", "Finance", etc.]
2. Location: [Country name like "India", "Germany", etc.]
3. Google Popularity: [High, Medium, or Low]
4. Trust Score: [Numerical score out of 100]
5. Competitor for AdminDroid: [Yes or No]
6. Rank: [Numerical value]

Note: AdminDroid is a Microsoft 365 reporting and analytics tool used by IT administrators to generate reports on Exchange Online, Azure AD, Teams, SharePoint, etc. A competitor would be a company that also provides analytics, reporting, monitoring, or admin tools for Microsoft 365.

Answer only based on actual business overlap and target audience.
 

Format your response exactly like this (with no additional text, just the answers):
Industry: Technology Hardware & Equipment
Location: India
Popularity: High
TrustScore: 82
Competitor: No
Rank: 7573`;
    }
    get contactInfoPrompt() {
      return `You are an expert at extracting contact information from websites. Given the HTML of a contact page, extract:

1. Support email addresses
2. Phone numbers for support or general inquiries
3. Contact form availability (Yes/No)

Format your response exactly like this (with no additional text, just the answers):
SupportEmail: support@example.com
SupportPhone: +1-555-123-4567
ContactForm: Yes

If any information is not found, write "None" for that field.`;
    }
    async parseEmail() {
      this.error = '';
      this.domainInfo = null;
      this.contactInfo = null;
      this.domain = '';
      this.screenshotBase64 = '';
      this.emailStatus = '';
      this.loading = true;
      this.comInfo = null;
      if (!this.email || !this.email.includes('@')) {
        this.error = 'Please enter a valid email address.';
        this.loading = false;
        return;
      }
      try {
        await this.validateEmail(true);
        let domain = this.email.split('@')[1];
        this.domain = domain;
        let homePageResponse = await fetch(`https://localhost:7242/api/website/html?url=${domain}`);
        let homeHtml = await homePageResponse.text();
        await this.analyzeDomain(homeHtml);
        try {
          let contactPageResponse = await fetch(`https://localhost:7242/api/website/html?url=${domain}/contact-us`);
          let contactHtml = await contactPageResponse.text();
          if (!contactPageResponse.ok) {
            contactPageResponse = await fetch(`https://localhost:7242/api/website/html?url=${domain}`);
            contactHtml = await contactPageResponse.text();
          }
          if (contactPageResponse.ok) {
            await this.extractContactInfo(contactHtml);
          }
        } catch (contactError) {
          console.log('Contact page not found or could not be accessed', contactError);
        }
        const screenshotResponse = await fetch(`https://localhost:7242/api/website/full-screenshot?url=https://${domain}`);
        if (screenshotResponse.ok) {
          this.screenshotBase64 = await screenshotResponse.text();
        }
      } catch (e) {
        this.error = 'Failed to fetch details: ' + e.message;
        console.error(e);
      } finally {
        this.loading = false;
      }
    }
    async analyzeDomain(html) {
      const prompt = `${this.domainClassifierPrompt}\n\n${html.slice(0, 99000)}`;
      let aiResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer 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'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-4-scout-17b-16e-instruct',
          messages: [{
            role: 'user',
            content: prompt
          }]
        })
      });
      let output = await aiResponse.json();
      let analysisText = output.choices[0].message.content.trim() || 'No Data';
      this.domainInfo = this.parseAnalysisResponse(analysisText);
    }
    async extractContactInfo(html) {
      const prompt = `${this.contactInfoPrompt}\n\n${html.slice(0, 99000)}`;
      let aiResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer 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'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-4-scout-17b-16e-instruct',
          messages: [{
            role: 'user',
            content: prompt
          }]
        })
      });
      let output = await aiResponse.json();
      let contactText = output.choices[0].message.content.trim() || 'No Data';
      this.contactInfo = this.parseContactResponse(contactText);
    }
    parseAnalysisResponse(text) {
      const lines = text.split('\n');
      const result = {};
      lines.forEach(line => {
        if (line.includes(':')) {
          const [key, value] = line.split(':').map(item => item.trim());
          if (key.toLowerCase().includes('industry')) {
            result.industry = value;
          } else if (key.toLowerCase().includes('location')) {
            result.location = value;
          } else if (key.toLowerCase().includes('popularity')) {
            result.popularity = value;
          } else if (key.toLowerCase().includes('trustscore')) {
            result.trustScore = value;
          } else if (key.toLowerCase().includes('competitor')) {
            result.isCompetitor = value;
          } else if (key.toLowerCase().includes('rank')) {
            result.rank = value;
          }
        }
      });
      return result;
    }
    parseContactResponse(text) {
      const lines = text.split('\n');
      const result = {};
      lines.forEach(line => {
        if (line.includes(':')) {
          const [key, value] = line.split(':').map(item => item.trim());
          if (key.toLowerCase().includes('supportemail')) {
            result.email = value !== 'None' ? value : null;
          } else if (key.toLowerCase().includes('supportphone')) {
            result.phone = value !== 'None' ? value : null;
          } else if (key.toLowerCase().includes('contactform')) {
            result.hasContactForm = value === 'Yes';
          }
        }
      });
      return result;
    }
    async validateEmail(silent = false) {
      if (!silent) {
        this.emailStatus = '';
      }
      if (!this.email || !this.email.includes('@')) {
        this.emailStatus = 'Please enter a valid email address first.';
        return;
      }
      try {
        let response = await fetch(`https://localhost:7242/api/website/validate-email?email=${encodeURIComponent(this.email)}`);
        let message = await response.text();
        this.emailStatus = message;
      } catch (e) {
        this.emailStatus = 'Error validating email: ' + e.message;
        console.error(e);
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "email", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "domain", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "loading", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "error", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "screenshotBase64", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "emailStatus", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "domainInfo", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "contactInfo", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "comInfo", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "parseEmail", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "parseEmail"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "validateEmail", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "validateEmail"), _class.prototype), _class);
});
;define("aiapp/controllers/scan", ["exports", "@ember/controller", "@ember/object", "@glimmer/tracking"], function (_exports, _controller, _object, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object",0,"@glimmer/tracking"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let ScanController = _exports.default = (_class = class ScanController extends _controller.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "inputUrl", _descriptor, this);
      _initializerDefineProperty(this, "targetName", _descriptor2, this);
      _initializerDefineProperty(this, "foundUrls", _descriptor3, this);
      _initializerDefineProperty(this, "foundUrlsWithNavigationPath", _descriptor4, this);
      _initializerDefineProperty(this, "foundCount", _descriptor5, this);
      _initializerDefineProperty(this, "isLoading", _descriptor6, this);
      _initializerDefineProperty(this, "errorMessage", _descriptor7, this);
      _initializerDefineProperty(this, "successMessage", _descriptor8, this);
      _initializerDefineProperty(this, "searchedPages", _descriptor9, this);
      // NEW for auto scan view
      _initializerDefineProperty(this, "latestScanResults", _descriptor10, this);
      _initializerDefineProperty(this, "autoScanLoading", _descriptor11, this);
      _defineProperty(this, "apiEndpoint", 'https://localhost:7242/api/track');
    }
    // constructor() {
    //   super(...arguments);

    //   this.autoScanList = [
    //     { url: 'https://www.ipandmore.de/unternehmen/unsere-partner/admindroid/', target: 'admindroid' },
    //     { url: 'www.denboer.eu/admindroid', target: 'admindroid' },
    //     { url: 'https://sinequanon.fr/admindroid/', target: 'admindroid' },
    //     { url: 'https://www.df-informatica.it/admindroid', target: 'admindroid' },
    //     { url: 'http://www.datapeople.dk/admindroid', target: 'admindroid' }
    //   ];

    //   // 🔹 Call immediately once
    //   this.autoScanList.forEach(scanItem => {
    //     this.inputUrl = scanItem.url;
    //     this.targetName = scanItem.target;
    //     this.trackContent({ preventDefault: () => {} });
    // });

    //   // 🔁 Then repeat every 5 minutes
    //   setInterval(() => {
    //     this.autoScanList.forEach(scanItem => {
    //       this.inputUrl = scanItem.url;
    //       this.targetName = scanItem.target;
    //       this.trackContent({ preventDefault: () => {} });
    //     });
    //   }, 50 * 60 * 1000);
    // }

    updateUrl(event) {
      this.inputUrl = event.target.value;
      this.clearMessages();
    }
    updateTarget(event) {
      this.targetName = event.target.value;
      this.clearMessages();
    }
    clearMessages() {
      this.errorMessage = '';
      this.successMessage = '';
    }
    clearResults() {
      this.foundUrls = [];
      this.foundUrlsWithNavigationPath = [];
      this.foundCount = 0;
      this.searchedPages = 0;
      this.latestScanResults = [];
      this.clearMessages();
    }
    async trackContent(event) {
      event.preventDefault();
      if (!this.inputUrl.trim()) {
        this.errorMessage = 'Please enter a valid URL';
        return;
      }
      if (!this.targetName.trim()) {
        this.errorMessage = 'Please enter target content to search for';
        return;
      }
      this.isLoading = true;
      this.clearMessages();
      this.clearResults();
      try {
        const response = await fetch(this.apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            url: this.inputUrl.trim(),
            targetName: this.targetName.trim()
          })
        });
        if (!response.ok) {
          const errorData = await response.text();
          try {
            const errorJson = JSON.parse(errorData);
            this.errorMessage = errorJson.error || `Server error: ${response.status}`;
          } catch {
            this.errorMessage = `Server error: ${response.status} - ${errorData}`;
          }
          return;
        }
        const data = await response.json();
        this.foundUrls = data.foundUrls || [];
        this.foundUrlsWithNavigationPath = (data.foundUrlsWithNavigationPath || []).map((navData, index) => ({
          targetUrl: navData.targetUrl,
          navigationSteps: navData.navigationSteps || [],
          pathNumber: index + 1
        }));
        this.foundCount = data.foundCount || 0;
        this.searchedPages = data.searchedPages || 0;
        if (this.foundCount > 0) {
          this.successMessage = `Target "${this.targetName}" found on ${this.foundCount} pages! Searched ${this.searchedPages} total pages.`;
          if (this.foundUrlsWithNavigationPath.length > 0) {
            console.log(`Navigation paths captured for ${this.foundUrlsWithNavigationPath.length} target pages:`);
            this.foundUrlsWithNavigationPath.forEach((pathData, index) => {
              console.log(`Path ${index + 1} to ${pathData.targetUrl}:`);
              pathData.navigationSteps.forEach(step => {
                console.log(`  Step ${step.stepNumber}: ${step.url} ${step.isTargetPage ? '(TARGET PAGE)' : ''}`);
              });
            });
          }
        } else {
          this.successMessage = `Search completed. Target not found in ${this.searchedPages} accessible pages.`;
        }
      } catch (error) {
        console.error('Network error:', error);
        this.errorMessage = 'Failed to connect to server. Please ensure the C# backend is running.';
      } finally {
        this.isLoading = false;
      }
    }
    async loadLatestScans() {
      this.autoScanLoading = true;
      this.clearMessages();
      try {
        const response = await fetch('https://localhost:7242/api/track/latest');
        if (!response.ok) {
          const text = await response.text();
          console.error('Server raw Error:', text);
          this.errorMessage = `Failed to load latest scans. Status: ${response.status}`;
          return;
        }
        const data = await response.json();
        console.log('Raw API Response:', data); // Debug log

        // Process and validate screenshot data
        this.latestScanResults = (data || []).map(result => {
          let processedResult = {
            ...result
          };
          processedResult.isMatchedUrlLive = result.isMatchedUrlLive ?? null;
          // Clean and validate screenshot base64 data
          if (result.screenshotBase64) {
            let screenshot = result.screenshotBase64;

            // Remove data URL prefix if present
            if (screenshot.startsWith('data:image')) {
              screenshot = screenshot.split(',')[1];
            }

            // Remove any invalid characters or formatting issues
            screenshot = screenshot.replace(/[^A-Za-z0-9+/=]/g, '');

            // Validate base64 format
            if (this.isValidBase64(screenshot)) {
              processedResult.validScreenshot = screenshot;
              processedResult.hasValidScreenshot = true;
            } else {
              console.warn('Invalid base64 screenshot for result:', result.id || result.website);
              processedResult.hasValidScreenshot = false;
            }
          } else {
            processedResult.hasValidScreenshot = false;
          }
          if (result.navigationPathJson) {
            try {
              const steps = JSON.parse(result.navigationPathJson);
              if (Array.isArray(steps)) {
                processedResult.navigationSteps = steps.map((step, i) => {
                  let cleanedScreenshot = step.screenshot;
                  if (cleanedScreenshot?.startsWith('data:image')) {
                    cleanedScreenshot = cleanedScreenshot.split(',')[1];
                  }
                  cleanedScreenshot = cleanedScreenshot?.replace(/[^A-Za-z0-9+/=]/g, '');
                  return {
                    ...step,
                    screenshot: this.isValidBase64(cleanedScreenshot) ? cleanedScreenshot : null,
                    stepNumber: i + 1
                  };
                });
              }
            } catch (e) {
              console.error('Failed to parse navigationPathJson:', e);
            }
          } else {
            processedResult.navigationSteps = [];
          }

          // Format date
          if (result.scannedAt) {
            processedResult.formattedDate = new Date(result.scannedAt).toLocaleString();
          }
          processedResult.competitorCount = result.competitorCount || 0;
          processedResult.competitorLinks = result.competitorLinks ? result.competitorLinks.split(',').map(link => link.trim()) : [];
          return processedResult;
        });
        this.foundCount = this.latestScanResults.length;
        this.successMessage = `Loaded ${this.foundCount} scan result(s) from database`;
      } catch (error) {
        console.error('Load scan error:', error);
        this.errorMessage = 'Error loading scan data from server';
      } finally {
        this.autoScanLoading = false;
      }
    }
    openScreenshotModal(screenshot) {
      // Create modal dynamically
      const modal = document.createElement('div');
      modal.className = 'screenshot-modal active';
      modal.innerHTML = `
      <span class="close-modal">&times;</span>
      <img src="data:image/png;base64,${screenshot}" alt="Full Screenshot" />
    `;
      document.body.appendChild(modal);

      // Close modal on click
      modal.addEventListener('click', () => {
        document.body.removeChild(modal);
      });
    }

    // Helper method to validate base64
    isValidBase64(str) {
      try {
        // Check if string is valid base64
        return btoa(atob(str)) === str;
      } catch (err) {
        return false;
      }
    }

    // Optional: auto-refresh every 5 mins
    startAutoRefresh() {
      this.loadLatestScans();
      setInterval(() => {
        this.loadLatestScans();
      }, 50 * 60 * 1000);
    }
    get isFormValid() {
      return this.inputUrl.trim() && this.targetName.trim() && !this.isLoading;
    }
    get hasResults() {
      return this.foundUrls.length > 0 || this.foundUrlsWithNavigationPath.length > 0 || this.latestScanResults.length > 0;
    }
    get foundUrlsWithNumbers() {
      return this.foundUrls.map((url, index) => ({
        url: url,
        number: index + 1
      }));
    }
    get navigationPathsWithDetails() {
      return this.latestScanResults.map((result, index) => ({
        targetUrl: result.matchedPageUrl,
        navigationSteps: result.navigationSteps || [],
        pathNumber: index + 1,
        totalSteps: result.navigationSteps?.length || 0,
        stepsWithScreenshots: (result.navigationSteps || []).filter(step => step.screenshot).length
      }));
    }

    // Helper for screenshot display
    get resultsWithScreenshots() {
      return this.latestScanResults.filter(result => result.hasValidScreenshot);
    }
    get resultsWithoutScreenshots() {
      return this.latestScanResults.filter(result => !result.hasValidScreenshot);
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "inputUrl", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "targetName", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "foundUrls", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return [];
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "foundUrlsWithNavigationPath", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return [];
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "foundCount", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 0;
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "isLoading", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "errorMessage", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "successMessage", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "searchedPages", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 0;
    }
  }), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, "latestScanResults", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return [];
    }
  }), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, "autoScanLoading", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "updateUrl", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "updateUrl"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updateTarget", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "updateTarget"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "clearMessages", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "clearMessages"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "clearResults", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "clearResults"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "trackContent", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "trackContent"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "loadLatestScans", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "loadLatestScans"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "openScreenshotModal", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "openScreenshotModal"), _class.prototype), _class);
});
;define("aiapp/data-adapter", ["exports", "@ember-data/debug/data-adapter"], function (_exports, _dataAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _dataAdapter.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember-data/debug/data-adapter"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/-base", ["exports", "ember-moment/helpers/-base"], function (_exports, _base) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _base.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-moment/helpers/-base"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/abs", ["exports", "ember-math-helpers/helpers/abs"], function (_exports, _abs) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _abs.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/abs"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/acos", ["exports", "ember-math-helpers/helpers/acos"], function (_exports, _acos) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _acos.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/acos"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/acosh", ["exports", "ember-math-helpers/helpers/acosh"], function (_exports, _acosh) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _acosh.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/acosh"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/add", ["exports", "ember-math-helpers/helpers/add"], function (_exports, _add) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _add.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/add"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/and", ["exports", "ember-truth-helpers/helpers/and"], function (_exports, _and) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _and.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/and"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/app-version", ["exports", "@ember/component/helper", "aiapp/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _helper, _environment, _regexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.appVersion = appVersion;
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper",0,"aiapp/config/environment",0,"ember-cli-app-version/utils/regexp"eaimeta@70e063a35619d71f
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;
    let match = null;
    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }
    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }
    return match ? match[0] : version;
  }
  var _default = _exports.default = (0, _helper.helper)(appVersion);
});
;define("aiapp/helpers/asin", ["exports", "ember-math-helpers/helpers/asin"], function (_exports, _asin) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _asin.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/asin"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/asinh", ["exports", "ember-math-helpers/helpers/asinh"], function (_exports, _asinh) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _asinh.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/asinh"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/atan", ["exports", "ember-math-helpers/helpers/atan"], function (_exports, _atan) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _atan.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/atan"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/atan2", ["exports", "ember-math-helpers/helpers/atan2"], function (_exports, _atan) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _atan.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/atan2"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/atanh", ["exports", "ember-math-helpers/helpers/atanh"], function (_exports, _atanh) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _atanh.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/atanh"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/cancel-all", ["exports", "ember-concurrency/helpers/cancel-all"], function (_exports, _cancelAll) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _cancelAll.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-concurrency/helpers/cancel-all"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/cbrt", ["exports", "ember-math-helpers/helpers/cbrt"], function (_exports, _cbrt) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _cbrt.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/cbrt"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/ceil", ["exports", "ember-math-helpers/helpers/ceil"], function (_exports, _ceil) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _ceil.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/ceil"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/clz32", ["exports", "ember-math-helpers/helpers/clz32"], function (_exports, _clz) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _clz.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/clz32"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/cos", ["exports", "ember-math-helpers/helpers/cos"], function (_exports, _cos) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _cos.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/cos"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/cosh", ["exports", "ember-math-helpers/helpers/cosh"], function (_exports, _cosh) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _cosh.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/cosh"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/div", ["exports", "ember-math-helpers/helpers/div"], function (_exports, _div) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _div.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/div"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/eq", ["exports", "ember-truth-helpers/helpers/eq"], function (_exports, _eq) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _eq.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/eq"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/exp", ["exports", "ember-math-helpers/helpers/exp"], function (_exports, _exp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _exp.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/exp"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/expm1", ["exports", "ember-math-helpers/helpers/expm1"], function (_exports, _expm) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _expm.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/expm1"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/floor", ["exports", "ember-math-helpers/helpers/floor"], function (_exports, _floor) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _floor.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/floor"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/fround", ["exports", "ember-math-helpers/helpers/fround"], function (_exports, _fround) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _fround.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/fround"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/gcd", ["exports", "ember-math-helpers/helpers/gcd"], function (_exports, _gcd) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _gcd.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/gcd"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/gt", ["exports", "ember-truth-helpers/helpers/gt"], function (_exports, _gt) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _gt.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/gt"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/gte", ["exports", "ember-truth-helpers/helpers/gte"], function (_exports, _gte) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _gte.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/gte"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/hypot", ["exports", "ember-math-helpers/helpers/hypot"], function (_exports, _hypot) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _hypot.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/hypot"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/imul", ["exports", "ember-math-helpers/helpers/imul"], function (_exports, _imul) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _imul.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/imul"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/is-after", ["exports", "ember-moment/helpers/is-after"], function (_exports, _isAfter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isAfter.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-moment/helpers/is-after"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/is-array", ["exports", "ember-truth-helpers/helpers/is-array"], function (_exports, _isArray) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isArray.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/is-array"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/is-before", ["exports", "ember-moment/helpers/is-before"], function (_exports, _isBefore) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isBefore.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-moment/helpers/is-before"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/is-between", ["exports", "ember-moment/helpers/is-between"], function (_exports, _isBetween) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isBetween.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-moment/helpers/is-between"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/is-empty", ["exports", "ember-truth-helpers/helpers/is-empty"], function (_exports, _isEmpty) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isEmpty.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/is-empty"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/is-equal", ["exports", "ember-truth-helpers/helpers/is-equal"], function (_exports, _isEqual) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isEqual.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/is-equal"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/is-same-or-after", ["exports", "ember-moment/helpers/is-same-or-after"], function (_exports, _isSameOrAfter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isSameOrAfter.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-moment/helpers/is-same-or-after"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/is-same-or-before", ["exports", "ember-moment/helpers/is-same-or-before"], function (_exports, _isSameOrBefore) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isSameOrBefore.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-moment/helpers/is-same-or-before"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/is-same", ["exports", "ember-moment/helpers/is-same"], function (_exports, _isSame) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isSame.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-moment/helpers/is-same"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/lcm", ["exports", "ember-math-helpers/helpers/lcm"], function (_exports, _lcm) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _lcm.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/lcm"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/log-e", ["exports", "ember-math-helpers/helpers/log-e"], function (_exports, _logE) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _logE.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/log-e"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/log10", ["exports", "ember-math-helpers/helpers/log10"], function (_exports, _log) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _log.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/log10"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/log1p", ["exports", "ember-math-helpers/helpers/log1p"], function (_exports, _log1p) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _log1p.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/log1p"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/log2", ["exports", "ember-math-helpers/helpers/log2"], function (_exports, _log) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _log.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/log2"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/lt", ["exports", "ember-truth-helpers/helpers/lt"], function (_exports, _lt) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _lt.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/lt"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/lte", ["exports", "ember-truth-helpers/helpers/lte"], function (_exports, _lte) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _lte.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/lte"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/max", ["exports", "ember-math-helpers/helpers/max"], function (_exports, _max) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _max.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/max"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/min", ["exports", "ember-math-helpers/helpers/min"], function (_exports, _min) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _min.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/min"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/mod", ["exports", "ember-math-helpers/helpers/mod"], function (_exports, _mod) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _mod.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/mod"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/moment-add", ["exports", "ember-moment/helpers/moment-add"], function (_exports, _momentAdd) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _momentAdd.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-moment/helpers/moment-add"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/moment-calendar", ["exports", "ember-moment/helpers/moment-calendar"], function (_exports, _momentCalendar) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _momentCalendar.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-moment/helpers/moment-calendar"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/moment-diff", ["exports", "ember-moment/helpers/moment-diff"], function (_exports, _momentDiff) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _momentDiff.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-moment/helpers/moment-diff"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/moment-duration", ["exports", "ember-moment/helpers/moment-duration"], function (_exports, _momentDuration) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _momentDuration.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-moment/helpers/moment-duration"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/moment-format", ["exports", "ember-moment/helpers/moment-format"], function (_exports, _momentFormat) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _momentFormat.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-moment/helpers/moment-format"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/moment-from-now", ["exports", "ember-moment/helpers/moment-from-now"], function (_exports, _momentFromNow) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _momentFromNow.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-moment/helpers/moment-from-now"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/moment-from", ["exports", "ember-moment/helpers/moment-from"], function (_exports, _momentFrom) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _momentFrom.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-moment/helpers/moment-from"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/moment-subtract", ["exports", "ember-moment/helpers/moment-subtract"], function (_exports, _momentSubtract) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _momentSubtract.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-moment/helpers/moment-subtract"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/moment-to-date", ["exports", "ember-moment/helpers/moment-to-date"], function (_exports, _momentToDate) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _momentToDate.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-moment/helpers/moment-to-date"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/moment-to-now", ["exports", "ember-moment/helpers/moment-to-now"], function (_exports, _momentToNow) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _momentToNow.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-moment/helpers/moment-to-now"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/moment-to", ["exports", "ember-moment/helpers/moment-to"], function (_exports, _momentTo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _momentTo.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-moment/helpers/moment-to"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/moment", ["exports", "ember-moment/helpers/moment"], function (_exports, _moment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _moment.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-moment/helpers/moment"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/mult", ["exports", "ember-math-helpers/helpers/mult"], function (_exports, _mult) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _mult.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/mult"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/not-eq", ["exports", "ember-truth-helpers/helpers/not-eq"], function (_exports, _notEq) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _notEq.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/not-eq"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/not", ["exports", "ember-truth-helpers/helpers/not"], function (_exports, _not) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _not.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/not"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/now", ["exports", "ember-moment/helpers/now"], function (_exports, _now) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _now.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-moment/helpers/now"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/or", ["exports", "ember-truth-helpers/helpers/or"], function (_exports, _or) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _or.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/or"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/page-title", ["exports", "ember-page-title/helpers/page-title"], function (_exports, _pageTitle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pageTitle.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-page-title/helpers/page-title"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/perform", ["exports", "ember-concurrency/helpers/perform"], function (_exports, _perform) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _perform.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-concurrency/helpers/perform"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/pow", ["exports", "ember-math-helpers/helpers/pow"], function (_exports, _pow) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pow.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/pow"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/random", ["exports", "ember-math-helpers/helpers/random"], function (_exports, _random) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _random.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/random"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/round", ["exports", "ember-math-helpers/helpers/round"], function (_exports, _round) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _round.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/round"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/sign", ["exports", "ember-math-helpers/helpers/sign"], function (_exports, _sign) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _sign.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/sign"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/sin", ["exports", "ember-math-helpers/helpers/sin"], function (_exports, _sin) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _sin.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/sin"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/sqrt", ["exports", "ember-math-helpers/helpers/sqrt"], function (_exports, _sqrt) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _sqrt.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/sqrt"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/sub", ["exports", "ember-math-helpers/helpers/sub"], function (_exports, _sub) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _sub.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/sub"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/sum", ["exports", "ember-math-helpers/helpers/sum"], function (_exports, _sum) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _sum.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/sum"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/tan", ["exports", "ember-math-helpers/helpers/tan"], function (_exports, _tan) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _tan.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/tan"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/tanh", ["exports", "ember-math-helpers/helpers/tanh"], function (_exports, _tanh) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _tanh.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/tanh"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/task", ["exports", "ember-concurrency/helpers/task"], function (_exports, _task) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _task.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-concurrency/helpers/task"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/trunc", ["exports", "ember-math-helpers/helpers/trunc"], function (_exports, _trunc) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _trunc.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-math-helpers/helpers/trunc"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/unix", ["exports", "ember-moment/helpers/unix"], function (_exports, _unix) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _unix.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-moment/helpers/unix"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/utc", ["exports", "ember-moment/helpers/utc"], function (_exports, _utc) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _utc.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-moment/helpers/utc"eaimeta@70e063a35619d71f
});
;define("aiapp/helpers/xor", ["exports", "ember-truth-helpers/helpers/xor"], function (_exports, _xor) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _xor.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/xor"eaimeta@70e063a35619d71f
});
;define("aiapp/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "aiapp/config/environment"], function (_exports, _initializerFactory, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-app-version/initializer-factory",0,"aiapp/config/environment"eaimeta@70e063a35619d71f
  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }
  var _default = _exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
;define("aiapp/initializers/ember-data", ["exports", "@ember-data/request-utils/deprecation-support"], function (_exports, _deprecationSupport) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember-data/request-utils/deprecation-support"eaimeta@70e063a35619d71f
  /*
    This code initializes EmberData in an Ember application.
  */
  var _default = _exports.default = {
    name: 'ember-data',
    initialize(application) {
      application.registerOptionsForType('serializer', {
        singleton: false
      });
      application.registerOptionsForType('adapter', {
        singleton: false
      });
    }
  };
});
;define("aiapp/router", ["exports", "@ember/routing/router", "aiapp/config/environment"], function (_exports, _router, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/router",0,"aiapp/config/environment"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class Router extends _router.default {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "location", _environment.default.locationType);
      _defineProperty(this, "rootURL", _environment.default.rootURL);
    }
  }
  _exports.default = Router;
  Router.map(function () {
    this.route('domain', {
      path: '/'
    });
    this.route('scan');
  });
});
;define("aiapp/routes/domain", ["exports", "@ember/routing/route"], function (_exports, _route) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route"eaimeta@70e063a35619d71f
  class DomainRoute extends _route.default {}
  _exports.default = DomainRoute;
});
;define("aiapp/routes/scan", ["exports", "@ember/routing/route"], function (_exports, _route) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route"eaimeta@70e063a35619d71f
  class ScanRoute extends _route.default {
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
  _exports.default = ScanRoute;
});
;define("aiapp/services/moment", ["exports", "ember-moment/services/moment"], function (_exports, _moment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _moment.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-moment/services/moment"eaimeta@70e063a35619d71f
});
;define("aiapp/services/page-title", ["exports", "ember-page-title/services/page-title"], function (_exports, _pageTitle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pageTitle.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-page-title/services/page-title"eaimeta@70e063a35619d71f
});
;define("aiapp/services/store", ["exports", "@ember/debug", "ember-data/store"], function (_exports, _debug, _store) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _store.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"ember-data/store"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the store service. Use `export { default } from 'ember-data/store';` in app/services/store.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '4.13'
    }
  }));
});
;define("aiapp/templates/application", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title "Aiapp"}}
  {{outlet}}
  */
  {
    "id": "Mvt/vv/j",
    "block": "[[[1,[28,[35,0],[\"Aiapp\"],null]],[1,\"\\n\"],[46,[28,[37,2],null,null],null,null,null]],[],false,[\"page-title\",\"component\",\"-outlet\"]]",
    "moduleName": "aiapp/templates/application.hbs",
    "isStrictMode": false
  });
});
;define("aiapp/templates/domain", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <h1>Domain</h1>
  
  <div class="input-container">
    <label for="email">Email Address:</label>
    <Input @value={{this.email}} placeholder="e.g., user@example.com"/>
    <button disabled={{this.loading}} class="classify-btn" type="button" {{on "click" this.parseEmail}}>
      {{if this.loading "Processing..." "Classify"}}
    </button>
  </div>
  
  {{#if this.error}}
    <div class="error">{{this.error}}</div>
  {{/if}}
  
  {{#if this.emailStatus}}
    <div class="validation-result">
      <p>{{this.emailStatus}}</p>
    </div>
  {{/if}}
  
  {{#if this.domainInfo}}
    <div class="result-container">
      <h2>Class:{{this.domainInfo.industry}} </h2>
      <h2>Country:{{this.domainInfo.location}}</h2>
      
      <div class="metrics">
        <div class="metric">
          <span>Google popularity:</span> <span class="value">{{this.domainInfo.popularity}}</span>
        </div>
        
        <div class="metric">
          <span>Trust Score:</span> <span class="value">{{this.domainInfo.trustScore}}/100</span>
        </div>
        
        <div class="metric">
          <span>Competitor For Admindorid:</span> <span class="value">{{this.domainInfo.isCompetitor}}</span>
        </div>
        
        <div class="metric">
          <span>Rank:</span> <span class="value">{{this.domainInfo.rank}}</span>
        </div>
  
        {{!-- <div class="metric">
          <span>promotion</span> <span class="value">{{this.domainInfo.promotion}}</span>
        </div> --}}
      </div>
      
      {{#if this.contactInfo}}
        <div class="contact-info">
          <h3>Contact Information</h3>
          
          {{#if this.contactInfo.email}}
            <div class="contact-item">
              <span>Support Email:</span> <span class="value">{{this.contactInfo.email}}</span>
            </div>
          {{/if}}
          
          {{#if this.contactInfo.phone}}
            <div class="contact-item">
              <span>Support Phone:</span> <span class="value">{{this.contactInfo.phone}}</span>
            </div>
          {{/if}}
          
          <div class="contact-item">
            <span>Contact Form Available:</span> <span class="value">{{if this.contactInfo.hasContactForm "Yes" "No"}}</span>
          </div>
        </div>
      {{/if}}
    </div>
  {{/if}}
  
  {{#if this.screenshotBase64}}
    <h3>Website Screenshot:</h3>
    <img src="data:image/png;base64,{{this.screenshotBase64}}" alt="Website Screenshot" width="100%" />
  {{/if}}
  
  
  */
  {
    "id": "NWCS57oC",
    "block": "[[[10,\"h1\"],[12],[1,\"Domain\"],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"input-container\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,\"for\",\"email\"],[12],[1,\"Email Address:\"],[13],[1,\"\\n  \"],[8,[39,3],[[24,\"placeholder\",\"e.g., user@example.com\"]],[[\"@value\"],[[30,0,[\"email\"]]]],null],[1,\"\\n  \"],[11,\"button\"],[16,\"disabled\",[30,0,[\"loading\"]]],[24,0,\"classify-btn\"],[24,4,\"button\"],[4,[38,5],[\"click\",[30,0,[\"parseEmail\"]]],null],[12],[1,\"\\n    \"],[1,[52,[30,0,[\"loading\"]],\"Processing...\",\"Classify\"]],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"error\"]],[[[1,\"  \"],[10,0],[14,0,\"error\"],[12],[1,[30,0,[\"error\"]]],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"emailStatus\"]],[[[1,\"  \"],[10,0],[14,0,\"validation-result\"],[12],[1,\"\\n    \"],[10,2],[12],[1,[30,0,[\"emailStatus\"]]],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"domainInfo\"]],[[[1,\"  \"],[10,0],[14,0,\"result-container\"],[12],[1,\"\\n    \"],[10,\"h2\"],[12],[1,\"Class:\"],[1,[30,0,[\"domainInfo\",\"industry\"]]],[1,\" \"],[13],[1,\"\\n    \"],[10,\"h2\"],[12],[1,\"Country:\"],[1,[30,0,[\"domainInfo\",\"location\"]]],[13],[1,\"\\n    \\n    \"],[10,0],[14,0,\"metrics\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"metric\"],[12],[1,\"\\n        \"],[10,1],[12],[1,\"Google popularity:\"],[13],[1,\" \"],[10,1],[14,0,\"value\"],[12],[1,[30,0,[\"domainInfo\",\"popularity\"]]],[13],[1,\"\\n      \"],[13],[1,\"\\n      \\n      \"],[10,0],[14,0,\"metric\"],[12],[1,\"\\n        \"],[10,1],[12],[1,\"Trust Score:\"],[13],[1,\" \"],[10,1],[14,0,\"value\"],[12],[1,[30,0,[\"domainInfo\",\"trustScore\"]]],[1,\"/100\"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \\n      \"],[10,0],[14,0,\"metric\"],[12],[1,\"\\n        \"],[10,1],[12],[1,\"Competitor For Admindorid:\"],[13],[1,\" \"],[10,1],[14,0,\"value\"],[12],[1,[30,0,[\"domainInfo\",\"isCompetitor\"]]],[13],[1,\"\\n      \"],[13],[1,\"\\n      \\n      \"],[10,0],[14,0,\"metric\"],[12],[1,\"\\n        \"],[10,1],[12],[1,\"Rank:\"],[13],[1,\" \"],[10,1],[14,0,\"value\"],[12],[1,[30,0,[\"domainInfo\",\"rank\"]]],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n\"],[1,\"    \"],[13],[1,\"\\n    \\n\"],[41,[30,0,[\"contactInfo\"]],[[[1,\"      \"],[10,0],[14,0,\"contact-info\"],[12],[1,\"\\n        \"],[10,\"h3\"],[12],[1,\"Contact Information\"],[13],[1,\"\\n        \\n\"],[41,[30,0,[\"contactInfo\",\"email\"]],[[[1,\"          \"],[10,0],[14,0,\"contact-item\"],[12],[1,\"\\n            \"],[10,1],[12],[1,\"Support Email:\"],[13],[1,\" \"],[10,1],[14,0,\"value\"],[12],[1,[30,0,[\"contactInfo\",\"email\"]]],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"        \\n\"],[41,[30,0,[\"contactInfo\",\"phone\"]],[[[1,\"          \"],[10,0],[14,0,\"contact-item\"],[12],[1,\"\\n            \"],[10,1],[12],[1,\"Support Phone:\"],[13],[1,\" \"],[10,1],[14,0,\"value\"],[12],[1,[30,0,[\"contactInfo\",\"phone\"]]],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"        \\n        \"],[10,0],[14,0,\"contact-item\"],[12],[1,\"\\n          \"],[10,1],[12],[1,\"Contact Form Available:\"],[13],[1,\" \"],[10,1],[14,0,\"value\"],[12],[1,[52,[30,0,[\"contactInfo\",\"hasContactForm\"]],\"Yes\",\"No\"]],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"screenshotBase64\"]],[[[1,\"  \"],[10,\"h3\"],[12],[1,\"Website Screenshot:\"],[13],[1,\"\\n  \"],[10,\"img\"],[15,\"src\",[29,[\"data:image/png;base64,\",[30,0,[\"screenshotBase64\"]]]]],[14,\"alt\",\"Website Screenshot\"],[14,\"width\",\"100%\"],[12],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"]],[],false,[\"h1\",\"div\",\"label\",\"input\",\"button\",\"on\",\"if\",\"p\",\"h2\",\"span\",\"h3\",\"img\"]]",
    "moduleName": "aiapp/templates/domain.hbs",
    "isStrictMode": false
  });
});
;define("aiapp/templates/scan", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{!-- app/templates/scan.hbs
  <div class="scan-container">
    <div class="header">
      <h1>🔍 Web Content Scanner</h1>
      <p class="subtitle">Search for specific content across any website with competitor analysis</p>
    </div>
  
    <div class="scan-form-wrapper">
      <form {{on "submit" this.trackContent}} class="scan-form">
        <div class="form-row">
          <div class="form-group">
            <label for="url-input" class="form-label">
              <span class="label-icon">🌐</span>
              Website URL
            </label>
            <input 
              id="url-input"
              type="text" 
              placeholder="e.g., example.com or https://example.com/page" 
              value={{this.inputUrl}} 
              {{on "input" this.updateUrl}}
              class="form-input"
              disabled={{this.isLoading}}
            />
          </div>
          <div class="form-group">
            <label for="target-input" class="form-label">
              <span class="label-icon">🎯</span>
              Target Content
            </label>
            <input 
              id="target-input"
              type="text" 
              placeholder="e.g., login, contact, about, product name" 
              value={{this.targetName}} 
              {{on "input" this.updateTarget}}
              class="form-input"
              disabled={{this.isLoading}}
            />
          </div>
        </div>
        <div class="form-actions">
          <button 
            type="submit" 
            class="btn btn-primary {{if this.isLoading 'loading'}}"
            disabled={{not this.isFormValid}}
          >
            {{#if this.isLoading}}
              <span class="spinner"></span>
              Scanning Website...
            {{else}}
              <span class="btn-icon">🚀</span>
              Start Scan
            {{/if}}
          </button>
  
          {{#if this.hasResults}}
            <button 
              type="button" 
              class="btn btn-secondary"
              {{on "click" this.clearResults}}
              disabled={{this.isLoading}}
            >
              <span class="btn-icon">🗑️</span>
              Clear Results
            </button>
          {{/if}}
  
          <button 
            type="button" 
            class="btn btn-secondary"
            {{on "click" this.loadLatestScans}}
            disabled={{this.autoScanLoading}}
          >
            {{#if this.autoScanLoading}}🔄 Loading...{{else}}📥 Load Latest Auto Scan{{/if}}
          </button>
        </div>
      </form>
    </div>
  
    {{#if this.errorMessage}}
      <div class="alert alert-error">
        <span class="alert-icon">❌</span>
        <div class="alert-content">
          <strong>Error:</strong> {{this.errorMessage}}
        </div>
      </div>
    {{/if}}
  
    {{#if this.successMessage}}
      <div class="alert alert-success">
        <span class="alert-icon">✅</span>
        <div class="alert-content">
          <strong>Success:</strong> {{this.successMessage}}
        </div>
      </div>
    {{/if}}
  
    {{#if this.latestScanResults.length}}
      <div class="auto-scan-gallery">
        <h3>📸 Latest Auto Scan Results</h3>
        <div class="auto-scan-grid">
          {{#each this.latestScanResults as |result|}}
    <div class="scan-result-card">
      <h3>🔍 Website: {{result.website}}</h3>
      <p>🎯 Target: {{result.targetName}}</p>
      <p>✅ Found: {{if result.found "Yes" "No"}}</p>
      <p>🔗 URL: <a href={{result.matchedPageUrl}} target="_blank">{{result.matchedPageUrl}}</a></p>
      
      {{#if result.screenshotBase64}}
        <img src="data:image/png;base64,{{result.screenshotBase64}}" alt="Screenshot" style="max-width:400px;" />
      {{/if}}
  
      <small>🕒 Scanned At: {{result.scannedAt}}</small>
    </div>
  {{/each}}
  
        </div>
      </div>
    {{/if}}
  </div> --}}
  
  
  {{!-- app/templates/scan.hbs --}}
  <div class="scan-container">
    <div class="header">
      <h1>🔍 Web Content Scanner</h1>
      <p class="subtitle">Search for specific content across any website with competitor analysis</p>
    </div>
  
    <div class="scan-form-wrapper">
      <form {{on "submit" this.trackContent}} class="scan-form">
        <div class="form-row">
          <div class="form-group">
            <label for="url-input" class="form-label">
              <span class="label-icon">🌐</span>
              Website URL
            </label>
            <input 
              id="url-input"
              type="text" 
              placeholder="e.g., example.com or https://example.com/page" 
              value={{this.inputUrl}} 
              {{on "input" this.updateUrl}}
              class="form-input"
              disabled={{this.isLoading}}
            />
          </div>
          <div class="form-group">
            <label for="target-input" class="form-label">
              <span class="label-icon">🎯</span>
              Target Content
            </label>
            <input 
              id="target-input"
              type="text" 
              placeholder="e.g., login, contact, about, product name" 
              value={{this.targetName}} 
              {{on "input" this.updateTarget}}
              class="form-input"
              disabled={{this.isLoading}}
            />
          </div>
        </div>
        <div class="form-actions">
          <button 
            type="submit" 
            class="btn btn-primary {{if this.isLoading 'loading'}}"
            disabled={{not this.isFormValid}}
          >
            {{#if this.isLoading}}
              <span class="spinner"></span>
              Scanning Website...
            {{else}}
              <span class="btn-icon">🚀</span>
              Start Scan
            {{/if}}
          </button>
  
          {{#if this.hasResults}}
            <button 
              type="button" 
              class="btn btn-secondary"
              {{on "click" this.clearResults}}
              disabled={{this.isLoading}}
            >
              <span class="btn-icon">🗑️</span>
              Clear Results
            </button>
          {{/if}}
  
          <button 
            type="button" 
            class="btn btn-secondary"
            {{on "click" this.loadLatestScans}}
            disabled={{this.autoScanLoading}}
          >
            {{#if this.autoScanLoading}}
              <span class="spinner"></span>
              Loading...
            {{else}}
              📥 Load Latest Auto Scan
            {{/if}}
          </button>
        </div>
      </form>
    </div>
  
    {{#if this.errorMessage}}
      <div class="alert alert-error">
        <span class="alert-icon">❌</span>
        <div class="alert-content">
          <strong>Error:</strong> {{this.errorMessage}}
        </div>
      </div>
    {{/if}}
  
    {{#if this.successMessage}}
      <div class="alert alert-success">
        <span class="alert-icon">✅</span>
        <div class="alert-content">
          <strong>Success:</strong> {{this.successMessage}}
        </div>
      </div>
    {{/if}}
  
  
    {{!-- 🔽 Existing Scan Results Table --}}
    {{#if this.latestScanResults.length}}
      <div class="results-section">
        <div class="results-header">
          <h3>📊 Latest Scan Results</h3>
          <span class="results-count">({{this.latestScanResults.length}} results)</span>
        </div>
        
        <div class="results-table-container">
          <table class="results-table">
            <thead>
              <tr>
                <th>#</th>
                <th>🌐 Website</th>
                <th>🎯 Target</th>
                <th>✅ Status</th>
                <th>🔗 Matched URL</th>
                <th>📸 Screenshot</th>
                <th>🔍 Live</th>
                <th>🏁 Competitor Count</th>
                <th>🔗 Competitor Links</th>
                <th>🕒 Scanned At</th>
              </tr>
            </thead>
            <tbody>
              {{#each this.latestScanResults as |result index|}}
                <tr>
                  <td class="row-number">{{add index 1}}</td>
                  <td class="website-cell"><strong>{{result.website}}</strong></td>
                  <td class="target-cell">{{result.targetName}}</td>
                  <td class="status-cell">
                    {{#if result.found}}
                      <span class="status-badge status-found">✅ Found</span>
                    {{else}}
                      <span class="status-badge status-not-found">❌ Not Found</span>
                    {{/if}}
                  </td>
                  <td class="url-cell">
                    {{#if result.matchedPageUrl}}
                      <a href={{result.matchedPageUrl}} target="_blank" class="url-link">
                        {{result.matchedPageUrl}}
                      </a>
                    {{else}}
                      <span class="no-url">-</span>
                    {{/if}}
                  </td>
                  <td class="screenshot-cell">
                    {{#if result.hasValidScreenshot}}
                      <div class="screenshot-container">
                        <img 
                          src="data:image/png;base64,{{result.validScreenshot}}" 
                          alt="Screenshot" 
                          class="screenshot-img"
                          {{on "click" (fn this.openScreenshotModal result.validScreenshot)}}
                        />
                        <div class="screenshot-overlay">
                          <span>🔍 Click to view full size</span>
                        </div>
                      </div>
                    {{else}}
                      <div class="screenshot-placeholder">
                        <span>📷 No Screenshot</span>
                      </div>
                    {{/if}}
                  </td>
  
                      <td class="live-status-cell">
                        {{#if (eq result.isMatchedUrlLive true)}}
                          <span class="live-yes">🟢 Live</span>
                        {{else if (eq result.isMatchedUrlLive false)}}
                          <span class="live-no">🔴 Not Live</span>
                        {{else}}
                          <span class="live-unknown">⚪ Unknown</span>
                        {{/if}}
                      </td>
  
                      <td class="competitor-count-cell">
                        {{result.competitorCount}}
                      </td>
                      <td class="competitor-links-cell">
                        {{#if result.competitorLinks}}
                          {{#each (split result.competitorLinks ",") as |link|}}
                            <a href="{{link}}" target="_blank">{{link}}</a><br/>
                          {{/each}}
                        {{else}}
                          NIL
                        {{/if}}
                      </td>
  
                  <td class="date-cell">
                    <span class="date-text">
                      {{#if result.formattedDate}}
                        {{result.formattedDate}}
                      {{else}}
                        {{result.scannedAt}}
                      {{/if}}
                    </span>
                  </td>
                </tr>
              {{/each}}
            </tbody>
          </table>
        </div>
      </div>
    {{else}}
      {{#unless this.autoScanLoading}}
        <div class="no-results">
          <div class="no-results-icon">📭</div>
          <h3>No scan results available</h3>
          <p>Click "Load Latest Auto Scan" to view recent scan results</p>
        </div>
      {{/unless}}
    {{/if}}
  </div>
  
  
  
  */
  {
    "id": "O0w9jxO6",
    "block": "[[[1,\"\\n\\n\"],[10,0],[14,0,\"scan-container\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"header\"],[12],[1,\"\\n    \"],[10,\"h1\"],[12],[1,\"🔍 Web Content Scanner\"],[13],[1,\"\\n    \"],[10,2],[14,0,\"subtitle\"],[12],[1,\"Search for specific content across any website with competitor analysis\"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"scan-form-wrapper\"],[12],[1,\"\\n    \"],[11,\"form\"],[24,0,\"scan-form\"],[4,[38,4],[\"submit\",[30,0,[\"trackContent\"]]],null],[12],[1,\"\\n      \"],[10,0],[14,0,\"form-row\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"form-group\"],[12],[1,\"\\n          \"],[10,\"label\"],[14,\"for\",\"url-input\"],[14,0,\"form-label\"],[12],[1,\"\\n            \"],[10,1],[14,0,\"label-icon\"],[12],[1,\"🌐\"],[13],[1,\"\\n            Website URL\\n          \"],[13],[1,\"\\n          \"],[11,\"input\"],[24,1,\"url-input\"],[24,\"placeholder\",\"e.g., example.com or https://example.com/page\"],[16,2,[30,0,[\"inputUrl\"]]],[24,0,\"form-input\"],[16,\"disabled\",[30,0,[\"isLoading\"]]],[24,4,\"text\"],[4,[38,4],[\"input\",[30,0,[\"updateUrl\"]]],null],[12],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,0],[14,0,\"form-group\"],[12],[1,\"\\n          \"],[10,\"label\"],[14,\"for\",\"target-input\"],[14,0,\"form-label\"],[12],[1,\"\\n            \"],[10,1],[14,0,\"label-icon\"],[12],[1,\"🎯\"],[13],[1,\"\\n            Target Content\\n          \"],[13],[1,\"\\n          \"],[11,\"input\"],[24,1,\"target-input\"],[24,\"placeholder\",\"e.g., login, contact, about, product name\"],[16,2,[30,0,[\"targetName\"]]],[24,0,\"form-input\"],[16,\"disabled\",[30,0,[\"isLoading\"]]],[24,4,\"text\"],[4,[38,4],[\"input\",[30,0,[\"updateTarget\"]]],null],[12],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"form-actions\"],[12],[1,\"\\n        \"],[10,\"button\"],[15,0,[29,[\"btn btn-primary \",[52,[30,0,[\"isLoading\"]],\"loading\"]]]],[15,\"disabled\",[28,[37,10],[[30,0,[\"isFormValid\"]]],null]],[14,4,\"submit\"],[12],[1,\"\\n\"],[41,[30,0,[\"isLoading\"]],[[[1,\"            \"],[10,1],[14,0,\"spinner\"],[12],[13],[1,\"\\n            Scanning Website...\\n\"]],[]],[[[1,\"            \"],[10,1],[14,0,\"btn-icon\"],[12],[1,\"🚀\"],[13],[1,\"\\n            Start Scan\\n\"]],[]]],[1,\"        \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"hasResults\"]],[[[1,\"          \"],[11,\"button\"],[24,0,\"btn btn-secondary\"],[16,\"disabled\",[30,0,[\"isLoading\"]]],[24,4,\"button\"],[4,[38,4],[\"click\",[30,0,[\"clearResults\"]]],null],[12],[1,\"\\n            \"],[10,1],[14,0,\"btn-icon\"],[12],[1,\"🗑️\"],[13],[1,\"\\n            Clear Results\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n        \"],[11,\"button\"],[24,0,\"btn btn-secondary\"],[16,\"disabled\",[30,0,[\"autoScanLoading\"]]],[24,4,\"button\"],[4,[38,4],[\"click\",[30,0,[\"loadLatestScans\"]]],null],[12],[1,\"\\n\"],[41,[30,0,[\"autoScanLoading\"]],[[[1,\"            \"],[10,1],[14,0,\"spinner\"],[12],[13],[1,\"\\n            Loading...\\n\"]],[]],[[[1,\"            📥 Load Latest Auto Scan\\n\"]],[]]],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"errorMessage\"]],[[[1,\"    \"],[10,0],[14,0,\"alert alert-error\"],[12],[1,\"\\n      \"],[10,1],[14,0,\"alert-icon\"],[12],[1,\"❌\"],[13],[1,\"\\n      \"],[10,0],[14,0,\"alert-content\"],[12],[1,\"\\n        \"],[10,\"strong\"],[12],[1,\"Error:\"],[13],[1,\" \"],[1,[30,0,[\"errorMessage\"]]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"successMessage\"]],[[[1,\"    \"],[10,0],[14,0,\"alert alert-success\"],[12],[1,\"\\n      \"],[10,1],[14,0,\"alert-icon\"],[12],[1,\"✅\"],[13],[1,\"\\n      \"],[10,0],[14,0,\"alert-content\"],[12],[1,\"\\n        \"],[10,\"strong\"],[12],[1,\"Success:\"],[13],[1,\" \"],[1,[30,0,[\"successMessage\"]]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\\n\"],[41,[30,0,[\"latestScanResults\",\"length\"]],[[[1,\"    \"],[10,0],[14,0,\"results-section\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"results-header\"],[12],[1,\"\\n        \"],[10,\"h3\"],[12],[1,\"📊 Latest Scan Results\"],[13],[1,\"\\n        \"],[10,1],[14,0,\"results-count\"],[12],[1,\"(\"],[1,[30,0,[\"latestScanResults\",\"length\"]]],[1,\" results)\"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \\n      \"],[10,0],[14,0,\"results-table-container\"],[12],[1,\"\\n        \"],[10,\"table\"],[14,0,\"results-table\"],[12],[1,\"\\n          \"],[10,\"thead\"],[12],[1,\"\\n            \"],[10,\"tr\"],[12],[1,\"\\n              \"],[10,\"th\"],[12],[1,\"#\"],[13],[1,\"\\n              \"],[10,\"th\"],[12],[1,\"🌐 Website\"],[13],[1,\"\\n              \"],[10,\"th\"],[12],[1,\"🎯 Target\"],[13],[1,\"\\n              \"],[10,\"th\"],[12],[1,\"✅ Status\"],[13],[1,\"\\n              \"],[10,\"th\"],[12],[1,\"🔗 Matched URL\"],[13],[1,\"\\n              \"],[10,\"th\"],[12],[1,\"📸 Screenshot\"],[13],[1,\"\\n              \"],[10,\"th\"],[12],[1,\"🔍 Live\"],[13],[1,\"\\n              \"],[10,\"th\"],[12],[1,\"🏁 Competitor Count\"],[13],[1,\"\\n              \"],[10,\"th\"],[12],[1,\"🔗 Competitor Links\"],[13],[1,\"\\n              \"],[10,\"th\"],[12],[1,\"🕒 Scanned At\"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,19],[[28,[37,19],[[30,0,[\"latestScanResults\"]]],null]],null],null,[[[1,\"              \"],[10,\"tr\"],[12],[1,\"\\n                \"],[10,\"td\"],[14,0,\"row-number\"],[12],[1,[28,[35,21],[[30,2],1],null]],[13],[1,\"\\n                \"],[10,\"td\"],[14,0,\"website-cell\"],[12],[10,\"strong\"],[12],[1,[30,1,[\"website\"]]],[13],[13],[1,\"\\n                \"],[10,\"td\"],[14,0,\"target-cell\"],[12],[1,[30,1,[\"targetName\"]]],[13],[1,\"\\n                \"],[10,\"td\"],[14,0,\"status-cell\"],[12],[1,\"\\n\"],[41,[30,1,[\"found\"]],[[[1,\"                    \"],[10,1],[14,0,\"status-badge status-found\"],[12],[1,\"✅ Found\"],[13],[1,\"\\n\"]],[]],[[[1,\"                    \"],[10,1],[14,0,\"status-badge status-not-found\"],[12],[1,\"❌ Not Found\"],[13],[1,\"\\n\"]],[]]],[1,\"                \"],[13],[1,\"\\n                \"],[10,\"td\"],[14,0,\"url-cell\"],[12],[1,\"\\n\"],[41,[30,1,[\"matchedPageUrl\"]],[[[1,\"                    \"],[10,3],[15,6,[30,1,[\"matchedPageUrl\"]]],[14,\"target\",\"_blank\"],[14,0,\"url-link\"],[12],[1,\"\\n                      \"],[1,[30,1,[\"matchedPageUrl\"]]],[1,\"\\n                    \"],[13],[1,\"\\n\"]],[]],[[[1,\"                    \"],[10,1],[14,0,\"no-url\"],[12],[1,\"-\"],[13],[1,\"\\n\"]],[]]],[1,\"                \"],[13],[1,\"\\n                \"],[10,\"td\"],[14,0,\"screenshot-cell\"],[12],[1,\"\\n\"],[41,[30,1,[\"hasValidScreenshot\"]],[[[1,\"                    \"],[10,0],[14,0,\"screenshot-container\"],[12],[1,\"\\n                      \"],[11,\"img\"],[16,\"src\",[29,[\"data:image/png;base64,\",[30,1,[\"validScreenshot\"]]]]],[24,\"alt\",\"Screenshot\"],[24,0,\"screenshot-img\"],[4,[38,4],[\"click\",[28,[37,24],[[30,0,[\"openScreenshotModal\"]],[30,1,[\"validScreenshot\"]]],null]],null],[12],[13],[1,\"\\n                      \"],[10,0],[14,0,\"screenshot-overlay\"],[12],[1,\"\\n                        \"],[10,1],[12],[1,\"🔍 Click to view full size\"],[13],[1,\"\\n                      \"],[13],[1,\"\\n                    \"],[13],[1,\"\\n\"]],[]],[[[1,\"                    \"],[10,0],[14,0,\"screenshot-placeholder\"],[12],[1,\"\\n                      \"],[10,1],[12],[1,\"📷 No Screenshot\"],[13],[1,\"\\n                    \"],[13],[1,\"\\n\"]],[]]],[1,\"                \"],[13],[1,\"\\n\\n                    \"],[10,\"td\"],[14,0,\"live-status-cell\"],[12],[1,\"\\n\"],[41,[28,[37,25],[[30,1,[\"isMatchedUrlLive\"]],true],null],[[[1,\"                        \"],[10,1],[14,0,\"live-yes\"],[12],[1,\"🟢 Live\"],[13],[1,\"\\n\"]],[]],[[[41,[28,[37,25],[[30,1,[\"isMatchedUrlLive\"]],false],null],[[[1,\"                        \"],[10,1],[14,0,\"live-no\"],[12],[1,\"🔴 Not Live\"],[13],[1,\"\\n\"]],[]],[[[1,\"                        \"],[10,1],[14,0,\"live-unknown\"],[12],[1,\"⚪ Unknown\"],[13],[1,\"\\n                      \"]],[]]]],[]]],[1,\"                    \"],[13],[1,\"\\n\\n                    \"],[10,\"td\"],[14,0,\"competitor-count-cell\"],[12],[1,\"\\n                      \"],[1,[30,1,[\"competitorCount\"]]],[1,\"\\n                    \"],[13],[1,\"\\n                    \"],[10,\"td\"],[14,0,\"competitor-links-cell\"],[12],[1,\"\\n\"],[41,[30,1,[\"competitorLinks\"]],[[[42,[28,[37,19],[[28,[37,19],[[28,[37,26],[[30,1,[\"competitorLinks\"]],\",\"],null]],null]],null],null,[[[1,\"                          \"],[10,3],[15,6,[29,[[30,3]]]],[14,\"target\",\"_blank\"],[12],[1,[30,3]],[13],[10,\"br\"],[12],[13],[1,\"\\n\"]],[3]],null]],[]],[[[1,\"                        NIL\\n\"]],[]]],[1,\"                    \"],[13],[1,\"\\n\\n                \"],[10,\"td\"],[14,0,\"date-cell\"],[12],[1,\"\\n                  \"],[10,1],[14,0,\"date-text\"],[12],[1,\"\\n\"],[41,[30,1,[\"formattedDate\"]],[[[1,\"                      \"],[1,[30,1,[\"formattedDate\"]]],[1,\"\\n\"]],[]],[[[1,\"                      \"],[1,[30,1,[\"scannedAt\"]]],[1,\"\\n\"]],[]]],[1,\"                  \"],[13],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n\"]],[1,2]],null],[1,\"          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],[[[41,[51,[30,0,[\"autoScanLoading\"]]],[[[1,\"      \"],[10,0],[14,0,\"no-results\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"no-results-icon\"],[12],[1,\"📭\"],[13],[1,\"\\n        \"],[10,\"h3\"],[12],[1,\"No scan results available\"],[13],[1,\"\\n        \"],[10,2],[12],[1,\"Click \\\"Load Latest Auto Scan\\\" to view recent scan results\"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null]],[]]],[13],[1,\"\\n\\n\\n\"]],[\"result\",\"index\",\"link\"],false,[\"div\",\"h1\",\"p\",\"form\",\"on\",\"label\",\"span\",\"input\",\"button\",\"if\",\"not\",\"strong\",\"h3\",\"table\",\"thead\",\"tr\",\"th\",\"tbody\",\"each\",\"-track-array\",\"td\",\"add\",\"a\",\"img\",\"fn\",\"eq\",\"split\",\"br\",\"unless\"]]",
    "moduleName": "aiapp/templates/scan.hbs",
    "isStrictMode": false
  });
});
;define("aiapp/transforms/boolean", ["exports", "@ember/debug", "@ember-data/serializer/transform"], function (_exports, _debug, _transform) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _transform.BooleanTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"@ember-data/serializer/transform"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the BooleanTransform. Use `export { BooleanTransform as default } from '@ember-data/serializer/transform';` in app/transforms/boolean.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '4.13'
    }
  }));
});
;define("aiapp/transforms/date", ["exports", "@ember/debug", "@ember-data/serializer/transform"], function (_exports, _debug, _transform) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _transform.DateTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"@ember-data/serializer/transform"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the DateTransform. Use `export { DateTransform as default } from '@ember-data/serializer/transform';` in app/transforms/date.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '4.13'
    }
  }));
});
;define("aiapp/transforms/number", ["exports", "@ember/debug", "@ember-data/serializer/transform"], function (_exports, _debug, _transform) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _transform.NumberTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"@ember-data/serializer/transform"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the NumberTransform. Use `export { NumberTransform as default } from '@ember-data/serializer/transform';` in app/transforms/number.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '4.13'
    }
  }));
});
;define("aiapp/transforms/string", ["exports", "@ember/debug", "@ember-data/serializer/transform"], function (_exports, _debug, _transform) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _transform.StringTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"@ember-data/serializer/transform"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the StringTransform. Use `export { StringTransform as default } from '@ember-data/serializer/transform';` in app/transforms/string.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '4.13'
    }
  }));
});
;

;define('aiapp/config/environment', [], function() {
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

;
          if (!runningTests) {
            require("aiapp/app")["default"].create({"name":"aiapp","version":"0.0.0+dafb071d"});
          }
        
//# sourceMappingURL=aiapp.map
