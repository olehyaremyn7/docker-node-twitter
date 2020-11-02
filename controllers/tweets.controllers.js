const Tweet = require('../models/Tweet')
const error = require('../utils/error-handler.utils')
const {Twitter} = require('../config/twitter.config')

module.exports.searchTweets = async (req, res) => {
    try {
        const params = {
            q: req.body.searchQuery,
            count: 10
        }

        Twitter.get('search/tweets', params, async (err, data, response) => {
            if (err) {
                res.status(500).json(err)
            }

            if (data.statuses.length) {
                const tweets = await data.statuses
                const firstThreeElements = tweets.splice(0, 3)

                await firstThreeElements.map(tweet => {
                    const newTweet = new Tweet({
                        author: tweet.user['name'],
                        text: tweet.text,
                        date: tweet.created_at
                    })

                    newTweet.save()
                })

                res.status(200).json({message: 'Your request was successfully processed and saved to the database'})
            } else {
                res.status(409).json({message: 'No results'})
            }
        })
    } catch (e) {
        error(res, e)
    }
}

// localhost:5000/api/tweets/all?offset=3&limit=10
module.exports.getTweets = async (req, res) => {
    try {
        const LIMIT = req.query.limit ? req.query.limit : 10
        const tweets = await Tweet.find().limit(+LIMIT)

        res.status(200).json(tweets)
    } catch (e) {
        error(res, e)
    }
}
