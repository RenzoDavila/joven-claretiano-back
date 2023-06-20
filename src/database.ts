import { connect } from 'mongoose'

const dev = "mongodb+srv://jovenclaretiano:Contrajovenclaretiano169@cluster0.gsdaw0b.mongodb.net/joven-claretiano"
const prod = 'mongodb://localhost/joven-claretiano'

export async function startConnection() {
    const db = await connect(dev, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useFindAndModify: false,
            });
    console.log('Database is connected');
}
