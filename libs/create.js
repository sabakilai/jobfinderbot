var parser = require('./parser');
var AWS = require('./AWS');
var dict = require('./dict');

module.exports = function () {
  var parsers = [];
  for (var i = 1; i < 31; i++) {
    parsers.push(parser(dict(i).branch,1));
  }
  Promise.all(parsers).then((data)=>{
    console.log(data);

  })
}
