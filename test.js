var test = require('tape');
var storage = require('./');

test('basic get/set', function (t) {
  storage.set('foo', 'bar', function (err) {
    t.notOk(err);
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
  }, function (err) {
    t.notOk(err);
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
  }, function (err) {
    t.notOk(err);
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

test('remote', function (t) {
  storage.set('key', 'val', function (err) {
    t.notOk(err, 'no errors');
    storage.remove('key', function (err) {
      t.notOk(err, 'no errors');
      storage.get('key', function (err, val) {
        t.notOk(err, 'no errors');
        t.notOk(val, 'no errors');
        t.end();
      });
    });
  });
});
