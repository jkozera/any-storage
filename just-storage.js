var storage = require('just-storage');

module.exports = {
  get: get,
  set: set,
  remove: remove
};

function get (key, cb) {
  return cb(null, storage(key));
}
function set (key, value, cb) {
  return cb(null, storage.set(key, value));
}
function remove (key, cb) {
  // just-storage removes the item when null is passed to set
  return cb(null, storage.set(key, null));
}
