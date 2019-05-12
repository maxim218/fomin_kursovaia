"use strict";

const init = require("./init");
const insertCountry = require("./insertCountry");
const insertCity = require("./insertCity");
const insertHouse = require("./insertHouse");

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
};