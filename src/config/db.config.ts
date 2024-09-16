import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

//this should be into envars
const username = 'nahueldolian'
const password = '0rFZ5K3CNfPtTYYp'
const dbName = 'eldorado'

//connection string to mongo atlas
const connectionString = `mongodb+srv://${username}:${password}@eldorado.vjzzu.mongodb.net/?retryWrites=true&w=majority&appName=eldorado`

const options = {
    autoIndex: false, 
    maxPoolSize: 10, 
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000, 
    family: 4 
  };

export const db = mongoose.connect(connectionString, options)
.then(res => {
    if(res){
        console.log(`Database connection succeffully to ${dbName}`)
    }
    
}).catch(err => {
    console.log(err)
})