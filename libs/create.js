var parser = require('./parser');
var AWS = require('./AWS');
var dict = require('./dict');

module.exports = function () {
  var parsers = [];
  var saves = [];
  for (var i = 1; i < 31; i++) {
    parsers.push(parser(dict(i.toString()).branch,1));
  }
  Promise.all(parsers).then((data)=>{
    for (var i = 0; i < 30; i++) {
      console.log('jobkg' + dict((i+1).toString()).branch + '.json');
      console.log(data[i][0]);
      saves.push(AWS.save('jobkg' + dict((i+1).toString()).branch + '.json',data[i][0]))
    }
    Promise.all(saves).then((messages)=>{
      console.log(messages);
    }).catch((error)=>{
      console.log(error);
    })
  }).catch((error)=>{
    console.log(error);
  })
}
