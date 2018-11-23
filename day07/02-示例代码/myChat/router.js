var express = require('express');
var router = express.Router();
var path = require('path');
var home = require('./controllers/home.js');
var index = require('./controllers/index');
var login = require('./controllers/login');
var register = require('./controllers/register');
var chat = require('./controllers/chat');

router.get('/', index.requireAuth, home.showHome);
router.post('/login', login.doLogin);
router.get('/login', login.showLogin);
router.get('/register', login.showRegister);
router.post('/register', register.doRegister);
router.get('/checkuser', register.checkUser);
router.get('/home', index.requireAuth, home.showHome);
router.get('/chat', index.requireAuth, chat.showChat);
router.get('/logout', login.logout);
router.use('/public', express.static(path.join(__dirname, './public')));

module.exports = router;