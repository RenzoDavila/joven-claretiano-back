"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dev = 'mongodb://localhost/joven-claretiano';
const prod = 'mongodb://localhost/joven-claretiano';
async function startConnection() {
    const db = await mongoose_1.connect(dev, {
        useNewUrlParser: true,
        useFindAndModify: false
    });
    console.log('Database is connected');
}
exports.startConnection = startConnection;
