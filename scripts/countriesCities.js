"use strict";

// функция для отправки запросов в СУБД
const query = require("./query");

// получение объединенной таблицы: страны и города
module.exports = function(request, response) {
    // формируем запрос
    let queryString = " SELECT country_name, city_name FROM country ";
    queryString += " INNER JOIN city ON (country_id = city_country_id) ";
    queryString += " ORDER BY city_id DESC ";
    queryString += " ; ";
    // отправляем запрос в СУБД
    query(queryString, [], (answer) => {
        // вывод сообщения об успешной выборке данных
        console.log("Get from countries and cities OK");
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
        // отправляем ответ клиенту
        response.end(JSON.stringify(answer, null, 4));
    });
};
