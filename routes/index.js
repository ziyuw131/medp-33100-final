var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  // res.render('index', { title: 'Memoirs of a Melody' });
  try {
    const db = req.app.locals.db;
    const posts = await db.collection('songs')
      .find()
      .toArray();
    console.log(posts);

    res.render('index', { title: 'Memoirs', posts: posts });
  } catch (error) {
    console.log(error);
  }

});

module.exports = router;
