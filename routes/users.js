const express = require('express')
const router = express.Router()
const User = require('../models/users')
const OpenAI = require('openai')
const bcrypt = require('bcrypt');


const openai = new OpenAI({apiKey: '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'});



router.get('/:id/openai/sugar', async(req, res)=>{
    const user = await User.findById(req.params.id)
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: `The boold sugar level of mine is ${user.bloodSugar}.
        Lell me about is that high or normal. Provide information on conditions that I can get from
        this level of blood sugar. Give me a short description. Use around 150 words `}],
        model: "gpt-3.5-turbo",
      });
    
      res.send(completion.choices[0].message.content);
})

router.get('/:id/openai/pre', async(req, res)=>{
    const user = await User.findById(req.params.id)
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: `The boold pressure level of mine is ${user.pressureLevel}.
        Lell me about is that high or normal. Provide information on conditions that I can get from
        this level of blood sugar. Give me a short description. Use around 150 words `}],
        model: "gpt-3.5-turbo", 
      }); 
    
      res.send(completion.choices[0].message.content);
})

router.get('/:id/openai/cho', async(req, res)=>{
    const user = await User.findById(req.params.id)
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: `The cholesterol level of mine is ${user.cholesterolLevel}.
        Lell me about is that high or normal. Provide information on conditions that I can get from
        this level of blood sugar. Give me a short description. Use around 150 words `}],
        model: "gpt-3.5-turbo",
      });
    
      res.send(completion.choices[0].message.content);
})


router.get('/', async (req, res) =>{
    const users = await User.find().sort('name')
    res.send(users);
})

router.get('/:id',async (req, res)=>{
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).send("User is not found")
    res.send(user)

})

router.post('/', async (req,res)=>{

    if(!req.body.name || req.body.name.length < 3){
        res.status(400).send("Name is required and should be minimum 3 characters")
        return 
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let user = new User({
        name: req.body.name,
        age: req.body.age,
        password:hashedPassword,
        bloodSugar: req.body.bloodSugar,
        pressureLevel: req.body.pressureLevel,
        cholesterolLevel:req.body.cholesterolLevel
    })
    
    user = await user.save()
    res.send(user)
})

router.put('/:id', async (req, res) =>{
    
    const user = await User.findByIdAndUpdate(req.params.id, 
        {   name:req.body.name,
            age: req.body.age,
            bloodSugar: req.body.bloodSugar,
            pressureLevel:req.body.pressureLevel,
            cholesterolLevel: req.body.cholesterolLevel
        },{new:true} )
    if(!user) {
        res.status(404).send("Given id was not found")
        return
    }
     
    res.send(user)
})

router.delete('/:id', async (req, res) =>{
    const user = await User.findByIdAndRemove(req.params.id)
    
    if(!user) {
        res.status(404).send("Given id was not found")
        return
    }

    res.send(user)

})

module.exports = router