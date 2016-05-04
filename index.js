var storage = null;
var sugar = require('./api-sugar');

if (require('has-local-storage')) {
  storage = require('./just-storage');
} else if (require('has-chrome-storage')) {
  storage = require('./chrome-storage');
} else {
  console.warn('Unknown storage environment! Falling back to memory storage');
  storage = require('./just-storage');
}

module.exports = sugar(storage);
