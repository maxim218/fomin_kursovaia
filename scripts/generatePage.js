"use strict";

module.exports = function (paramsObject) {
    const header = paramsObject.header;
    const urlString = paramsObject.urlString;
    const filedsArr = paramsObject.filedsArr;
    
    const buffer = [];

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

    buffer.push(`
        <h1>${header}</h1>
        <br>
    `)

    buffer.push(` <form method = "GET" action = "${urlString}"> `);

    filedsArr.forEach((field) => {
        buffer.push(` <b>${field}</b><br> `)
        buffer.push(` <input class = "inp" type = "text" spellcheck = 'false' autocomplete = 'off' name = "${field}"> `);
        buffer.push( `<br><br>`);
    });

    buffer.push(` <br> `);
    buffer.push(` <button type = "submit"> Отправить запрос </button> `);
    buffer.push(` </form> `);

    buffer.push( `<br><br>`);

    buffer.push(`
        </body>
        </html>
    `);

    const content = buffer.join("\n");
    return content.toString();
}
