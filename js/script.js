// Fetch recipe data from data.json
fetch('../json/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const main = document.getElementsByTagName('main')[0]; // Access the <main> element
        const search = document.getElementById('search'); // Search input field

        // Function to clear the main content area
        function clearMain() {
            while (main.firstChild) {
                main.removeChild(main.firstChild);
            }
        }

        // Function to initialize progress array in localStorage if not already present
        function initializeProgress(dataLength) {
            let progress = JSON.parse(localStorage.getItem('progress')) || [];
            // Ensure the progress array has enough elements for all recipes
            for (let i = progress.length; i < dataLength; i++) {
                progress.push(0); // Default value for new items
            }
            localStorage.setItem('progress', JSON.stringify(progress)); // Save back to localStorage
            return progress;
        }

        // Function to create a recipe div and append it to the main element
        function createRecipeDiv(recipe, index) {
            let recipeDiv = document.createElement('div');
            let progress = JSON.parse(localStorage.getItem('progress')); // Retrieve updated progress array

            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <h2>${recipe.name}</h2>
                <img src="${recipe.image_url}" alt="${recipe.name}">
                <p> Progress : ${progress[index]}</p>
            `;

            main.appendChild(recipeDiv);

            recipeDiv.addEventListener('click', function () {
                console.log("Recipe clicked: " + recipe.name);
                localStorage.setItem("index", index + 1); // Store the index in localStorage
                window.location.href = '../html/recipe.html'; // Navigate to recipe.html
            });
        }

        // Function to add the "Add New Recipe" button at the end of the list
        function addNewRecipeButton() {
            let addRecipeDiv = document.createElement('div');
            addRecipeDiv.classList.add('add');
            addRecipeDiv.innerHTML = `
                <img src="https://imgs.search.brave.com/DLIP5yc8F1fR4TLucE_p9kZb3S9dbvzd6fN8F2PBcag/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTY4/NDAzMzEyL3Bob3Rv/L3BsdXMtc3ltYm9s/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1kVUdJOGNwcGlX/WE1Xdm90VjBHd3BJ/aTlzQ3FsYlZrMzNp/cGExTTJiSkRzPQ" alt="Add New Recipe">
            `;

            main.appendChild(addRecipeDiv);

            // Add click event listener to navigate to the add recipe page
            addRecipeDiv.addEventListener('click', function () {
                console.log("Add new recipe clicked");
                window.location.href = '../html/add.html'; // Navigate to add.html
            });
        }

        // Function to filter and display recipes based on search input
        function displayFilteredRecipes() {
            clearMain(); // Clear the existing recipes before showing new results

            // Filter recipes that match the search input and display them
            data.forEach((recipe, index) => {
                if (recipe.name.toLowerCase().includes(search.value.toLowerCase())) {
                    createRecipeDiv(recipe, index); // Create recipe cards for matching recipes
                }
            });

            // Always display the "Add New Recipe" button
        }

        // Initialize the progress array based on the number of recipes
        const progressArray = initializeProgress(data.length);

        // Event listener for real-time search functionality
        search.addEventListener('input', displayFilteredRecipes);

        // Initial rendering of all recipes on page load
        data.forEach((recipe, index) => {
            createRecipeDiv(recipe, index); // Create and append all recipe cards
        });

        // Add the "Add New Recipe" button at the end of the recipe list
        addNewRecipeButton();

    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

// Handle tab navigation for Recipes and My Creations pages
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
