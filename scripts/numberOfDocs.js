"use strict";

// функция для отправки запросов в СУБД
const query = require("./query");

// функция для получения количества созданных документов у сотрудников
module.exports = function(request, response) {
    // вложенная часть запроса
    let queryFirst = `
        SELECT people_id AS ppp, COUNT(*) AS value FROM people  
        INNER JOIN paper ON (paper_people_id = people_id) 
        GROUP BY people_id
    `;
    // внешняя часть запроса
    let querySecond = `
        SELECT people_fio, value FROM bbb 
        INNER JOIN people ON (bbb.ppp = people_id) 
        ORDER BY people_id DESC
    `;
    // формируем запрос к СУБД
    let queryString = " WITH bbb AS ( " + queryFirst + " ) " + querySecond + " ; ";
    // отправляем запрос в СУБД
    query(queryString, [], (result) => {
        // вывод сообщения об успешной выборке данных
        console.log("Get number of documents OK");
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
        // отправляем ответ клиенту
        response.end(JSON.stringify(result, null, 4));
    });
}
