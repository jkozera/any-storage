var isFunction = require('is-function');
var isObject = require('is-object');
var afterAll = require('after-all-results');

module.exports = sugar;

function sugar (root) {
  var api = {
    get: get,
    set: set
  };

  return api;

  function get (key, cb) {
    if (!isFunction(cb)) {
      throw new Error('Must pass in a callback to storage.get');
    }
    if (Array.isArray(key)) {
      var next = afterAll(function (result) {
        // remove dummy entry from the synchronous check
        result.shift();
        cb(result);
      });
      var start = next();
      key.forEach(function (k) {
        var innerCb = next();
        root.get(k, function (err, value) {
          if (value === undefined) {
            value = null;
          }
          innerCb(err, value);
        });
      });
      return start();
    }
    return root.get(key, cb);
  }
  function set (key, value, cb) {
    if (isFunction(value)) {
      if (!isObject(key)) {
        throw new Error('If the second parameter to set is a callback then the first must be an object');
      }
      cb = value;
      value = null;

      var next = afterAll(cb);
      var start = next();
      Object.keys(key).forEach(function (k) {
        root.set(k, key[k], next());
      });
      return start();
    }

    // callback is optional
    if (arguments.length === 2) {
      cb = noop;
    }

    return root.set(key, value, cb);
  }
}

function noop () {}