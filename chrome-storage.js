
module.exports = {
  get: getItem,
  set: setItem,
  removeItem: removeItem
};

var chrome = require('global/window').chrome;

// code taken from https://github.com/zalmoxisus/chrome-storage-local/blob/master/storage.js
function getItem (key, callback) {
  chrome.storage.local.get(key, function (obj) {
    if (obj[key]) {
      callback(null, obj[key]);
    } else {
      callback(chrome.runtime.lastError, null);
    }
  });
}

function setItem (key, value, callback) {
  var obj = {};
  obj[key] = value;
  chrome.storage.local.set(obj, function () {
    if (callback && chrome.runtime.lastError) callback(key);
  });
}

function removeItem (key, cb) {
  chrome.storage.local.remove(key, cb);
}

// function getAllKeys (callback) {
//   chrome.storage.local.get(null, function (obj) {
//     callback(null, Object.keys(obj));
//   });
// }
