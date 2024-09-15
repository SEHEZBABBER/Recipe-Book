let main = document.getElementsByTagName('main')[0];
let search = document.getElementById('Search');

// Clear all child elements from the main section
function clear_section() {
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
}

// Add the "Add" button to the main section
function put_add_in_main() {
    let recipediv = document.createElement('div');
    recipediv.classList.add('add');

    recipediv.innerHTML = `
        <img src="https://imgs.search.brave.com/DLIP5yc8F1fR4TLucE_p9kZb3S9dbvzd6fN8F2PBcag/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTY4/NDAzMzEyL3Bob3Rv/L3BsdXMtc3ltYm9s/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1kVUdJOGNwcGlX/WE1Xdm90VjBHd3BJ/aTlzQ3FsYlZrMzNp/cGExTTJiSkRzPQ" alt="add">
    `;

    // Append the recipe div to the main element
    main.appendChild(recipediv);

    // Add event listener to the recipe div for redirection
    recipediv.addEventListener('click', function() {
        window.location.href = 'add.html';
    });
}

// Search functionality
search.addEventListener('input', function() {
    clear_section(); // Clear current displayed recipes
    
    let names = JSON.parse(localStorage.getItem('name')) || []; // Fetch names from localStorage
    names.forEach(name => {
        if (name.toLowerCase().includes(search.value.toLowerCase())) { // Search by name (case-insensitive)
            let obj = JSON.parse(localStorage.getItem(name)); // Fetch the recipe object
            if (obj) {
                let div = document.createElement('div');
                div.innerHTML = `
                    <h1>${obj.name}</h1>
                    <button class="delete" data-name="${name}">Delete</button>
                `;
                div.classList.add('new_creation', 'recipe');
                main.appendChild(div);

                // Add delete functionality to each recipe
                div.querySelector('.delete').addEventListener('click', function() {
                    let recipeName = this.getAttribute('data-name');
                    localStorage.removeItem(recipeName); // Remove from localStorage
                    names = names.filter(n => n !== recipeName); // Remove from list
                    localStorage.setItem('name', JSON.stringify(names)); // Update the list in localStorage
                    displayRecipes(); // Refresh recipe display
                });
            }
        }
    });
    put_add_in_main(); // Add the "Add" button back
});

// Display all recipes initially
function displayRecipes() {
    clear_section(); // Clear existing recipes

    let names = JSON.parse(localStorage.getItem('name')) || []; // Get the list of recipe names

    names.forEach(name => {
        let obj = JSON.parse(localStorage.getItem(name));
        if (obj) {
            let div = document.createElement('div');
            div.innerHTML = `
                <h1>${obj.name}</h1>
                <button class="delete" data-name="${name}">Delete</button>
            `;
            div.classList.add('new_creation', 'recipe');
            main.appendChild(div);

            // Add delete functionality to each recipe
            div.querySelector('.delete').addEventListener('click', function() {
                let recipeName = this.getAttribute('data-name');
                localStorage.removeItem(recipeName); // Remove from localStorage
                names = names.filter(n => n !== recipeName); // Update list
                localStorage.setItem('name', JSON.stringify(names)); // Update in localStorage
                displayRecipes(); // Refresh recipe display
            });
        }
    });

    put_add_in_main(); // Add the "Add" button at the end
}

// Call the function to display recipes initially
displayRecipes();

// Navigation event listeners
let rec = document.getElementById('rec');
let my = document.getElementById('my');
rec.addEventListener('click', function() {
    window.location = 'index.html';
});
my.addEventListener('click', function() {
    window.location = 'my_creation.html';
});
