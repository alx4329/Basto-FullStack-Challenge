const {Router} = require('express')
const cowRoutes = require('./cows')
const router = Router();

router.use('/cows', cowRoutes)

module.exports= router