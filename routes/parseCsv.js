let express = require('express');
const { convertCsv } = require('../lib/convertCsv');
const { convertBodyToStringBlock } = require('../lib/parseBody');
let router = express.Router();

router.get('/healthcheck', function(req, res, next) {
  res.status(200).send("Healthy");
});

router.get('/csvParameter', function(req, res, next) {
    if (typeof(req.query.csv) != String ) {
      res.status(400).send("Invalid data type, please provide string in query paramters");
    } else {
    const csv = req.query.csv
    res.status(200).send(convertCsv(csv));
    }
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
  console.log(typeof(req.rawBody))
  if (typeof(req.rawBody) != 'string') {
    res.status(400).send("Invalid data type, body must be provided in text format");
  } else {
    (async () => {
      let returnBlock = await convertBodyToStringBlock(req.rawBody);
      res.send(returnBlock);
    })();
  }   
});

module.exports = router;