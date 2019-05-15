"use strict";

const fs = require('fs');

const generatePage = require("./generatePage");

function addPage(name, content) {	
    const way = "./scripts/static/" + name;
    fs.writeFileSync(way, content);
}

module.exports = function () {
    const tip = generatePage({
        header: "Tip",
        urlString: "/api/database/tip/insert",
        filedsArr: [
            "tip_name",
        ]
    });

    addPage("tip.html", tip);

    const people = generatePage({
        header: "People",
        urlString: "/api/database/people/insert",
        filedsArr: [
            "people_fio",
            "people_department_id",
        ]
    });

    addPage("people.html", people);

    const department = generatePage({
        header: "Department",
        urlString: "/api/database/department/insert",
        filedsArr: [
            "department_name",
            "department_house_id",
        ]
    });

    addPage("department.html", department);

    const house = generatePage({
        header: "House",
        urlString: "/api/database/house/insert",
        filedsArr: [
            "house_name",
            "house_city_id",
        ]
    });

    addPage("house.html", house);

    const city = generatePage({
        header: "City",
        urlString: "/api/database/city/insert",
        filedsArr: [
            "city_name",
            "city_country_id",
        ]
    });

    addPage("city.html", city);

    const country = generatePage({
        header: "Country",
        urlString: "/api/database/country/insert",
        filedsArr: [
            "country_name",
        ]
    });

    addPage("country.html", country);
}
