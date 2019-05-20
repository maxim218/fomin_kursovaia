"use strict";

// функция для отправки запросов в СУБД
const query = require("./query");

// функция для получения содержимого таблицы
module.exports = function(request, response) {
    // получаем имя таблицы
    const table = request.query["table"] + "";
    // формируем запрос к СУБД
    const queryText = ` SELECT * FROM ${table} ORDER BY ${table}_id DESC; `;
    // отправляем запрос на сервер
    query(queryText, [], (resultArr) => {
        // если произошла ошибка
        if(resultArr === null) {
            // вывод сообщения об ошибке
            console.log("Error of Selecting Records");
            console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
            // отправка ответа клиенту
            response.end(JSON.stringify({
                result: "ERROR_OF_SELECT",
            }));
        } else {
            // вывод сообщения об успешной выборке
            console.log("Selecting Records OK");
            console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
            // отправляем ответ клиенту
            response.end(JSON.stringify(resultArr, null, 4));
        }
    });
};
