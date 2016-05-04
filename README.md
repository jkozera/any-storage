# any-storage [![Build Status](https://travis-ci.org/chrisinajar/any-storage.svg?branch=master)](https://travis-ci.org/chrisinajar/any-storage)
Use any possible storage mechanism available asynchronously.

Supports local storage, chrome storage, or in-memory storage.


## Installation

`npm install --save any-storage`


## Usage

```js
var storage = require('any-storage');

// set
storage.set('someKey', 'value', function (err) {
});
storage.set({
  'anotherKey': 'indeed'
}, function (err) {
});

// get
storage.get('someKey', function (err, value) {
});
storage.get(['someKey', 'anotherKey'], function (err, value) {
});

// remove
storage.remove('someKey', function (err) {});
storage.remove(['someKey', 'anotherKey'], function (err) {});
```


## Contributing

Could definite use some test cases, mostly relies on `just-storage`


# License

MIT
