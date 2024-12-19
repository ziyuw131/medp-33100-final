var express = require('express');
var router = express.Router();
const {ObjectId, Timestamp} = require('mongodb');

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/', async function (req, res) {
    console.log(req.body);
    try {
        const db = req.app.locals.db;
        const newComment = {
            songID: new ObjectId(req.body.songID),
            content: req.body.content,
            authorID: new ObjectId(req.body.authorID),
            createdAt: new Timestamp({ t: Math.floor(Date.now() / 1000), i: 0 }),
        }
        await db.collection('comments')
            .insertOne(newComment)
        res.send('Successfully created comment');
    } catch(error) {
        console.log(error);
    }
})

module.exports = router;
