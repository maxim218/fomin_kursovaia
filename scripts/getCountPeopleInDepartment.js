"use strict";

// функция для отправки запросов в СУБД
const query = require("./query");

// функция для получения количества людей в департаменте
module.exports = function(request, response) {
    // получаем имя департамента
    const department_name = request.query["department_name"] + "";
    // формируем запрос к СУБД
    let queryString = " SELECT COUNT(*) AS nnn FROM people ";
    queryString += " INNER JOIN department ON (department_id = people_department_id) ";
    queryString += " WHERE department_name = $1 ";
    queryString += " ; ";
    // отправляем запрос в СУБД
    query(queryString, [
        department_name,
    ], (resultArr) => {
        // формируем строку - ответ клиенту
        const result = resultArr[0];
        const nnn = result["nnn"];
        const answerString = "Count: " + nnn;
        // вывод сообщения об успешной выборке
        console.log("Get count of people in department OK");
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
        // отправляем ответ клиенту
        response.end(answerString);
    });
};

