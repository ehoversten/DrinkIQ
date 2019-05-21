const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


// LOAD DATABASE DATA
require('../models/Drink');
const Drink = mongoose.model('drinks');

require('../models/Ingredient');
const Ingredient = mongoose.model('Ingredient');


router.get('/', (req, res) => {
    // ES5
    // Drink.find({}, function(err, drinks){
    //     if(err){
    //         console.log(err);
    //         res.redirect('/');
    //     } else {
    //         console.log(drinks);
    //         res.render('drinks/dashboard', {allDrinks: drinks});
    //     }
    // });

    // ES6 version
    Drink.find({})
        .then(drinks => {
            // console.log(drinks);
            res.render('drinks/dashboard', { allDrinks: drinks });
        })
        .catch(err => { console.log(err) });
});

router.get('/add', (req, res) => {
    res.render('drinks/add_input');
    // res.render('drinks/add');
});

router.post('/', (req, res) => {
    console.log('POST');
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
            notes: req.body.note
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


router.get('/:id', (req, res) => {
    Drink.findById({ _id: req.params.id })
        .populate("ingredients")
        .exec(function(err, drink) {
            if (err) {
                console.log(err);
                res.redirect('/api');
            }
            console.log(`Found Ingredients: ${drink}`);
            res.render('drinks/detail', { drink: drink });
        });
});

module.exports = router;

