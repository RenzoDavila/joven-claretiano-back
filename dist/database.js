"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
async function startConnection() {
    await mongoose.connect(process.env.DB_MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    console.log('Database is connected');
}
exports.startConnection = startConnection;
