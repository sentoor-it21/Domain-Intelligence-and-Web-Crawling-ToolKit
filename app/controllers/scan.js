import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ScanController extends Controller {
  @tracked inputUrl = '';
  @tracked targetName = '';
  @tracked foundUrls = [];
  @tracked foundUrlsWithNavigationPath = [];
  @tracked foundCount = 0;
  @tracked isLoading = false;
  @tracked errorMessage = '';
  @tracked successMessage = '';
  @tracked searchedPages = 0;

  // NEW for auto scan view
  @tracked latestScanResults = [];
  @tracked autoScanLoading = false;

  apiEndpoint = 'https://localhost:7242/api/track';

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



  @action
  updateUrl(event) {
    this.inputUrl = event.target.value;
    this.clearMessages();
  }

  @action
  updateTarget(event) {
    this.targetName = event.target.value;
    this.clearMessages();
  }

  @action
  clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  @action
  clearResults() {
    this.foundUrls = [];
    this.foundUrlsWithNavigationPath = [];
    this.foundCount = 0;
    this.searchedPages = 0;
    this.latestScanResults = [];
    this.clearMessages();
  }

  @action
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

  @action
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
        let processedResult = { ...result };

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
                stepNumber: i + 1,
              };
            });
          }
        } catch (e) {
          console.error('Failed to parse navigationPathJson:', e);
        }
      }
      else {
        processedResult.navigationSteps = [];
        }

        // Format date
        if (result.scannedAt) {
        processedResult.formattedDate = new Date(result.scannedAt).toLocaleString();
        }

        processedResult.competitorCount = result.competitorCount || 0;
        processedResult.competitorLinks = result.competitorLinks
          ? result.competitorLinks.split(',').map(link => link.trim())
          : [];


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

  @action
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
    return (
      this.foundUrls.length > 0 ||
      this.foundUrlsWithNavigationPath.length > 0 ||
      this.latestScanResults.length > 0
    );
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

  
}