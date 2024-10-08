function clear_section() {
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
}

function put_add_in_main() {
    let recipediv = document.createElement('div');
    recipediv.classList.add('add');

    recipediv.innerHTML = `
        <img src="https://imgs.search.brave.com/DLIP5yc8F1fR4TLucE_p9kZb3S9dbvzd6fN8F2PBcag/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTY4/NDAzMzEyL3Bob3Rv/L3BsdXMtc3ltYm9s/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1kVUdJOGNwcGlX/WE1Xdm90VjBHd3BJ/aTlzQ3FsYlZrMzNp/cGExTTJiSkRzPQ" alt="add">
    `;

    main.appendChild(recipediv);

    recipediv.addEventListener('click', function() {
        window.location.href = '../html/add.html';
    });
}

function createRecipeDiv(recipe, index) {
    let div = document.createElement('div');
    div.classList.add('new_creation', 'recipe');

    div.innerHTML = `
        <h1>${recipe.name}</h1>
        <button class="delete" data-index="${index}">Delete</button>
    `;

    // Clickable div to redirect to recipe_add.html
    div.addEventListener('click', function() {
        localStorage.setItem('selectedRecipeIndex', index); // Store index in localStorage
        window.location.href = '../html/recipe_add.html'; // Redirect to recipe details page
    });

    // Prevent propagation when delete button is clicked (so recipe doesn't open)
    div.querySelector('.delete').addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent click event from bubbling to div

        let recipeIndex = parseInt(this.getAttribute('data-index'), 10);
        console.log(`Deleting recipe at index: ${recipeIndex}`);

        // Remove the recipe from localStorage
        localStorage.removeItem(`recipe_${recipeIndex}`);

        // Update the names array
        let names = JSON.parse(localStorage.getItem('name')) || [];
        names.splice(recipeIndex, 1); // Remove the name at the corresponding index
        localStorage.setItem('name', JSON.stringify(names)); // Update in localStorage

        // Reorganize recipes
        reorganizeRecipes();

        // Display updated recipes
        displayRecipes();
    });

    main.appendChild(div);
}

function reorganizeRecipes() {
    let names = JSON.parse(localStorage.getItem('name')) || [];

    // Iterate through the names array and reassign recipe indices
    names.forEach((name, index) => {
        let recipe = JSON.parse(localStorage.getItem(`recipe_${index + 1}`));
        if (recipe) {
            localStorage.setItem(`recipe_${index}`, JSON.stringify(recipe)); // Reassign with new index
            localStorage.removeItem(`recipe_${index + 1}`); // Remove old index
        }
    });
}

function displayRecipes() {
    clear_section(); // Clear existing recipes

    let names = JSON.parse(localStorage.getItem('name')) || [];

    console.log("Loaded names from localStorage: ", names);

    names.forEach((name, index) => {
        let recipe = JSON.parse(localStorage.getItem(`recipe_${index}`));
        console.log(`Loaded recipe at index ${index}: `, recipe);
        if (recipe) {
            createRecipeDiv(recipe, index);
        }
    });

    put_add_in_main(); // Add the "Add" button at the end
}

// Add event listener to search input
let search = document.getElementById('Search');
let main = document.getElementsByTagName('main')[0];

search.addEventListener('input', function() {
    clear_section(); // Clear current displayed recipes
    let names = JSON.parse(localStorage.getItem('name')) || [];

    names.forEach((name, index) => {
        if (name.toLowerCase().includes(search.value.toLowerCase())) {
            let recipe = JSON.parse(localStorage.getItem(`recipe_${index}`));
            if (recipe) {
                createRecipeDiv(recipe, index);
            }
        }
    });

    put_add_in_main(); // Add the "Add" button back
});

// Call displayRecipes on initial load
displayRecipes();

let rec = document.getElementById('recipes-btn'); // Recipes button
let my = document.getElementById('my-creation-btn'); // My Creations button

    rec.addEventListener('click', function () {
        console.log('a');
        window.location.href = '../html/index.html'; // Navigate to Recipes page
    });

    my.addEventListener('click', function () {
        console.log('a');
        window.location.href = '../html/my_creation.html'; // Navigate to My Creations page
    });
