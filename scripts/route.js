"use strict";

const init = require("./init");
const insertCountry = require("./insertCountry");
const insertCity = require("./insertCity");
const insertHouse = require("./insertHouse");
const insertDepartment = require("./insertDepartment");
const insertPeople = require("./insertPeople");
const insertTip = require("./insertTip");
const selectAll = require("./selectAll");

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

    app.get("/api/database/select/all", function(request, response) {
        selectAll(request, response);
    });
};
