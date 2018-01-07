const express = require('express');
const fs = require('fs');
const router = express.Router();

/* GET unosspiska page. */
router.get('/', (req, res, next) => {
  res.render('unosspiska', { title: 'Unos spiska' });
});

router.post('/submit', (req, res, next) => {

  var data = req.body.data;
  var spirala = req.body.spirala;

  var result = [];

  var rows = data.split(/\r\n/);

  rows.forEach((row) => {
    
    var indexValues = row.split(',');
    
    for(var i = 0; i <= indexValues.length; i++) {
      for(var j = i; j <= indexValues.length; j++) {
          if(i != j && indexValues[i] == indexValues[j]) {
            
            //duplikat pronadjen
            res.sendStatus(500);
          }
      }
    }

    result.push(indexValues);

  });

  fs.writeFile(__dirname + 'spisakS' + spirala + '.json', JSON.stringify(result));
  res.sendStatus(200);

});

module.exports = router;