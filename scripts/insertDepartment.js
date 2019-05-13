"use strict";

// функция для отправки запросов в СУБД
const query = require("./query");

// функция для добавления департамента
module.exports = function(request, response) {
    // получаем имя департамента
    const department_name = request.query["department_name"] + "";
    // получаем идентификатор здания
    const department_house_id = request.query["department_house_id"] + "";
    // отправляем запрос к СУБД
    query(" INSERT INTO department (department_name, department_house_id) VALUES($1, $2); ", [
        department_name,
        department_house_id,
    ], (ans) => {
        // если произошла ошибка
        if(ans === null) {
            // выводим сообщение об ошибке
            console.log("Error of adding department");
            console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
            // отправляем ответ клиенту
            response.end(JSON.stringify({
                result: "ERROR_OF_ADDING_DEPARTMENT",
            }));
        } else {
            // выводим сообщение об успешном добавлении департамента
            console.log("Add department OK");
            console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
            // отправляем ответ клиенту
            response.end(JSON.stringify({
                result: "ADD_DEPARTMENT_OK",
            }));
        }
    });
}
