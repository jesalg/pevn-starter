var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var webpackAssets = require('express-webpack-assets')

var index = require('./routes/index');
var config = require('./webpack.config');

var NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.set('trust proxy', true);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// webpack setup
if (NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/dist'));
} else {
  const compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: { colors: true }
  }))
  app.use(webpackHotMiddleware(compiler))
}
app.use(webpackAssets('./config/webpack-assets.json', {
	devMode: NODE_ENV !== 'production'
}));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT || 4000)

module.exports = app;
