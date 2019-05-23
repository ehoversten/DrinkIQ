const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const multer = require('multer');

// SET STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const upload = multer({ storage: storage });

// LOAD DATABASE DATA
require('../models/Drink');
const Drink = mongoose.model('drinks');

require('../models/Ingredient');
const Ingredient = mongoose.model('Ingredient');



// ------------------------------------//
//           GET ALL ROUTE             //
// ------------------------------------//
router.get('/', (req, res) => {
    // ES5
    // Drink.find({}, function(err, drinks){
    //     if(err){
    //         console.log(err);
    //         res.redirect('/');
    //     } else {
    //         console.log(drinks);
    //         res.render('drinks/dashboard', {drinks: drinks});
    //     }
    // });

    // ES6 version
    Drink.find({})
        .then(drinks => {
            // console.log(drinks);
            res.render('drinks/dashboard', { drinks: drinks });
        })
        .catch(err => { console.log(err) });
});

// ------------------------------------//
//          ADD FORM ROUTE             //
// ------------------------------------//
router.get('/add', (req, res) => {
    res.render('drinks/add_input');
    // res.render('drinks/add');
});

// ------------------------------------//
//        CREATE DRINK ROUTE           //
// ------------------------------------//
router.post('/', upload.single('drink_img'), (req, res) => {

    console.log('**********************');
    console.log(`Request: ${req.body.name}`);
    console.log(`Request: ${req.body.description}`);

    console.log(`Ingredient 1: ${req.body.ingredient_1}`);
    console.log(`Amt 1: ${req.body.amt_1}`);
    console.log(`Measure 1: ${req.body.measurement_1}`);

    console.log(`Ingredient 2: ${req.body.ingredient_2}`);
    console.log(`Amt 2: ${req.body.amt_2}`);
    console.log(`Measure 2: ${req.body.measurement_2}`);

    console.log(`Ingredient 3: ${req.body.ingredient_3}`);
    console.log(`Amt 2: ${req.body.amt_3}`);
    console.log(`Measure 3: ${req.body.measurement_3}`);

    console.log(req.file);


    // Create Errors Array 
    let errors = [];

    // Server Side Validation
    if(!req.body.name){
        errors.push({text: 'Please Enter Name'});
    }
    // if (!req.body.description) {
    //     errors.push({ text: 'Enter Description' });
    // }

    // if ERRORs exist
    if(errors.length > 0){
        res.render('api/add', {
            errors: errors, 
            name: req.body.name,
            description: req.body.description,
            note: req.body.note,
            ingredients: [{ 
                name: req.body.ingredient_1, 
                amt: req.body.amt_1, 
                postscript: req.body.measurement_1
            }, {
                name: req.body.ingredient_2,
                amt: req.body.amt_2,
                postscript: req.body.measurement_2
            }, {
                name: req.body.ingredient_3,
                amt: req.body.amt_3,
                postscript: req.body.measurement_3
            }]
        });
    } else {
        console.log('PASSED VALIDATION');


        // Create new Object and Save to DB
        Drink.create({
            name: req.body.name,
            description: req.body.description,
            note: req.body.note,
            image: req.file.path
        }, function (err, drink) {
            if (err) {
                console.log(err);
            } else {
                console.log(drink);
                // Create/Add ingredient to drink array
                Ingredient.create({
                    name: req.body.ingredient_1,
                    amt: req.body.amt_1,
                    postscript: req.body.measurement_1
                }, function (err, ingredient) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(ingredient);
                        drink.ingredients.push(ingredient);
                        console.log("Ingredient added");
                    }
                });
                // Create/Add ingredient to drink array
                Ingredient.create({
                    name: req.body.ingredient_2,
                    amt: req.body.amt_2,
                    postscript: req.body.measurement_2
                }, function (err, ingredient) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(ingredient);
                        drink.ingredients.push(ingredient);
                        console.log("Ingredient added");
                    }
                });
                // Create/Add ingredient to drink array
                Ingredient.create({
                    name: req.body.ingredient_3,
                    amt: req.body.amt_3,
                    postscript: req.body.measurement_3
                }, function (err, ingredient) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(ingredient);
                        drink.ingredients.push(ingredient);
                        console.log("Ingredient added");

                        // Save Ingredients to Drink
                        // drink.save();
                        // console.log("Ingredient saved");
                    }

                    // Save Ingredients to Drink
                    drink.save();
                    console.log("Ingredient saved");
                });  
            }
        }) // end of CREATE method
    }
    res.redirect('/api');
});

// ------------------------------------//
//            GET by ID ROUTE          //
// ------------------------------------//
router.get('/:id', (req, res) => {
    Drink.findById({ _id: req.params.id })
        .populate("ingredients")
        .exec(function(err, drink) {
            if (err) {
                console.log(err);
                res.redirect('/api');
            }
            console.log(`Found: ${drink}`);
            res.render('drinks/detail', { drink: drink });
        });
});

// ------------------------------------//
//           EDIT DRINK ROUTE          //
// ------------------------------------//
router.get('/:id/edit', (req, res) => {

    let counter = 1;
    Drink.findById({ _id: req.params.id })
        .populate("ingredients")
        .exec(function (err, drink) {
            if (err) {
                console.log(err);
                res.redirect('/api');
            }
            console.log(`Found: ${drink}`);
            res.render('drinks/edit', { drink: drink, counter: counter });
        });
});


// ------------------------------------//
//         UPDATE DRINK ROUTE          //
// ------------------------------------//
router.put('/:id/edit', (req, res) => {
    Drink.findOneAndUpdate( { _id: req.params.id }, 
        {
            name: req.body.name, 
            description: req.body.description,
            notes: req.body.note,
            image: req.file
        }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            res.redirect('/api');
        }
    });
});


// ------------------------------------//
//            DELETE ROUTE             //
// ------------------------------------//
router.delete('/:id', (req, res) => {

    Drink.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Drink removed");
            res.redirect('/api');
        }
    });
});

// router.delete('/:id', (req, res) => {
//     console.log("HIT DELETE ROUTE");
//     Drink.findById(req.params.id, (err, drink) => {
//         if (err) {
//             console.log(err);
//         } else {
//             // Delete All Ingredients First
//             drink.ingredients.forEach(item => {
//                 item.findOneAndDelete({ _id: item._id}, (err) => {
//                     if(err){
//                         console.log(err);
//                     } else {
//                         console.log(`${item} removed`);
//                     }
//                 })
//             }); 
//             // Delete Drink From DB
//             // drink.remove();
//             console.log("Drink deleted");
//             res.redirect('/api');
//         }
//     });
// });

module.exports = router;

