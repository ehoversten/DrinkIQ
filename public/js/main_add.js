


// Define the UI variables
const form = document.querySelector("#drink-form");
const drinkList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-drinks");
const filter = document.querySelector("#filter");
const drinkInput = document.querySelector("#drink");
const ingredientForm = document.querySelector('#ingredient-form');
const ingredientInput = document.querySelector('#ingredient');
// const addBtn = document.querySelector('#add-ingredient');

const newIngredientBtn = document.querySelector('#add-inc');
const newIngredientLink = document.querySelector('#add-inc-link');
const newIngredientInput = document.querySelector('#add_ingredients');

// Load all Event Listeners
loadEventListeners();

// Load all event Listeners
function loadEventListeners() {

    alert("Connected to Main.js");

    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getDrinks);
    // Add Drink event
    form.addEventListener("submit", addDrink);
    // Add Ingredient Event
    ingredientForm.addEventListener("submit", addIngredients);
    // Add ****
    // addBtn.addEventListener('click', addToForm);
    // Remove Drink event
    drinkList.addEventListener('click', removeDrink);
    // Clear Drink List
    clearBtn.addEventListener('click', clearDrinks);
    // Filter Drinks
    filter.addEventListener('keyup', filterDrinks);

    // Add ****
    // newIngredientBtn.addEventListener('click', addToForm);
    newIngredientLink.addEventListener('click', addToForm);
}

// Get Drinks from Local Storage
function getDrinks() {
    let drinks;
    if (localStorage.getItem('drinks') === null) {
        drinks = [];
    } else {
        drinks = JSON.parse(localStorage.getItem('drinks'));
    }

    drinks.forEach(function (drink) {
        // Create li element
        const li = document.createElement("li");
        // Add class to element
        li.className = "collection-item";
        // Create text node
        li.appendChild(document.createTextNode(drink));

        // Create new link element
        const link = document.createElement('a');
        // Add Class
        link.className = "delete-item secondary-content";
        // Add Icon html
        link.innerHTML = '<i class="fas fa-minus-circle"></i>';
        // Append the link to the li
        li.appendChild(link);

        // Append li to ul
        drinkList.appendChild(li);
    });
}

// Add Drink
function addDrink(e) {
    // if no input value exists
    if (drinkInput.value === '') {
        alert("Add a drink");
    }

    console.log(`Submitted: ${drinkInput.value}`);

    // Create li element
    const li = document.createElement("li");
    // Add class to element
    li.className = "collection-item";
    // Create text node
    li.appendChild(document.createTextNode(drinkInput.value));

    // Create new link element
    const link = document.createElement('a');
    // Add Class
    link.className = "delete-item secondary-content";
    // Add Icon html
    link.innerHTML = '<i class="fas fa-minus-circle"></i>';
    // Append the link to the li
    li.appendChild(link);

    // Append li to ul
    drinkList.appendChild(li);

    // Store in Local Storage
    storeDrinkInLocalStorage(drinkInput.value);

    // Clear Input
    drinkInput.value = '';
    e.preventDefault();
}

// Storing Data in Local Storage
// function storeDrinkInLocalStorage(drink) {
//     let drinks;
//     if (localStorage.getItem('drinks') === null) {
//         drinks = [];
//     } else {
//         drinks = JSON.parse(localStorage.getItem('drinks'));
//     }

//     drinks.push(drink);

//     localStorage.setItem('drinks', JSON.stringify(drinks));
// }

// Remove Drink
function removeDrink(e) {
    // e.preventDefault();

    if (e.target.parentElement.classList.contains('delete-item')) {
        console.log(e.target);
        if (confirm("Delete Item")) {
            e.target.parentElement.parentElement.remove();

            // Remove from Local Storage
            removeDrinkFromStorage(e.target.parentElement.parentElement);
        }
    };

}

// Remove From Local Storage
// function removeDrinkFromStorage(drinkItem) {
//     let drinks;
//     if (localStorage.getItem('drinks') === null) {
//         drinks = [];
//     } else {
//         drinks = JSON.parse(localStorage.getItem('drinks'));
//     }

//     drinks.forEach(function (drink, index) {
//         if (drinkItem.textContent == drink) {
//             drinks.splice(index, 1);
//         }
//     });

//     localStorage.setItem('drinks', JSON.stringify(drinks));
// }

// Clear All Drinks
function clearDrinks() {
    // drinkList.innerHTML = '';

    // Faster
    while (drinkList.firstChild) {
        drinkList.removeChild(drinkList.firstChild);
    }

    clearDrinksFromStorage();
}

// function clearDrinksFromStorage() {
//     localStorage.clear();
// }

// Filter Drinks
function filterDrinks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (drink) {
        const item = drink.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            drink.style.display = 'block';
        } else {
            drink.style.display = 'none';
        }
    });
}

// Add Ingredients
function addIngredients(e) {
    e.preventDefault();

}

// Add Additional Ingredient Input 
function addToForm(e) {
    e.preventDefault();
    // if no input value exists
    if (ingredientInput.value === '') {
        alert("Add an Ingredient");
    } else {
        // Create(add) an Input to #ingredient-form
        const newInputDiv = document.createElement("div");
        const newInput = document.createElement("input");
        // Add Class
        newInputDiv.className = 'input-field';
        newInputDiv.innerHTML = `
            <div class="input-field col s4">
                <input type="text" name="ingredient" id="ingredient" >
                <label for="ingredient">Ingredient</label>
            </div >
            <div class="input-field col s4">
                <input type="text" name="amt" id="amt">
                <label for="amt">Amount</label>
            </div>
            <div class="input-field col s4">
                <input type="text" name="measurement" id="measurement">
                <label for="measurement">Measurement</label>
            </div>`;
        // Create text node
        document.getElementById('add_ingredients').appendChild(newInputDiv);
    }

}