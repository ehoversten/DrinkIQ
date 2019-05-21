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

// const newIngredient = new Ingredient({
//     name: "Gin",
//     amt: "2.0",
//     postscript: "oz"
// });


// newIngredient.save(function(err, item){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(item);
//     }
// });
