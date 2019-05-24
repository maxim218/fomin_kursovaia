"use strict";

// библиотека для форматирования HTML кода
const pretty = require('pretty');

const fs = require('fs');

const generatePage = require("./generatePage");

const pagesArr = [];
const pagesSelectArr = [];

function addPage(name, content, selectFlag) {	
    const way = "./scripts/static/" + name;
    fs.writeFileSync(way, content);
    if(!selectFlag) {
        pagesArr.push({
            name: name,
            way: way,
        });
    } else {
        pagesSelectArr.push({
            name: name,
            way: way,
        });
    }
}

function createLinksPage() {
    const buffer = [];

    buffer.push(`
        <!doctype html>
        <html>
            <head>
                <meta charset = "UTF-8" />
                <title>Ссылки</title>
                <style>
                    body {
                        font-family: Geneva, Arial, Helvetica, sans-serif;
                        background: #00FFFF;
                        padding: 30px;
                        font-size: 20px;
                    }
                    
                    a {
                        color: blue;
                    }
                </style>
            </head>      
            <body>
                <h1>Ссылки</h1>
    `);

    buffer.push(`        
        <a style = "color: red;" href = "/api/database/init">Очистить содержимое базы данных</a>
        <br>
        <br>
    `);

    pagesArr.forEach((obj) => {
        buffer.push(` 
            <div style = "width: 500px; padding: 7px; background: white;">          
               <a href = "${obj.name}">Добавление в таблицу ${obj.name.split(".")[0]}</a>
               <br>
               <a href = "/api/database/select/all?table=${obj.name.split(".")[0]}">Получение содержимого таблицы ${obj.name.split(".")[0]}</a>
            </div>         
            <br>
        `);
    });

    pagesSelectArr.forEach((obj) => {
        buffer.push(` 
            <div style = "width: 500px; padding: 7px; background: yellow;">          
               <a href = "${obj.name}">Открыть страницу ${obj.name.split(".")[0]}</a>
            </div>         
            <br>
        `);
    });

    buffer.push(`
        </body>
        </html>
    `);

    let allHtml = buffer.join("\n");

    allHtml = pretty(allHtml, {
        ocd: true,
    });

    fs.writeFileSync("./scripts/static/index.html", allHtml.toString());
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

    const paper = generatePage({
        header: "Paper",
        urlString: "/api/database/paper/insert",
        filedsArr: [
            "paper_people_id",
            "paper_tip_id",
            "paper_content",
        ]
    });

    addPage("paper.html", paper);

    const memberboy = generatePage(({
        header: "Memberboy",
        urlString: "/api/database/memberboy/insert",
        filedsArr: [
            "memberboy_paper_id",
            "memberboy_people_id",
        ]
    }));

    addPage("memberboy.html", memberboy);

    const countriesCities = generatePage({
        header: "CountriesCities",
        urlString: "/api/database/select/countriesCities",
        filedsArr: [],
    });

    addPage("countriesCities.html", countriesCities, true);

    const housesOfCity = generatePage({
        header: "HousesOfCity",
        urlString: "/api/database/select/housesOfCity",
        filedsArr: [
            "city_name",
        ]
    });

    addPage("housesOfCity.html", housesOfCity, true);

    const departmentsOfHousePag = generatePage({
        header: "DepartmentsOfHousePag",
        urlString: "/api/database/select/departmentsOfHousePag",
        filedsArr: [
            "house_name",
            "limit",
            "offset",
        ],
    });

    addPage("departmentsOfHousePag.html", departmentsOfHousePag, true);

    const getCountPeopleInDepartment = generatePage({
        header: "GetCountPeopleInDepartment",
        urlString: "/api/database/select/getCountPeopleInDepartment",
        filedsArr: [
            "department_name"
        ]
    });

    addPage("getCountPeopleInDepartment.html", getCountPeopleInDepartment, true);

    const documentCreators = generatePage({
        header: "DocumentCreators",
        urlString: "/api/database/select/documentCreators",
        filedsArr: [],
    });

    addPage("documentCreators.html", documentCreators, true);

    createLinksPage();
};
