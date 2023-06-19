"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dev = "mongodb://mongo:87nHrynNbTRA6r7s3mWW@containers-us-west-137.railway.app:5511";
const prod = 'mongodb://localhost/joven-claretiano';
async function startConnection() {
    // const db = await connect(dev,{
    //     useNewUrlParser: true,
    //     useFindAndModify: false 
    // });
    const db = await mongoose_1.connect(dev);
    console.log('Database is connected');
}
exports.startConnection = startConnection;
