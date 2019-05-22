const newIngredient = new Ingredient({
    name: "Gin",
    amt: "2.0",
    postscript: "oz"
});


newIngredient.save(function(err, item){
    if(err){
        console.log(err);
    } else {
        console.log(item);
    }
});