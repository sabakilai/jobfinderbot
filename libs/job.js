var parser = require('./parser');
var AWS = require('./AWS');
var async = require('async');
var db = require('../data/db.js');
var newChat = require("../models/newchat.js");
var dict = require('./dict');

function checkChanges () {
  return new Promise ((resolve, reject)=>{
    var files = [];
    var parsers = [];
    var tosend = [];
    var saves = [];
    for (var i = 1; i < 31; i++) {
      files.push(AWS.read('jobkg' + dict(i.toString()).branch + '.json'));
    }
    Promise.all(files).then((file_link)=>{
      for (var i = 1; i < 31; i++) {
        parsers.push(parser(dict(i.toString()).branch,1));
      }
      Promise.all(parsers).then((parser_link)=>{
        for (var i = 0; i < 30; i++) {
          if (file_link[i].link!=parser_link[i][0].link) {
            AWS.save('jobkg' + dict((i+1).toString()).branch + '.json', JSON.stringify(parser_link[i][0])).then((message)=>{
              console.log(message);
            }).catch((error)=>{
              console.log(error);;
            })
            tosend.push(dict((i+1).toString()).branch)
          }
        }
        resolve(tosend);

      }).catch((error)=>{
        reject('Error parsing: ' + error);
      })
    }).catch((error)=>{
      reject('Error reading files: ' + error);
    })
  })
};

module.exports = function () {
  var branch;
  checkChanges().then((tosend)=>{
    if (tosend.length > 0) {
      setTimeout(function () {
        for (var i = 0; i < tosend.length; i++) {
          branch = tosend[i];
          db.findAll({where: {subscribed: true, branch:branch}}).then((results) => {
            async.each(results,function (result,callback) {
              var userId = result.userId;
              var ip = result.ip;
              var messages = [];
              AWS.read('jobkg' + branch + '.json').then((data)=>{
                newChat(userId, ip, function(err, res, body) {
                  if(body.data) {
                    var chatId = body.data.id;
                  }
                  new_sms('💼'+data[0].title+'\n💰'+data[0].salary+'\n🏭'+data[0].company+'\n📍'+data[0].address+'\n💬'+data[0].apropos+'\n🔗'+data[0].link,chatId,ip).then((message)=>{
                    console.log(message);
                  })
                })
              })
            })
          })
        }
      },10000)
    } else {
      console.log('Nothing to send.');
    }
  }).catch((error)=>{
    console.log(error);
  })
}
