"use strict";

// функция для отправки запросов в СУБД
const query = require("./query");

// функция для получения авторов документов
module.exports = function(request, response) {
    // формируем запрос в СУБД
    let queryString = " SELECT people_fio, paper_id, paper_content, tip_name "
    queryString += " FROM people INNER JOIN paper ON (paper_people_id = people_id) ";
    queryString += " INNER JOIN tip ON (tip_id = paper_tip_id) ";
    queryString += " ORDER BY paper_id DESC ";
    queryString += " ; ";
    // отправляем запрос в СУБД
    query(queryString, [], (result) => {
        // вывод на экран сообщения об успешной выборке
        console.log("Get Creators of Documents OK");
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
        // отправляем ответ клиенту
        response.end(JSON.stringify(result, null, 4));
    });
}
