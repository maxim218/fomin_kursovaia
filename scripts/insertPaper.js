"use strict";

// функция для отправки запросов в СУБД
const query = require("./query");

// функция для добавления нового документа
module.exports = function(request, response) {
    // получаем создателя документа
    const paper_people_id = request.query["paper_people_id"] + "";
    // получаем тип документа
    const paper_tip_id = request.query["paper_tip_id"] + "";
    // получаем текстовое содержимое документа
    const paper_content = request.query["paper_content"] + "";
    // отправляем запрос в СУБД
    query(" INSERT INTO paper (paper_people_id, paper_tip_id, paper_content) VALUES ($1, $2, $3); ", [
        paper_people_id,
        paper_tip_id,
        paper_content,
    ], (ans) => {
        // если возникла ошибка
        if(ans === null) {
            // вывод сообщения об Ошибке добавления документа
            console.log("Error of adding Paper");
            console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
            // отправляем ответ клиенту
            response.end(JSON.stringify({
                result: "ERROR_OF_INSERT_PAPER",
            }));
        } else {
            // вывод сообщения об успешном добавлении документа
            console.log("Adding Paper OK");
            console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
            // отправляем ответ клиенту
            response.end(JSON.stringify({
                result: "INSERT_PAPER_OK",
            }));
        }
    });
};
