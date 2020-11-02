const Twit = require('twit')
const config = require('./keys.config')

module.exports.Twitter = new Twit({
    consumer_key: config.twitterApiKey,
    consumer_secret: config.twitterApiSecretKey,
    access_token: config.twitterToken,
    access_token_secret: config.twitterTokenSecret
})
