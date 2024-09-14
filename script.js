fetch('data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      function add_tolocal(arr){
        if(arr.length >= 5)arr.shift();
        localStorage.setItem('search_history',JSON.stringify(arr));
      }
      let main = document.getElementsByTagName('main')[0]; // Access the first (and likely only) <main> element
      let search = document.getElementById('Search');
      let search_btn = document.getElementById('search_btn');
      search_btn.addEventListener('click', function() {
        let str = search.value.trim(); // Get the search input value and trim whitespace
        if (str === "") return; // Prevent adding empty strings to search history
    
        // Retrieve the search history from localStorage
        let arr = JSON.parse(localStorage.getItem('search_history')) || []; // Parse the stored data or initialize an empty array
    
        // Add the search term to the array and update localStorage
        arr.push(str);
        add_tolocal(arr); // Call the function to handle localStorage update
      });
      // Function to clear all child nodes of the main element
      function clear_main() {
        while (main.firstChild) {
          main.removeChild(main.firstChild);
        }
      }

      // Function to create a recipe div
      function createRecipeDiv(recipe, index) {
        let recipediv = document.createElement('div');
        recipediv.classList.add('recipe');

        recipediv.innerHTML = `
          <h2>${recipe.name}</h2>
          <img src="${recipe.image_url}" alt="${recipe.name}">
          <p>Time to make: ${recipe.time_to_make}</p>
        `;

        main.appendChild(recipediv);

        recipediv.addEventListener('click', function() {
          console.log("Recipe clicked");
          localStorage.setItem("index", index + 1);
          window.location.href = 'recipe.html';
        });
      }

      // Function to add "Add New Recipe" button
      function addNewRecipeButton() {
        let recipediv = document.createElement('div');
        recipediv.classList.add('add');

        recipediv.innerHTML = `
          <img src="https://imgs.search.brave.com/DLIP5yc8F1fR4TLucE_p9kZb3S9dbvzd6fN8F2PBcag/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTY4/NDAzMzEyL3Bob3Rv/L3BsdXMtc3ltYm9s/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1kVUdJOGNwcGlX/WE1Xdm90VjBHd3BJ/aTlzQ3FsYlZrMzNp/cGExTTJiSkRzPQ" alt="add">
        `;

        main.appendChild(recipediv);

        recipediv.addEventListener('click', function() {
          console.log("Add new recipe clicked");
          window.location.href = 'add.html';
        });
      }

      // Display recipes when search input is updated
      search.addEventListener('input', function () {
        clear_main(); // Clear previous results

        // Filter and display recipes that match the search value
        data.forEach((recipe, index) => {
          if (recipe.name.toLowerCase().includes(search.value.toLowerCase())) {
            createRecipeDiv(recipe, index);
          }
        });

        // Always display the "Add New Recipe" button
        addNewRecipeButton();
      });

      // Initial rendering of all recipes and the "Add New Recipe" button
      data.forEach((recipe, index) => {
        createRecipeDiv(recipe, index);
      });

      addNewRecipeButton(); // Add the "Add New Recipe" button

    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });

// Adding event listener for the #rec and #my elements
let rec = document.getElementById('rec');
let my = document.getElementById('my');

// Add null checks in case these elements are not present in the DOM
if (rec) {
  rec.addEventListener('click', function () {
    window.location = 'index.html';
  });
}

if (my) {
  my.addEventListener('click', function () {
    window.location = 'my_creation.html';
  });
}
