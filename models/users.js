const Joi = require('joi')
const mongoose = require('mongoose')

const usersSchema =  mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5
    },
    password:{
        type:String,
        required: true
    },
    age: Number,
    bloodSugar: Number,
    pressureLevel: Number,
    cholesterolLevel:Number
})

const User = mongoose.model('User', usersSchema)

module.exports = User