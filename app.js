var koa = require('koa');
var router = require('koa-router')();
var render = require('koa-art-template');
var path = require('path');
var static = require('koa-static');
var session = require('koa-session');
var bodyParser = require('koa-bodyparser');
var app = new koa();
app.use(bodyParser());

app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'koa:sess',
  maxAge: 864000,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: true,
  renew: false,
};
app.use(session(CONFIG, app));

render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
})

app.use(static(__dirname + '/public'));

var index = require('./routes/index.js');
var admin = require('./routes/admin.js');
var api = require('./routes/api.js');

router.use('/admin',admin);
router.use('/api',api);
router.use(index);

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);