var parser = require('./parser');
var AWS = require('./AWS');
var dict = require('./dict');

module.exports = function () {
  var parsers = [];
  //for (var i = 1; i < 31; i++) {
  //  parsers.push(parser(dict(11).branch,1));
  //}
  parser("6",1).then((data)=>{
    console.log(data);

  })
}
