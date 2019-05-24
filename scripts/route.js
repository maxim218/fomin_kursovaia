"use strict";

// подключение функций из других файлов
const init = require("./init");
const insertCountry = require("./insertCountry");
const insertCity = require("./insertCity");
const insertHouse = require("./insertHouse");
const insertDepartment = require("./insertDepartment");
const insertPeople = require("./insertPeople");
const insertTip = require("./insertTip");
const insertPaper = require("./insertPaper");
const insertMemberboy = require("./insertMemberboy");
const selectAll = require("./selectAll");
const countriesCities = require("./countriesCities");
const housesOfCity = require("./housesOfCity");
const departmentsOfHousePag = require("./departmentsOfHousePag");
const getCountPeopleInDepartment = require("./getCountPeopleInDepartment");
const documentCreators = require("./documentCreators");
const numberOfDocs = require("./numberOfDocs");
const partsOfDocument = require("./partsOfDocument");

// функция для запуска роутинга
module.exports = function (app) {
    // вывод сообщения на экран
    console.log("Route");

    // очистка содержимого базы данных и создание таблиц
    app.get("/api/database/init", function (request, response) {
        init(request, response);
    });

    // добавление страны
    app.get("/api/database/country/insert", function (request, response) {
       insertCountry(request, response);
    });

    // добавление города
    app.get("/api/database/city/insert", function (request, response) {
        insertCity(request, response);
    });

    // добавление здания
    app.get("/api/database/house/insert", function (request, response) {
        insertHouse(request, response);
    });

    // добавление департамента
    app.get("/api/database/department/insert", function (request, response) {
        insertDepartment(request, response);
    });

    // добавление сотрудника
    app.get("/api/database/people/insert", function(request, response) {
        insertPeople(request, response);
    });

    // добавление типа документа
    app.get("/api/database/tip/insert", function(request, response) {
        insertTip(request, response);
    });

    // добавление документа
    app.get("/api/database/paper/insert", function(request, response) {
        insertPaper(request, response);
    });

    // добавление участника в документе
    app.get("/api/database/memberboy/insert", function(request, response) {
        insertMemberboy(request, response);
    });

    // выборка данных из базы

    // получить содержимое определенной таблицы
    app.get("/api/database/select/all", function(request, response) {
        selectAll(request, response);
    });

    // получить объединение городов и стран
    app.get("/api/database/select/countriesCities", function(request, response) {
        countriesCities(request, response);
    });

    // получить все дома в определенном городе
    app.get("/api/database/select/housesOfCity", function(request, response) {
        housesOfCity(request, response);
    });

    // получить департаменты в здании с использованием пагинации
    app.get("/api/database/select/departmentsOfHousePag", function(request, response) {
        departmentsOfHousePag(request, response);
    });

    // получить количество людей в департаменте
    app.get("/api/database/select/getCountPeopleInDepartment", function(request, response) {
        getCountPeopleInDepartment(request, response);
    });

    // получить авторов документов
    app.get("/api/database/select/documentCreators", function(request, response) { 
        documentCreators(request, response);
    });

    // получить количество документов у каждого автора
    app.get("/api/database/select/numberOfDocs", function(request, response) { 
        numberOfDocs(request, response);
    });

    // получить участников документа
    app.get("/api/database/select/partsOfDocument", function(request, response) {
        partsOfDocument(request, response);
    });
};
