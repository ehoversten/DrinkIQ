const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


// LOAD DATABASE DATA
require('../models/Drink');
const Drink = mongoose.model('drinks');


router.get('/', (req, res) => {
    res.render('drinks/dashboard');
});

router.get('/add', (req, res) => {
    res.render('drinks/add');
});

router.post('/', (req, res) => {
    console.log('POST');
    console.log('**********************');
    console.log(`Request: ${req.body.name}`);
    console.log(`Request: ${req.body.description}`);

    // Create Errors Array 
    let errors = [];

    // Server Side Validation
    if(!req.body.name){
        errors.push({text: 'Please Enter and Ingredient'});
    }
    if (!req.body.description) {
        errors.push({ text: 'Enter and Amount' });
    }

    // if ERRORs exist
    if(errors.length > 0){
        res.render('api/add', {
            errors: errors, 
            name: req.body.name,
            description: req.body.description
        });
    } else {
        // console.log('PASSED VALIDATION');
        // Save new OBJECT to Database
        const newDrink = {
            name: req.body.name,
            description: req.body.description
        }
        new Drink(newDrink)
            .save()
            // Create Promise
            .then(idea => {
                // show flash message
                // req.flash('success_msg', 'Drink Added');
                console.log("Drink Saved");
                // redirect to Ideas List page
                res.redirect('/api');
            })
            .catch(err => { 
                console.log(err); 
                res.redirect('/api/add');
            });
    }

    res.redirect('/api');
})

module.exports = router;

