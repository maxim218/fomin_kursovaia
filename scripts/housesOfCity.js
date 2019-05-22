"use strict";

// функция для отправки запросов в СУБД
const query = require("./query");

// функция для получения всех домов в городе
module.exports = function(request, response) {
    // получаем имя города
    const city_name = request.query["city_name"] + "";
    // формируем строку запроса
    let queryString = " SELECT house_id, house_name FROM house ";
    queryString += " INNER JOIN city ON (city_id = house_city_id) ";
    queryString += " WHERE city_name = $1 ";
    queryString += " ORDER BY house_id DESC ";
    queryString += " ; ";
    // отправляем запрос в СУБД
    query(queryString, [
        city_name,
    ], (result) => {
        // вывод сообщения об успешной выборке
        console.log("Get houses of city OK ");
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
        // отправка ответа клиенту
        response.end(JSON.stringify(result, null, 4));
    });
};
