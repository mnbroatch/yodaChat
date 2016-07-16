const PORT = process.env.PORT || 8000;

const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const http = require('http');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);



let io = require('socket.io')(server);

io.on('connection',function(socket){
	console.log(`Socket connected. ${socket}`);

	socket.on('sendMessage', function(data){
		io.emit('newMessage', data);
	});

	socket.on('disconnect', function(){
		console.log(`Disconnect ${socket}`)
	});
});



const mongoose = require('mongoose');
const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost/attHackathon'; // TODO: SET MONGODB URL
mongoose.connect(mongoUrl, err => {
  console.log(err || `MongoDB connected to ${mongoUrl}`);
});

server.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.handle = (err, data) => {
    console.log('error handler!!' ,err, data);

    res.status(err ? 400 : 200).send(err || data);
  };
  return next();
});


// /////// ROUTERS //////////////

app.use('/api', require('./routes/api'));

// //////////////////////////////

app.get('/', (req, res) => {
  res.render('index', { title: 'MEAN Stack Template - BASIC' });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.send(err);
});
