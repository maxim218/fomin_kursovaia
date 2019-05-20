"use strict";

// функция для отправки запросов в СУБД
const query = require("./query");

// функция для добавления участника подписания документа
module.exports = function(request, response) {
    // документ для подписания
    const memberboy_paper_id = request.query["memberboy_paper_id"] + "";
    // сотрудник - участник подписания документа
    const memberboy_people_id = request.query["memberboy_people_id"] + "";
    // отправляем запрос в СУБД
    query(" INSERT INTO memberboy (memberboy_paper_id, memberboy_people_id) VALUES ($1, $2); ", [
        memberboy_paper_id,
        memberboy_people_id,
    ], (ans) => {
        // если произошла ошибка
        if(ans === null) {
            // выводим сообщение об ошибке
            console.log("Error of inserting MemberBoy");
            console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
            // отправляем ответ клиенту
            response.end(JSON.stringify({
                result: "ERROR_OF_INSERTING_MEMBERBOY",
            }));
        } else {
            // вывод сообщения об успешном добавлении
            console.log("Inserting MemberBoy OK");
            console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
            // отправляем ответ клиенту
            response.end(JSON.stringify({
                result: "INSERT_MEMBERBOY_OK",
            }));
        }
    });
};
