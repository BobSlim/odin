const express = require('express')
const coolRouter = express.Router()

coolRouter.get('/', (req, res, next) => {
    res.send("You are so cool!")
})

module.exports = coolRouter