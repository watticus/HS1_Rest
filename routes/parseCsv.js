var express = require('express');
const { convertCsv } = require('../lib/convertCsv');
const { convertBodyToStringBlock } = require('../lib/parseBody');
var router = express.Router();

/* GET home page. */
router.get('/csvParameter', function(req, res, next) {
    if (typeof(req.query.csv) != String) {
      res.status(400).send("Invalid data type, please provide string in query parameters.")
    }
    const csv = req.query.csv
    res.status(200).send(convertCsv(csv));
});

const parseRawBody = (req, res, next) => {
    req.setEncoding('utf8');
    req.rawBody = '';
    req.on('data', (chunk) => {
      req.rawBody += chunk;
    });
    req.on('end', () => {
      next();
    });
  }

router.use(parseRawBody);

router.post('/parseCsvBody', (req, res) => {
    (async () => {
      let returnBlock = await convertBodyToStringBlock(req.rawBody);
      res.send(returnBlock);
    })();    
});

router.get('/healthcheck', function(req, res, next) {
    res.status(200).send("Healthy");
});

module.exports = router;