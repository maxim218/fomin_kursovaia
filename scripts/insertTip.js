"use strict";

// функция для отправки запросов в СУБД
const query = require("./query");

// функция добавления типа документа
module.exports = function(request, response) {
    // получаем название типа
    const tip_name = request.query["tip_name"] + "";
    // отправляем запрос в СУБД
    query(" INSERT INTO tip (tip_name) VALUES($1); ", [
        tip_name,
    ], () => {
        // вывод сообщения об успешном добавлении нового типа
        console.log("Add tip OK");
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
        // отправляем ответ клиенту
        response.end(JSON.stringify({
            result: "ADD_TIP_OK",
        }));
    });
}
