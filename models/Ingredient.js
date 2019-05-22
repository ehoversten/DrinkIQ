const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    name: {
        type: String
    },
    amt: {
        type: String
    },
    postscript: {
        type: String
    },
    category: {
        type: String
    }
});

const Ingredient = mongoose.model('Ingredient', IngredientSchema);
module.exports = Ingredient;

