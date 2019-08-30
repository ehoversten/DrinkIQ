// Load Express 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const ejs = require('ejs');
const path = require('path');

const routes = require('./routes/api');

// Connect to MondoDB
mongoose.connect('mongodb://localhost/drink-iq', { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected ...'))
    .catch(err => console.log(err));

// Use native promises (only necessary with mongoose versions <= 4)
mongoose.Promise = global.Promise;

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

// Instaniate App Instance
const app = express();

// SET up STATIC files
app.use(express.static(path.join(__dirname, "./public")));

// Set View EJS Templates as View Engine
app.set('view engine', 'ejs');

// -- Body Parser Middleware -- //
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));



// Express-Session Middleware setup
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
// }));


// ============================ //
// ========== ROUTES ========== //
// ============================ //

// Routes
app.get('/', (req, res) => {
    res.render('index');
});


app.get('/about', (req, res) => {
    // res.send('About Page');
    res.render('about');
});

app.get('/contact', (req, res) => {
    // res.send('Contact page');
    res.render('contact');
});


// Use External Routes
app.use('/api', routes);

// Declare PORT
const PORT = 5000;

// Run Server
app.listen(PORT, function(){
    console.log(`Server running on port ${PORT}`);
});