"use strict";

// библиотека для работы с файлами
const fs = require("fs");

// функция для отправки запросов в СУБД
const query = require("./query");

// функция создания таблиц
module.exports = function(request, response) {
    // считываем SQL код из файла
    fs.readFile("./scripts/code.sql", "utf8", function(error, data) {
        // получаем содержимое файла
        const codeSQL = data.toString();
        // отправляем код с таблицами в СУБД
        query(codeSQL, [], () => {
            // сообщение об успешном созданиии таблиц
            console.log("Init database OK");
            console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
            // отправляем ответ клиенту
            response.end(JSON.stringify({
                result: "INIT_DATABASE_OK",
            }));
        });
    });
};
