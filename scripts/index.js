"use strict";

// импорт функции для роутинга
const route = require("./route");

// импорт функции для создания HTML страниц
const generateAll = require("./generateAll");

// запускаем сервер
const express = require("express");
const app = express();
const port = 5000;
app.listen(port);
console.log("Server on port: " + port);

// создаем страницы HTML
generateAll();

// расдача статических файлов
app.use(express.static(__dirname + "/static"));

console.log("Dirname: " + __dirname);

let queriesNumber = 0;

// добавление заголовков
app.use(function(req, res, next) {
    console.log("  ");
    console.log("  ");
    console.log("-----------------------------------------");
    queriesNumber += 1;
    console.log("Query: " + queriesNumber);
    console.log("Add headers to url: " + req.url);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    next();
});

// получение GET и POST запросов
route(app);

console.log("Add OnError Event");

// при возникновении ошибки
app.use(function (err, request, response, next) {
    console.log("Error of query");
    console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
    // отправка сообщения об ошибке
    response.end(JSON.stringify({
        result: "ERROR",
    }));
});

console.log("Add NotFound Event");

// если маршрут не найден
app.use(function (request, response) {
    console.log("Way not found");
    console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
    // отправка сообщения об отсутствии маршрута
    response.end(JSON.stringify({
        result: "WAY_NOT_FOUND",
    }));
});
