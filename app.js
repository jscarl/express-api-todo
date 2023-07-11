var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var todoRouter = require('./routes/todos');
const db = require('./models');
const responseHandler = require('./routes/responseHandlers');

var app = express();
const PORT = process.env.PORT;


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(responseHandler)
app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/todo', todoRouter);

db.sequelize.sync({ force: false });


module.exports = app;
