var express = require('express');
var router = express.Router();

/* GET statistika page. */
router.get('/', (req, res, next) => {
  res.render('statistika', { title: 'Statistika' });
});

module.exports = router;