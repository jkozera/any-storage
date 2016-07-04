var isFunction = require('is-function');
var isObject = require('is-object');
var afterAll = require('./plan-results');

module.exports = sugar;

function sugar (root) {
  var api = {
    get: get,
    set: set,
    remove: remove
  };

  if (!root.remove) {
    root.remove = fakeRemove;
  }

  return api;

  function fakeRemove (key, cb) {
    root.set(key, null, cb);
  }

  function get (key, cb) {
    if (!isFunction(cb)) {
      throw new Error('Must pass in a callback to storage.get');
    }
    if (Array.isArray(key)) {
      var next = afterAll(key.length, function (err, result) {
        if (err) {
          return cb(err);
        }
        cb(null, result);
      });
      key.forEach(function (k) {
        var innerCb = next(k);
        root.get(k, function (err, value) {
          if (value === undefined) {
            value = null;
          }
          innerCb(err, value);
        });
      });
      return;
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

      var keyArr = Object.keys(key);
      var next = afterAll(keyArr.length, cb);
      keyArr.forEach(function (k) {
        root.set(k, key[k], next(k));
      });
      return;
    }

    // callback is optional
    if (arguments.length === 2) {
      cb = noop;
    }

    return root.set(key, value, cb);
  }

  function remove (key, cb) {
    if (!isFunction(cb)) {
      cb = noop;
    }
    if (Array.isArray(key)) {
      var next = afterAll(key.length, function (err, result) {
        if (err) {
          return cb(err);
        }
        cb(null, result);
      });
      key.forEach(function (k) {
        root.remove(k, next(k));
      });
      return;
    }
    return root.remove(key, cb);
  }
}

function noop () {}
