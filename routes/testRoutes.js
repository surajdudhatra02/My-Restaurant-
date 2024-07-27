const express = require('express')
const { testUserController } = require('../controllers/testController')

// router object 

const router = express.Router()

// router GET | POST | DELETE | UPDATE
router.get('/test - user', testUserController )

// exports
module.exports = router