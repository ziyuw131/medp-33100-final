var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const db = req.app.locals.db;
    // const posts = await db.collection('songs')
    //   .find()
    //   .toArray();

    const posts = await db.collection('songs')
      .aggregate([
        {
          $lookup: {
            from: 'users',
            foreignField: '_id',
            localField: 'authorID',
            as: 'authors'
          }
        },
        {
          $lookup: {
            from: 'comments',
            foreignField: 'songID',
            localField: '_id',
            as: 'comments'
          }
        },
        { $sort: { createdAt: -1}}
      ])
      .toArray();


    console.log(posts);

    res.render('index', { title: 'Memoirs of a Melody', posts: posts });
  } catch (error) {
    console.log(error);
  }

});

module.exports = router;
