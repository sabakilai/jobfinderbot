"use strict"
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./bucket.json');
var s3 = new AWS.S3();

module.exports = {
  read(file) {
    return new Promise((resolve,reject)=>{
      var params = {
          Bucket: 'jobfinderkg',
          Key: file
      };
      s3.getObject(params, function(err, data) {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(JSON.parse(data.Body.toString()));
      })
    });
  },
  read(file, data){
    return new Promise(function (resolve, reject) {
      var params = {
              Bucket: 'jobfinderkg',
              Key: file,
              Body: data
          }
      s3.putObject(params, function (perr, pres) {
          if (perr) {
              reject("Error uploading data: ", perr);
          } else {
              resolve('Added '+ file +' file ');
          }
      });
    })
  }
}
