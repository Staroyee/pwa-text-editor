const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
// Import functions for offline fallback and cache warming.

const { CacheFirst } = require('workbox-strategies');
// Import the CacheFirst strategy from Workbox for page caching.

const { registerRoute } = require('workbox-routing');
// Import the registerRoute function from Workbox for defining URL routes.

const { CacheableResponsePlugin } = require('workbox-cacheable-response');
// Import the CacheableResponsePlugin for caching responses with specified statuses.

const { ExpirationPlugin } = require('workbox-expiration');
// Import the ExpirationPlugin for setting expiration criteria for cached items.

const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');
// Import the precacheAndRoute function for precaching and routing assets.

// Precache the assets defined in the __WB_MANIFEST.
precacheAndRoute(self.__WB_MANIFEST);
// Use the precacheAndRoute function to precache and route assets as specified in the manifest.

// Create a CacheFirst strategy for caching pages.
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
    },
  ],
});
// Define a CacheFirst strategy for caching pages with cache name and plugins.

// Warm the cache with specified URLs using the pageCache strategy.
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});
// Warm the cache with specified URLs using the defined pageCache strategy.

// Register a route for navigation requests using the pageCache strategy.
registerRoute(({ request }) => request.mode === 'navigate', pageCache);
// Register a route for navigation requests using the pageCache strategy.

// TODO: Implement asset caching
registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);
// Register a route for caching assets with a StaleWhileRevalidate strategy.
