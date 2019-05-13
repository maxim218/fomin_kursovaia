"use strict";

// функция для отправки запросов в СУБД
const query = require("./query");

// функция для добавления человека
module.exports = function(request, response) {
    // получаем ФИО человека
    const people_fio = request.query["people_fio"] + "";
    // получаем идентификатор департамента
    const people_department_id = request.query["people_department_id"] + "";
    // отправляем запрос в СУБД
    query(" INSERT INTO people (people_fio, people_department_id) VALUES ($1, $2); ", [
        people_fio,
        people_department_id,
    ], (ans) => {
        // если произошла ошибка
        if(ans === null) {
            // сообщение об ошибке добавления человека
            console.log("Error of inserting people");
            console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
            // отправляем ответ клиенту
            response.end(JSON.stringify({
                result: "ERROR_OF_INSERTING_PEOPLE",
            }));
        } else {
            // сообщение об успешном добавлении человека
            console.log("Insert people OK");
            console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
            // отправляем ответ клиенту
            response.end(JSON.stringify({
                result: "INSERT_PEOPLE_OK",
            }));
        }
    });
}
