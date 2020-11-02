const {Router} = require('express')
const tweetsControllers = require('../controllers/tweets.controllers')
const router = Router()

// localhost:5000/api/tweets/search
router.post('/search', tweetsControllers.searchTweets)

// localhost:5000/api/tweets/all
router.get('/all', tweetsControllers.getTweets)

module.exports = router
