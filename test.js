var test = require('tape');
var storage = require('./');

test('basic get/set', function (t) {
  storage.set('foo', 'bar', function () {
    t.ok(true);
    storage.get('foo', function (err, data) {
      t.notOk(err);
      t.equal(data, 'bar');
      t.end();
    });
  });
});

test('multiple sets', function (t) {
  storage.set({
    'foo': 'bar',
    'bin': 'baz',
    'indeed': 'quite'
  }, function () {
    t.ok(true);
    storage.get('foo', function (err, data) {
      t.notOk(err);
      t.equal(data, 'bar');
      t.end();
    });
  });
});
test('multiple gets', function (t) {
  storage.set({
    'foo': 'bar',
    'bin': 'baz',
    'indeed': 'quite'
  }, function () {
    t.ok(true);
    storage.get(['foo', 'bin'], function (err, data) {
      t.notOk(err);
      t.deepEqual(data, {
        'foo': 'bar',
        'bin': 'baz'
      });
      t.end();
    });
  });
});
