var express = require('express');
const { convertCsv } = require('../lib/convertCsv');
var router = express.Router();

/* GET home page. */
router.get('/csvParameter', function(req, res, next) {
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

router.post('/test', (req, res) => {
    console.log(req.rawBody)
    res.send(convertCsv(req.rawBody));
});

router.post('/csvParseBody', function(req, res, next) {
    const body = req.body
    console.log(body)
    // console.log(replaceQuotesWithBrackets(splitCsv(csv)))
    res.send(convertCsv(csv));
});

module.exports = router;