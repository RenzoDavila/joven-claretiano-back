"use strict";
// const mongoose = require("mongoose");
Object.defineProperty(exports, "__esModule", { value: true });
// export async function startConnection() {
//     await mongoose.connect(process.env.DB_MONGO, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//     });
//     console.log('Database is connected');
// }
const mongoose_1 = require("mongoose");
const dev = "mongodb+srv://jovenclaretiano:Contrajovenclaretiano169@cluster0.gsdaw0b.mongodb.net/joven-claretiano";
const prod = 'mongodb://localhost/joven-claretiano';
async function startConnection() {
    const db = await mongoose_1.connect(dev);
    console.log('Database is connected');
}
exports.startConnection = startConnection;
