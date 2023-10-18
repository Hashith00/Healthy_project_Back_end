const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/users')
const jwt = require('jsonwebtoken')

const router = express.Router() 


router.post('/register', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    username: req.body.username,
    password: hashedPassword
  });
  await user.save();
  res.status(201).send({ message: 'User registered' });
});


router.post('/login', async (req, res) => {
  const user = await User.findOne({ name: req.body.name });
  if (!user) return res.status(400).send({ message: 'User not found' });

  const isValidPassword = await bcrypt.compare(req.body.password, user.password);
  if (!isValidPassword) return res.status(400).send({ message: 'Invalid password' });
 
  const token = jwt.sign({ userId: user.id }, 'SECRET_KEY', { expiresIn: '1h' });
  res.send({ token }); 
}); 

module.exports = router
 