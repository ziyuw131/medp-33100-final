var express = require('express');
var router = express.Router();
const {ObjectId, Timestamp} = require('mongodb');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', async function (req, res) {
    console.log(req.body);
    try {
        const db = req.app.locals.db;
        const newPost = {
            song: req.body.song,
            image_url: req.body.image_url,
            memory: req.body.memory,
            authorID: new ObjectId(req.body.authorID),
            createdAt: new Timestamp({ t: Math.floor(Date.now() / 1000), i: 0 }),
        }
        await db.collection('songs')
            .insertOne(newPost)
        res.send('Successfully created post');
    } catch(error) {
        console.log(error);
    }
})

module.exports = router;
