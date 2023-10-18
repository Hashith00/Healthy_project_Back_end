const express = require('express')
const router = express.Router()
const User = require('../models/users')
const OpenAI = require('openai')

const openai = new OpenAI({apiKey: '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'});


router.get('/overoll/:id', async(req, res)=>{
    const user = await User.findById(req.params.id)
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: `I am ${user.name}. My cholesterol level of mine is ${user.cholesterolLevel}.
        Lell me about is that high or normal. Blood sugar level of mine is ${user.bloodSugar} and the blood pressure level si
        ${user.pressureLevel}. Consdidering all the these given data give me some health tips. Use around 150 words `}],
        model: "gpt-3.5-turbo",
      });
    
      res.send(completion.choices[0].message.content);
})

 
module.exports = router