(function() {
  const API_BASE_URL = 'https://share.afiliiate.com/v3/api/v1';
  const BANNER_SIZES = {
    'banner': { width: 468, height: 60 },
    'leaderboard': { width: 728, height: 90 },
    'medium_rectangle': { width: 300, height: 250 }
  };

  class AdTokenWidget {
    constructor(apiKey, options = {}) {
      if (!apiKey) {
        throw new Error('API key is required');
      }
      this.apiKey = apiKey;
      this.containerId = options.containerId || 'adtoken-widget';
      this.size = options.size || 'banner';
      
      // Check if document is ready, if not wait for it
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.init());
      } else {
        this.init();
      }
    }

    // ... rest of the class implementation stays the same ...
  }

  // Don't auto-initialize, let the user do it
  if (typeof window !== 'undefined') {
    window.AdTokenWidget = AdTokenWidget;
  }
})();