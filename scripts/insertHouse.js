"use strict";

// функция для отправки запросов в СУБД
const query = require("./query");

// функция для добавления нового здания
module.exports = function(request, response) {
    // получаем имя здания
    const house_name = request.query["house_name"] + "";
    // получаем идентификатор города
    const house_city_id = request.query["house_city_id"] + "";
    // отправляем запрос в СУБД
    query(" INSERT INTO house (house_name, house_city_id) VALUES ($1, $2); ", [
        house_name,
        house_city_id,
    ], (ans) => {
        // если возникла ошибка
        if(ans === null) {
            // выводим в консоль сообщение об ошибке
            console.log("Error of inserting house");
            console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
            // отправляем ответ клиенту
            response.end(JSON.stringify({
                result: "ERROR_OF_ADDING_HOUSE",
            }));
        } else {
            // выводим сообщение об успешном добавлении здания
            console.log("Inserting house OK");
            console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
            // отправляем ответ клиенту
            response.end(JSON.stringify({
                result: "INSERT_HOUSE_OK",
            }));
        }
    });
};
