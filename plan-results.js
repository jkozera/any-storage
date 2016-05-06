module.exports = Plan;

function Plan (count, callback) {
  var errors = [];
  var result = {};

  return handler;

  function handler (name) {
    return function (err, data) {
      count--;
      if (err) {
        errors.push(err);
      } else {
        result[name] = data;
      }

      if (count === 0) {
        if (errors.length) {
          return callback(errors);
        } else {
          return callback(null, result);
        }
      }
    };
  }
}
