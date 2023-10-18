const express = require('express')
const users = require('./routes/users')
const auth = require('./routes/auth')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors')
const openai = require('./routes/openai')


const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
} 
app.use(cors(corsOptions));

async function createConnection(){
    try{
        await mongoose.connect('mongodb://0.0.0.0:27017/test')
        console.log("connected")
    }catch(error){
        console.error(error)
    }
};
createConnection();


app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(express.json());
app.use('/api/users', users);
app.use('/api', auth);
app.use('/api/openai', openai)


app.listen(4000 , ()=>{
    console.log("listing on port 4000")
})


