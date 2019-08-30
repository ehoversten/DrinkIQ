// Define the UI variables
const form = document.querySelector("#drink-form");
const drinkList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-drinks");
const filter = document.querySelector("#filter");
const drinkInput = document.querySelector("#drink");
const ingredientForm = document.querySelector('#ingredient-form');
const ingredientInput = document.querySelector('#ingredient_1');
const newIngredientBtn = document.querySelector('#add-inc');
const newIngredientInput = document.querySelector('#add_ingredients');

// Initialize count to one as a single Ingredient form input is already visible.
let count = 1;

// Load all Event Listeners
loadEventListeners();

// Load all event Listeners
function loadEventListeners() {

    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getDrinks);

    // Add Ingredient Event
    // Add ****
    newIngredientBtn.addEventListener('click', addToForm);

    // Add Drink event
    // Add ****
    form.addEventListener("submit", addDrink);

    // Remove Drink event
    drinkList.addEventListener('click', removeDrink);

    // Clear Drink List
    clearBtn.addEventListener('click', clearDrinks);

    // Filter Drinks
    filter.addEventListener('keyup', filterDrinks);
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

// Clear All Drinks
function clearDrinks() {
    // drinkList.innerHTML = '';

    // Faster
    while (drinkList.firstChild) {
        drinkList.removeChild(drinkList.firstChild);
    }

    clearDrinksFromStorage();
}

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

    console.log("I've been clicked");
    // if no input value exists
    if (ingredientInput.value === '') {
        alert("Add an Ingredient");
    } else {
        console.log("Bingo");
        // Create(add) an Input to #ingredient-form
        const newInputDiv = document.createElement("div");
        const newInput = document.createElement("input");
        // Add Class
        newInputDiv.className = 'input-field';
        newInputDiv.innerHTML = `
                <div class="input-field col s4 mr-3">
                    <input type="text" name="ingredient-${count}" id="ingredient-${count}" >
                    <label for="ingredient-${count}">Ingredient</label>
                </div >
                <div class="input-field col s4 mr-3">
                    <input type="text" name="amt-${count}" id="amt-${count}">
                    <label for="amt-${count}">Amount</label>
                </div>
                <div class="input-field col s4 mr-3">
                    <input type="text" name="measurement-${count}" id="measurement-${count}">
                    <label for="measurement-${count}">Measurement</label>
                </div>`;

        // Create text node
        document.getElementById('add_ingredients').appendChild(newInputDiv);

        // Increment Counter
        count++;
    }

}