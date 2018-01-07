var express = require('express');
var router = express.Router();

/* GET unoskomentara page. */
router.get('/', (req, res, next) => {
  res.render('unoskomentara', { title: 'Unos komentara' });
});

module.exports = router;