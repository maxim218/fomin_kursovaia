"use strict";

// библиотека для форматирования HTML кода
const pretty = require('pretty');

const fs = require('fs');

const generatePage = require("./generatePage");

const pagesArr = [];

function addPage(name, content) {	
    const way = "./scripts/static/" + name;
    fs.writeFileSync(way, content);
    pagesArr.push({
        name: name,
        way: way,
    });
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

    createLinksPage();
};
