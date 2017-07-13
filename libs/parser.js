"use strict"
let Xray = require('x-ray');
let x = Xray({
  filters: {
    replace: function (value) {
      return typeof value === 'string' ? value.replace(/(?:\r\n|\r|·|\n|\t|\\)/g, "").trim() : value
    },
    spaces: function (value) {
      return typeof value === 'string' ? value.replace(/\s/g, '') : value
    }
  }
});

module.exports = function(branch,quantity) {
  let url = 'http://www.job.kg/vacancy/vbranch'+ branch +'?sortby=2';
  return new Promise(function (resolve, reject) {
  x(url, '.vvl-one', [{
    title: 'h2 | replace',
    salary:'.salary- | replace',
    company: '.company- | replace',
    address:'.address- | replace | spaces',
    apropos:'.clearfix |replace',
    link: 'a@href'
  }])
  (function (err,data) {
    if (err) {
      reject(err);
    }
    data = data.slice(0, quantity)
    resolve(data);
  })
})
}
