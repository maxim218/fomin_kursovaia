"use strict";

// функция для отправки запросов в СУБД
const query = require("./query");

// функция для добавления нового города
module.exports = function(request, response) {
    // получаем название города
    const city_name = request.query["city_name"] + "";
    // получаем идентификатор страны
    const city_country_id = request.query["city_country_id"] + "";
    // отправляем запрос в СУБД
    query(" INSERT INTO city (city_name, city_country_id) VALUES ($1, $2); ", [
        city_name,
        city_country_id,
    ], (ans) => {
        // если возникла ошибка
       if(ans === null) {
           // вывод сообщения об ошибке
           console.log("Error of adding city");
           console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
           // отправка ответа клиенту
           response.end(JSON.stringify({
               result: "ERROR_OF_ADDING_CITY",
           }));
       } else {
           // вывод сообщения об успешном добавлении записи
           console.log("Insert city OK");
           console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
           // отправка ответа клиенту
           response.end(JSON.stringify({
               result: "ADDING_CITY_OK",
           }));
       }
    });
};
