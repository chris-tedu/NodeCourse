var express = require('express');
var handler = require('./handler.js');
var path = require('path');

var router = express.Router();

router.get('/',handler.index);
router.get('/submit',handler.submit);
router.post('/add',handler.add);
router.get('/detail',handler.detail);

router.use('/resources',express.static(path.join(__dirname,'../resources')));

module.exports = router;