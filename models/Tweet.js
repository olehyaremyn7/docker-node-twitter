const {Schema, model} = require('mongoose')

const tweetSchema = new Schema({
    text: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: String
    }
})

module.exports = model('Tweet', tweetSchema)
