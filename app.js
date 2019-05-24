// Load Express 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// const multer = require('multer');
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

// ********* Multer Middleware ************

// // Set Storage Engine
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// // Initialize Storage
// const upload = multer({
//     storage: storage,
//     limits: { filesize: 1000000 },
//     fileFilter: function (req, file, cb) {
//         checkFileType(file, cb);
//     }
// }).single('myImg');

// // Check File Type
// function checkFileType(file, cb) {
//     // Allowed Extensions
//     const filetypes = /jpeg|jpg|png|gif/;
//     // Check Extension
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     // Check MIME type
//     const mimetype = filetypes.test(file.mimetype);

//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb("Error: Images Only");
//     }
// }

// Instaniate App Instance
const app = express();

app.use(express.static(path.join(__dirname, "./public")));
// app.use('/public/uploads', express.static('uploads'));

// SET up STATIC files
// app.use(express.static('public'));
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

// ------------------------------------//
//         TESTING UPLOAD ROUTE        //
// ------------------------------------//
// app.get('/upload', (req, res) => {
//     res.render('drinks/load');
//     // res.send("LOAD");
// });

// app.post('/upload', (req, res) => {

//     upload(req, res, (err) => {
//         if (err) {
//             res.render('drinks/load', { msg: err });
//         } else {
//             if (req.file == undefined) {
//                 res.render('drinks/load', {
//                     msg: "Error, No File Selected"
//                 });
//             } else {
//                 res.render('drinks/load', {
//                     msg: "File Uploaded",
//                     file: `uploads/${req.file.filename}`
//                 });
//             }
//             // console.log('********');
//             // console.log(req.file);
//             // res.send("test");
//         }
//     });
// });


app.get('/test', (req, res) => {
    res.send('Testing Test');
});


// Use External Routes
app.use('/api', routes);

// Declare PORT
const PORT = 5000;

// Run Server
app.listen(PORT, function(){
    console.log(`Server running on port ${PORT}`);
});