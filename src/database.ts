import { connect } from 'mongoose'

const dev = 'mongodb://localhost/joven-claretiano'
const prod = 'mongodb://localhost/joven-claretiano'

export async function startConnection() {
    const db = await connect(dev,{
        useNewUrlParser: true,
        useFindAndModify: false 
    });
    console.log('Database is connected');
}
