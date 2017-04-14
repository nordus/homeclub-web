
angular
    .module( 'app.carrieradmin' )
    .factory( 'BuildUrl', BuildUrl );


/** @ngInject */
function BuildUrl() {
  var encodeUriQuery, forEachSorted, sortedKeys;
  encodeUriQuery = function(val, pctEncodeSpaces) {
    return encodeURIComponent(val).replace(/%40/g, "@").replace(/%3A/g, ":").replace(/%24/g, "$").replace(/%2C/g, ",").replace(/%3B/g, ";").replace(/%20/g, (pctEncodeSpaces ? "%20" : "+"));
  };
  sortedKeys = function(obj) {
    var key, keys;
    keys = [];
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    return keys.sort();
  };
  forEachSorted = function(obj, iterator, context) {
    var i, keys;
    keys = sortedKeys(obj);
    i = 0;
    while (i < keys.length) {
      iterator.call(context, obj[keys[i]], keys[i]);
      i++;
    }
    return keys;
  };
  return function(url, params) {
    var parts;
    if (!params) {
      return url;
    }
    parts = [];
    forEachSorted(params, function(value, key) {
      if (value === null || angular.isUndefined(value)) {
        return;
      }
      if (!angular.isArray(value)) {
        value = [value];
      }
      angular.forEach(value, function(v) {
        if (angular.isObject(v)) {
          if (angular.isDate(v)) {
            v = v.toISOString();
          } else {
            if (angular.isObject(v)) {
              v = toJson(v);
            }
          }
        }
        parts.push(encodeUriQuery(key) + "=" + encodeUriQuery(v));
      });
    });
    if (parts.length > 0) {
      url += (url.indexOf("?") === -1 ? "?" : "&") + parts.join("&");
    }
    return url;
  };
};