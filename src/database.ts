import { connect } from 'mongoose'

const prod = 'mongodb://localhost/joven-claretiano'
const dev = "mongodb://mongo:87nHrynNbTRA6r7s3mWW@containers-us-west-137.railway.app:5511"

export async function startConnection() {
    // const db = await connect(dev,{
    //     useNewUrlParser: true,
    //     useFindAndModify: false 
    // });
    const db = await connect(dev);
    console.log('Database is connected');
}
