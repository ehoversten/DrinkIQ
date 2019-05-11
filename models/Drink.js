const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DrinkSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: [{
        liquor: {
            type: String
        },
        amt: {
            type: Number
        },
        postscript: {
            type: String
        }
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

mongoose.model('drinks', DrinkSchema);

// const Drink = mongoose.model('drinks', DrinkSchema);
// model.exports = Drink;