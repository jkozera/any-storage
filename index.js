var storage = null;
var sugar = require('./api-sugar');

if (require('has-chrome-storage')) {
  storage = require('./chrome-storage');
} else {
  // just storage handles local, session, and in-memory
  storage = require('./just-storage');
}

module.exports = sugar(storage);
