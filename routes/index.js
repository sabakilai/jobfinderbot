"use stricts";
var express = require('express');
var db = require("../data/db.js");
var sms = require("../models/sms.js");
var new_sms = require("../models/new_sms.js");
var newChat = require("../models/newchat.js");
var async = require('async');
var router = express.Router();
var pg = require('pg');
let parser = require('../libs/parser');
let dict = require('../libs/dict');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/", function(req, res, next) {
  var ip = req.connection.remoteAddress;
    var event = req.body.event;
    var selectField = function() {
      return " Выберите категорию вакансий, по которым Вы хотите получать рассылку, для этого введите нужную цифру:\n1️⃣ Топ-менеджмент, руководители .\n2️⃣ Автомобильный бизнес. \n3️⃣ Административный персонал. \n4️⃣ Банки, страхование, лизинг. \n5️⃣ Безопасность, охрана. \n6️⃣ Бухгалтерия. \n7️⃣ Некоммерческие организации. \n8️⃣ Дизайн, искусство, развлечения. \n9️⃣ Домашний персонал. \n1⃣0⃣ Закупки, поставки, ВЭД . \n1⃣1⃣ Интернет, IT, телеком, связь. \n1⃣2⃣ Логистика, транспорт, склад. \n1⃣3⃣ Маркетинг, реклама, PR. \n1⃣4⃣  Медицина, фармацевтика. \n1⃣5⃣Наука, образование \n1⃣6⃣Отдел кадров, HR. \n1⃣7⃣Подработка, сезонная работа. \n1⃣8⃣Продажи (работа в офисе). \n1⃣9⃣Продажи (розничная торговля).\n ️2⃣0⃣Промышленность.\n2⃣1⃣ Рабочий персонал.\n2⃣2⃣Повара, официанты.\n2⃣3⃣СМИ, полиграфия."
       + "\n ️2⃣4⃣Спорт, салоны красоты. \n2⃣5⃣Строительство, недвижимость.\n2⃣6⃣Туризм, гостиницы. \n 2⃣7⃣Услуги, ремонт.\n2⃣8⃣Юриспруденция. \n2⃣9⃣Работа для молодежи.\n3⃣0⃣Без опыта работы, начало карьеры.";
    }
    var allComands = function (subscribed) {
      return "Пришлите мне одну из команд: \n5️⃣ , чтобы получить последние пять вакансий. \n1⃣0⃣, чтобы получить последние десять вакансий. \n 'Подписка', чтобы " +(subscribed ? "ОТКЛЮЧИТЬ" : "ВКЛЮЧИТЬ") + " ежедневную подписку. \n'Сменить', чтобы изменить категорию вакансий"
    }

    if(event == "user/unfollow") {
    	var userId = req.body.data.id;
    	db.destroy({where:{userId: userId}}).then(function(err) {
        console.log("db destroyed");
      });
    }
    if(event == "user/follow") {
      var userId = req.body.data.id;
      db.create({userId: userId, ip: ip}).then(function(user) {
        console.log("user follows");
        newChat(userId, ip, function(err, res, body) {
          var chatId = body.data.id;
          var message = "Здравствуйте!Я буду присылать свежие вакансии." + selectField();
          sms(message, chatId, ip);
        })
      });
    }
    if(event == "message/new") {
      var userId = req.body.data.sender_id;
      db.find({where: {userId: userId}})
      .then(function(user) {

      	var content = req.body.data.content;
      	var chatId = req.body.data.chat_id;
        var subscribed = user.subscribed;
        var branch = user.branch;
        console.log(subscribed + ' - ' + branch);
      	if(req.body.data.type != 'text/plain') {
      		console.log(errMessage);
      		sms(errMessage, chatId, ip);
      		return;
      	}
        if (user.state){
          let errMessage = "Некорректный ввод. " + selectField();
          let correctAnswer = [];
          for (var i = 1; i <= 30; i++) {
              correctAnswer.push(i.toString());
          }
          if (correctAnswer.indexOf(content)>= 0) {
            let message = "Вы выбрали категорию '" + dict(content).title + "'.";
            db.update({branch: dict(content).branch, state:false}, {where: {userId: userId}}).then(function(user) {
              sms(message, chatId, ip, function() {
                setTimeout(function() {
                  sms(allComands(subscribed), chatId, ip);
                }, 3000);
              })
            })
          } else {
        		sms(errMessage, chatId, ip);
          }
        } else {
          var errMessage = "Некорректный ввод. " + allComands(subscribed);

            if(content == "Сменить"){
              db.update({state: true}, {where: {userId: userId}}).then(function(user) {
                sms(selectField(), chatId, ip);
              })
            }
            else if(content == "5"){
              parser(branch,5).then((data)=>{
                Promise.all([
                  new_sms(data[0].title,chatId,ip),
                  new_sms(data[1].title,chatId,ip)
                ]).then((messages)=>{
                  console.log(messages);
                }).catch((error)=>{
                  console.log(error);
                })

              }).catch((error)=>{
                console.log(error);
              })
            }
            else if(content == "10"){
              console.log("10");
            }
            else if (content == "Подписка") {
              if(subscribed) {
                db.update({subscribed: false}, {where: {userId: userId}}).then(function(user) {
                  let message = "Вы отключили ежедневную рассылку. "+allComands(!subscribed);
                  sms(message, chatId, ip);
                })
              } else {
                db.update({subscribed: true}, {where: {userId: userId}}).then(function(user) {
                  let message = "Вы включили ежедневную рассылку. "+allComands(!subscribed);
                  sms(message, chatId, ip);
                })
              }
            } else {
        		  sms(errMessage, chatId, ip);
          }
        }
     })
    }
  res.end();
});



module.exports = router;
