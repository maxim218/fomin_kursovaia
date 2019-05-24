"use strict";

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

module.exports = function (app) {
    console.log("Route");

    app.get("/api/database/init", function (request, response) {
        init(request, response);
    });

    app.get("/api/database/country/insert", function (request, response) {
       insertCountry(request, response);
    });

    app.get("/api/database/city/insert", function (request, response) {
        insertCity(request, response);
    });

    app.get("/api/database/house/insert", function (request, response) {
        insertHouse(request, response);
    });

    app.get("/api/database/department/insert", function (request, response) {
        insertDepartment(request, response);
    });

    app.get("/api/database/people/insert", function(request, response) {
        insertPeople(request, response);
    });

    app.get("/api/database/tip/insert", function(request, response) {
        insertTip(request, response);
    });

    app.get("/api/database/paper/insert", function(request, response) {
        insertPaper(request, response);
    });

    app.get("/api/database/memberboy/insert", function(request, response) {
        insertMemberboy(request, response);
    });

    // выборка данных из базы

    app.get("/api/database/select/all", function(request, response) {
        selectAll(request, response);
    });

    app.get("/api/database/select/countriesCities", function(request, response) {
        countriesCities(request, response);
    });

    app.get("/api/database/select/housesOfCity", function(request, response) {
        housesOfCity(request, response);
    });

    app.get("/api/database/select/departmentsOfHousePag", function(request, response) {
        departmentsOfHousePag(request, response);
    });

    app.get("/api/database/select/getCountPeopleInDepartment", function(request, response) {
        getCountPeopleInDepartment(request, response);
    });

    app.get("/api/database/select/documentCreators", function(request, response) { 
        documentCreators(request, response);
    });
};
