"use strict";

// импорт библиотеки для взаимодействия с СУБД
const pg = require('pg');

// функция создания нового клиента к СУБД
function createNewClient() {
    return new pg.Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: '12345',
        port: 5432
    });
}

// функция отправки запроса в СУБД
module.exports = function(query, arr, callback) {
    // создаем нового клиента
    const client = createNewClient();

    // открываем соединение с СУБД
    console.log("Open connection");
    client.connect();

    // отправляем запрос в СУБД
    client.query(query, arr, (err, res) => {
        // при получении ответа от СУБД

        // закрываем соединение с СУБД
        console.log("Close connection");
        client.end();

        // если НЕ было ошибки при обработке запроса
        if(!err) {
            // вызываем функцию обратного вызова от ответа
            callback(res.rows);
        } else {
            // сообщение об ошибке
            console.log("Error of Database");
            // вызываем функцию обратного вызова от NULL
            callback(null);
        }
    });
};

