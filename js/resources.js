/* Resources.js is used to load the game images and cache any reused images.
 */

(function() {
    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

// Load an image url or an array of image urls
    function load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        }
        else {
            _load(urlOrArr);
        }
    }

// Searches to find if an image has been cached.  If so return the cached image, if not then load that image
// into cache and return it.
    function _load(url) {
        if(resourceCache[url]) {
            return resourceCache[url];
        }
        else {
            var img = new Image();
            img.onload = function() {
                resourceCache[url] = img;

                if(isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };
            resourceCache[url] = false;
            img.src = url;
        }
    }


// Return an image that is already known to be cached
    function get(url) {
        return resourceCache[url];
    }

    
// Make sure that all necessary images have been loaded.
    function isReady() {
        var ready = true;
        for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&
               !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

// All images are loaded, now Push a function to the readyCallBacks stack 
    function onReady(func) {
        readyCallbacks.push(func);
    }

// Define the accessible functions for the image resources
    window.Resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();
