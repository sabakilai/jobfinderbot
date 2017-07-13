"use strict"
module.expots = function (x) {
  let title;
  let branch;
  switch(x) {
      case "1": title = "Топ-менеджмент, руководители"; branch = "48" ; break;
      case "2": title = "Автомобильный бизнес"; branch = "105" ; break;
      case "3": title = "Административный персонал"; branch = "13" ; break;
      case "4": title = "Банки, страхование, лизинг"; branch = "25" ; break;
      case "5": title = "Безопасность, охрана"; branch = "14" ; break;
      case "6": title = "Бухгалтерия, финансы и экономика предприятия"; branch = "1" ; break;
      case "7": title = "Некоммерческие организации, государственные и международные"; branch = "36" ; break;
      case "8": title = "Дизайн, искусство, развлечения"; branch = "21" ; break;
      case "9": title = "Домашний персонал, обслуживание"; branch = "42" ; break;
      case "10": title = "Закупки, поставки, ВЭД"; branch = "3" ; break;
      case "11": title = "Интернет, IT, телеком, связь"; branch = "6" ; break;
      case "12": title = "Логистика, транспорт, склад"; branch = "10" ; break;
      case "13": title = "Маркетинг, реклама, PR"; branch = "4" ; break;
      case "14": title = "Медицина, фармацевтика"; branch = "22" ; break;
      case "15": title = "Наука, образование, консалтинг"; branch = "23" ; break;
      case "16": title = "Отдел кадров, HR, обучение персонала"; branch = "5" ; break;
      case "17": title = "Подработка, сезонная работа"; branch = "44" ; break;
      case "18": title = "Продажи (работа в офисе)"; branch = "29" ; break;
      case "19": title = "Продажи (розничная торговля)"; branch = "45" ; break;
      case "20": title = "Промышленность, сельское хозяйство"; branch = "17" ; break;
      case "21": title = "Рабочий персонал, разнорабочие"; branch = "26" ; break;
      case "22": title = "Рестораторы, повара, официанты"; branch = "16" ; break;
      case "23": title = "СМИ, Издательство, полиграфия"; branch = "37" ; break;
      case "24": title = "Спорт, фитнес, салоны красоты"; branch = "40" ; break;
      case "25": title = "Строительство, недвижимость"; branch = "18" ; break;
      case "26": title = "Туризм, гостиницы"; branch = "38" ; break;
      case "27": title = "Услуги, ремонт, сервисное обслуживание"; branch = "120" ; break;
      case "28": title = "Юриспруденция "; branch = "7" ; break;
      case "29": title = "Работа для молодежи"; branch = "27" ; break;
      case "30": title = "Без опыта работы, начало карьеры"; branch = "2147" ; break;
  };
  return {title:title,branch:branch};
}
