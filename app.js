var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');


//connect to database
require('./src/config/database.js')();
//init image blob
require('./src/config/cloudinary.js')();

var app = express();

var port = process.env.PORT || 5000;


//APIs
var movieCharacterAPI = require('./src/api/movieCharacters.js');
var tvSeriesCharacterAPI = require('./src/api/tvSeriesCharacters.js');
var comicCharacterAPI = require('./src/api/comicCharacters.js');
var rateAPI = require('./src/api/rate.js');
var voteAPI = require('./src/api/vote.js');
var userAPI = require('./src/api/user.js');

app.use(express.static('public'));

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

require('./src/config/passport.js')(passport);

// required for passport
app.use(session({ secret: 'iLove-iMovieUi'})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.set('views', './src/views/');

app.set('view engine', 'ejs');
//controllers
var adminRouter = require('./src/routes/adminRoutes')(app, passport);
var authRouter = require('./src/routes/authRoutes');



//register controllers
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);



//register APIs
app.use('/api/movieCharacters', movieCharacterAPI);
app.use('/api/tvSeriesCharacter', tvSeriesCharacterAPI);
app.use('/api/comicCharacters', comicCharacterAPI);
app.use('/api/rate', rateAPI);
app.use('/api/vote', voteAPI);
app.use('/api/user', userAPI);
require('./src/routes/homeRoutes')(app);


app.listen(port, function (err) {
    console.log('running server on port ' + port);
});