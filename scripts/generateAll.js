"use strict";

// библиотека для форматирования HTML кода
const pretty = require('pretty');

// библиотека для работы с файлами
const fs = require('fs');

// подключение файла с функцией генерации страницы
const generatePage = require("./generatePage");

// массив страниц для добавления записей
const pagesArr = [];

// массив страниц для выборки записей
const pagesSelectArr = [];

// функция добавления страницы
function addPage(name, content, selectFlag) {	
    // путь к файлу
    const way = "./scripts/static/" + name;
    // сохранения файла
    fs.writeFileSync(way, content);
    // если это страница для добавления записей
    if(!selectFlag) {
        // кладем в массив страниц для добавления записей
        pagesArr.push({
            name: name,
            way: way,
        });
    } else {
        // кладем в массив страниц для выборки записей
        pagesSelectArr.push({
            name: name,
            way: way,
        });
    }
}

// функция для создания страницы со ссылками
function createLinksPage() {
    // массив для хранения HTML кода
    const buffer = [];

    // кладем в массив начало страницы и стили
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

    // ссылка на команду очистки базы данных
    buffer.push(`        
        <a style = "color: red;" href = "/api/database/init">Очистить содержимое базы данных</a>
        <br>
        <br>
    `);

    // перебираем страницы для добавления записей
    pagesArr.forEach((obj) => {
        // добавляем ссылки на страницу для добавления записи и на страницу для получения содержимого таблицы
        buffer.push(` 
            <div style = "width: 500px; padding: 7px; background: white;">          
               <a href = "${obj.name}">Добавление в таблицу ${obj.name.split(".")[0]}</a>
               <br>
               <a href = "/api/database/select/all?table=${obj.name.split(".")[0]}">Получение содержимого таблицы ${obj.name.split(".")[0]}</a>
            </div>         
            <br>
        `);
    });

    // перебираем страницы для выборки из базы данных
    pagesSelectArr.forEach((obj) => {
        // добавляем ссылку на получение страницы для отправки запроса
        buffer.push(` 
            <div style = "width: 500px; padding: 7px; background: yellow;">          
               <a href = "${obj.name}">Открыть страницу ${obj.name.split(".")[0]}</a>
            </div>         
            <br>
        `);
    });

    // закрываем HTML код
    buffer.push(`
        </body>
        </html>
    `);

    // объединяем содержимое массива в строку
    let allHtml = buffer.join("\n");

    // делаем HTML код человекочитаемым
    allHtml = pretty(allHtml, {
        ocd: true,
    });

    // сохраняем HTML код в файл
    fs.writeFileSync("./scripts/static/index.html", allHtml.toString());
}

// функция для генерации всех HTML страниц
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

    const numberOfDocs = generatePage({
        header: "NumberOfDocs",
        urlString: "/api/database/select/numberOfDocs",
        filedsArr: [],
    });

    addPage("numberOfDocs.html", numberOfDocs, true);

    const partsOfDocument = generatePage({
        header: "PartsOfDocument",
        urlString: "/api/database/select/partsOfDocument",
        filedsArr: [
            "paper_id",
        ]
    });

    addPage("partsOfDocument.html", partsOfDocument, true);

    // генерируем страницу со ссылками
    createLinksPage();
};
