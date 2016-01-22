export default function(fn, req, res) {
  const originalEnd = res.end;
  return new Promise(resolve => {
    res.end = function() {
      originalEnd.apply(this, arguments);
      resolve(true);
    };
    fn(req, res, function() {
      resolve(true);
    });
  });
};

