"use strict";

// функция для генерации кода HTML страницы
module.exports = function (paramsObject) {
    // название страницы
    const header = paramsObject.header;
    // URL для отправки формы
    const urlString = paramsObject.urlString;
    // массив полей формы
    const filedsArr = paramsObject.filedsArr;

    // масисв для хранения разметки
    const buffer = [];

    // описание HTML страницы
    buffer.push(`
        <!doctype html>
        <html>
        <head>
            <meta charset = "UTF-8" />
            <title>${header}</title>
            <style>
                body {
                    font-family: Geneva, Arial, Helvetica, sans-serif;
                    background: #00FFFF;
                    padding: 30px;
                    font-size: 20px;
                }

                button {
                    padding: 15px;
                    font-size: 20px;
                    cursor: pointer;
                    background: #008080;
                    border: 1px solid black;
                    border-radius: 6px;
                    color: white;
                    outline: none;
                }

                .inp {
                    font-size: 20px;
                    padding: 10px;
                    outline: none;
                    border-radius: 4px;
                    border: 1px solid black;
                    margin-left: 15px;
                    width: 300px;
                }
            </style>
        </head>
        <body>    
    `);

    // заголовок в начале веб-страницы
    buffer.push(`
        <h1>${header}</h1>
        <br>
    `);

    // описание атрибутов формы
    buffer.push(` <form method = "GET" action = "${urlString}"> `);

    // перебор всех полей
    filedsArr.forEach((field) => {
        // добавление поля в форму
        buffer.push(` <b>${field}</b><br> `);
        buffer.push(` <input class = "inp" type = "text" spellcheck = 'false' autocomplete = 'off' name = "${field}"> `);
        buffer.push( `<br><br>`);
    });

    // кнопка отправки формы на сервер
    buffer.push(` <br> `);
    buffer.push(` <button type = "submit"> Отправить запрос </button> `);

    // закрытие формы
    buffer.push(` </form> `);

    // нижний отступ страницы
    buffer.push( `<br><br>`);

    // закрытие веб-страницы
    buffer.push(`
        </body>
        </html>
    `);

    // объединяем массив в строку
    const content = buffer.join("\n");

    // возвращаем сформированную разметку
    return content.toString();
};
