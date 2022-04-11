const express = require('express');
const { convertCsv } = require('../lib/convertCsv');
const { convertBodyToStringBlock } = require('../lib/parseBody');
const router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.text())

router.get('/healthcheck', function(req, res, next) {
  res.status(200).send('Healthy');
});

router.get('/csvParameter', function(req, res, next) {
    if (typeof(req.query.csv) != 'string' ) {
      res.status(400).send('Invalid data type, please provide string in query paramters');
    } else {
    const csv = req.query.csv
    res.status(200).send(convertCsv(csv));
    }
});

router.post('/parseCsvBody', (req, res) => {
  if (typeof(req.body) != 'string') {
    res.status(400).send('Invalid data type. Body must contain text input')
  } else {
  (async () => {
    let returnBlock = await convertBodyToStringBlock(req.body);
    res.send(returnBlock);
  })();
}
})

module.exports = router;