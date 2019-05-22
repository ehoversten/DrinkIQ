// *** Create Temp Data **** //

const newDrink = new Drink({
    name: "G & T",
    description: "A bitter classic"
});

const newIngredient = new Ingredient({
    name: "Gin",
    amt: 2.0,
    postscript: "oz"
});

const newIngredient2 = new Ingredient({
    name: "tonic",
    amt: 8.0,
    postscript: "oz"
});

newDrink.ingredients.push(newIngredient);
newDrink.ingredients.push(newIngredient2);

newDrink.save(function(err, drink){
    if(err){
        console.log(err);
    } else {
        console.log(drink);
    }
});