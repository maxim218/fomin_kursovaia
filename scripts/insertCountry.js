"use strict";

// функция для отправки запросов в СУБД
const query = require("./query");

// функция для добавления новой страны
module.exports = function(request, response) {
    // получаем имя страны
    const country_name = request.query["country_name"] + "";
    // отправляем запрос на добавление страны в СУБД
    query(" INSERT INTO country (country_name) VALUES($1); ", [
        country_name
    ], () => {
        // сообщение об успешном добавлении страны
        console.log("Insert country OK");
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
        // отправляем ответ клиенту
        response.end(JSON.stringify({
            result: "INSERT_COUNTRY_OK",
        }));
    })
};