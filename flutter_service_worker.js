'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "aeb6af50d7a461fe39b819e556e07ed4",
"assets/assets/fonts/Joan-Regular.ttf": "8f40fda25060f8459de802ab0159ef9d",
"assets/assets/images/android_studio.png": "ecda989b971ff7f2c7c7e9c6809ea9a3",
"assets/assets/images/bg.jpg": "c7c42a4e81918456bad5156e568becf9",
"assets/assets/images/c++.png": "b8a1078d92d851db2364d5e405a0649d",
"assets/assets/images/c.png": "11396a41fce307b10316e942e62d2d39",
"assets/assets/images/dart.png": "918e7c35823c7ad268ba831c6e7eaa64",
"assets/assets/images/flutter.png": "8efb797d33c586ef3cb71d4083dd1fdb",
"assets/assets/images/java.png": "7013d3cd840b6bed9697daf954c4c3e2",
"assets/assets/images/m1.jpg": "7d1d52ea5fab07ddbcc33e4f2e902d2a",
"assets/assets/images/m10.jpg": "778e3993a9399d848c2962de1ce92944",
"assets/assets/images/m11.jpg": "5143eba7e81ab35d4189bc5cbb934530",
"assets/assets/images/m12.jpg": "2b450de23349d23d5a9e4520bfb7f0bc",
"assets/assets/images/m13.jpg": "93ebfb7824473e56469d94ea982ef661",
"assets/assets/images/m14.jpg": "ec4949264a667b92acd68e2b80d52062",
"assets/assets/images/m15.jpg": "e44639759cb2058ef1b0b6230794190c",
"assets/assets/images/m16.jpg": "0525c15987d2e8d81c3e6779a151ce08",
"assets/assets/images/m17.jpg": "0b6a2b8ee3305c5b6030b93e5c5cf7d3",
"assets/assets/images/m2.jpg": "f4657320ad7d141315366ce23ab445e9",
"assets/assets/images/m3.jpg": "415f3b3748554b8dc8f7666603513157",
"assets/assets/images/m4.jpg": "c880f5a48bf2c2f82b771d07bb789156",
"assets/assets/images/m5.jpg": "7477168adc017b9def2e436c804eab77",
"assets/assets/images/m6.jpg": "0a87a0186ed4530b33d40b0b967b3325",
"assets/assets/images/m7.jpg": "5acf7f90074848e4e1b81b9c03189227",
"assets/assets/images/m8.jpg": "9fe92f5f47968e6f2e452d775130c77c",
"assets/assets/images/m9.jpg": "74c89eca2a8ab5bb1064bedaa898d6f8",
"assets/assets/images/man.jpg": "0ba143296457050d16008839f4a18cfa",
"assets/assets/images/manvendra.jpg": "34de2ffa49481b76b04022b4de04df86",
"assets/assets/images/monty.png": "66389bb828c7cf0dffca7c3b4f58cf4f",
"assets/assets/images/postman-icon.png": "3ea38d2f537dfb48a759ad0e0682ff37",
"assets/assets/images/python.png": "6841951dd3623f17a3f6a880c3f4f0a0",
"assets/FontManifest.json": "c88989a137019e027f4aea23ce328882",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "00797453fa4fa56bd697eb05e3a4aac4",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "02b0db84cc4cba03b511948af9ab136d",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "7d8e80db940e9ee52f31ba1452a1e422",
"/": "7d8e80db940e9ee52f31ba1452a1e422",
"main.dart.js": "05cc4e06a458743890cc8bec82b4a89e",
"manifest.json": "07f66434d604ccac1b4d5244f35598aa",
"version.json": "7367c9ca1c69727a8bb09a7d2d21d48c"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
