const mongoose = require('mongoose')

const connectDb= async()=> {
    const URI = process.env.MONGO_URI
    try{
     const res = await mongoose.connect(URI);
     if(res) console.log('Connected To MongoDB 👍')
    }catch(err){
     console.log(err)
    }
   }

module.exports = connectDb