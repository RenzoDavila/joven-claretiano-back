// const mongoose = require("mongoose");

// export async function startConnection() {
//     await mongoose.connect(process.env.DB_MONGO, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//     });
//     console.log('Database is connected');
// }

import { connect } from 'mongoose'

const dev = "mongodb+srv://jovenclaretiano:Contrajovenclaretiano169@cluster0.gsdaw0b.mongodb.net/joven-claretiano"
const prod = 'mongodb://localhost/joven-claretiano'

export async function startConnection() {
    const db = await connect(dev);
    console.log('Database is connected');
}
