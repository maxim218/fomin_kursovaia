"use strict";

// функция для отправки запросов в СУБД
const query = require("./query");

// функция для получения департаментов в здании
module.exports = function(request, response) {
    // получаем имя здания
    const house_name = request.query["house_name"] + "";
    // получаем количество выбираемых записей
    const limit = request.query["limit"] + "";
    // пропустить указанное число строк
    const offset = request.query["offset"] + "";
    // формируем запрос к СУБД
    let queryString = " SELECT department_id, department_name FROM department ";
    queryString += " INNER JOIN house ON (house_id = department_house_id) ";
    queryString += " WHERE house_name = $1 ";
    queryString += " ORDER BY department_id DESC ";
    queryString += " LIMIT $2 OFFSET $3 ";
    queryString += " ; ";
    // отправляем запрос в СУБД
    query(queryString, [
        house_name,
        limit,
        offset,
    ], (answer) => {
        // вывод сообщения об успешной выборке
        console.log("Get departments of house with pag OK");
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
        // отправка ответа клиенту
        response.end(JSON.stringify(answer, null, 4));
    });
};
