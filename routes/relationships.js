const express = require('express');
const router = express.Router();
const getCaselist = require('./helpers/caselistForUser');

router.get('/externalRef/:deliusUserName/COM', function (req, res) {
  const caselist = getCaselist(req.headers.authorization);

  res.send(caselist)
});

module.exports = router;
