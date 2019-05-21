const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ingredient = require('./Ingredient');

// const IngredientSchema = new Schema({
//     name: {
//         type: String
//     },
//     amt: {
//         type: String
//     },
//     postscript: {
//         type: String
//     },
//     category: {
//         type: String
//     }
// });


// module.exports = mongoose.model('Ingredients', IngredientSchema);

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

// mongoose.model('drinks', DrinkSchema);

// let Ingredient = mongoose.model('Ingredient', IngredientSchema);
// module.exports = Ingredient;


const Drink = mongoose.model('drinks', DrinkSchema);
module.exports = Drink;



// *** Create Temp Data **** //

// const newDrink = new Drink({
//     name: "G & T",
//     description: "A bitter classic"
// });

// const newIngredient = new Ingredient({
//     name: "Gin",
//     amt: 2.0,
//     postscript: "oz"
// });

// const newIngredient2 = new Ingredient({
//     name: "tonic",
//     amt: 8.0,
//     postscript: "oz"
// });

// newDrink.ingredients.push(newIngredient);
// newDrink.ingredients.push(newIngredient2);

// newDrink.save(function(err, drink){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(drink);
//     }
// });