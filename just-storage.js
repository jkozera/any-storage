var storage = require('just-storage');

module.exports = {
  get: get,
  set: set
};

function get (key, cb) {
  return cb(null, storage(key));
}
function set (key, value, cb) {
  return cb(null, storage.set(key, value));
}
