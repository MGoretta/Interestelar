"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var csv_parser_1 = require("csv-parser");
var results = [];
fs_1.default.createReadStream('data/space_missions_2 Fer.csv')
    .pipe((0, csv_parser_1.default)())
    .on('data', function (data) { return results.push(data); })
    .on('end', function () {
    console.log(results);
    // Aquí puedes agregar el código para insertar los datos en la base de datos.
});
