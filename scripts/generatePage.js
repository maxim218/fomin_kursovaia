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
        buffer.push(` <input type = "text" spellcheck = 'false' autocomplete = 'off' name = "${field}"> `);
        buffer.push( `<br><br>`);
    });

    buffer.push(` <br> `);
    buffer.push(` <input type = "submit" value = "Отправить запрос"> `);
    buffer.push(` </form> `);

    buffer.push( `<br><br>`);

    buffer.push(`
        </body>
        </html>
    `);

    const content = buffer.join("\n");
    return content.toString();
}
