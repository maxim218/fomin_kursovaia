"use strict";

// функция для отправки запросов в СУБД
const query = require("./query");

// функция для получения участников документа
module.exports = function(request, response) {
    // получаем номер документа
    const paper_id = request.query["paper_id"] + "";
    // формируем запрос в СУБД
    let queryString = " SELECT memberboy_finish, people_id, people_fio FROM memberboy ";
    queryString += " INNER JOIN people ON (memberboy_people_id = people_id) ";
    queryString += " INNER JOIN paper ON (memberboy_paper_id = paper_id) ";
    queryString += " WHERE paper_id = $1 ";
    queryString += " ORDER BY people_id DESC ";
    queryString += " ; ";
    // отправляем запрос в СУБД
    query(queryString, [
        paper_id, 
    ], (answer) => {
        // вывод сообщения об успешной выборке
        console.log("Get participants of Document OK");
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
        // отправка ответа клиенту
        response.end(JSON.stringify(answer, null, 4));
    });
}
