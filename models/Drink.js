const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ingredient = require('./Ingredient');

const DrinkSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient'
    }],
    description: {
        type: String
    },
    notes: {
        type: String,
    }, 
    image: {
        type: String,
        // required: true
    },
    category: {
        type: String,   
        // required: true
    }
}); 


const Drink = mongoose.model('drinks', DrinkSchema);
module.exports = Drink;

