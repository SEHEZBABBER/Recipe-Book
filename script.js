document.addEventListener('DOMContentLoaded', () => {
  // Fetch the JSON file
  fetch('data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log(data); // JSON data loaded
      let main = document.getElementsByTagName('main')[0]; // Access the first (and likely only) <main> element

      data.forEach((recipe, index) => {
        // Create a new div for the recipe
        let recipediv = document.createElement('div');
        recipediv.classList.add('recipe');

        // Set the inner HTML for the recipe
        recipediv.innerHTML = `
          <h2>${recipe.name}</h2>
          <img src="${recipe.image_url}" alt="${recipe.name}">
          <p>Time to make: ${recipe.time_to_make}</p>
        `;

        // Append the recipe div to the main element
        main.appendChild(recipediv);

        // Add event listener to the recipe div
        recipediv.addEventListener('click', function() {
          console.log("Recipe clicked");
          localStorage.setItem("index", index + 1);
          window.location.href = 'recipe.html';
        });
      });

      let recipediv = document.createElement('div');
      recipediv.classList.add('add');

      // Set the inner HTML for the recipe
      recipediv.innerHTML = `
        <img src="https://imgs.search.brave.com/DLIP5yc8F1fR4TLucE_p9kZb3S9dbvzd6fN8F2PBcag/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTY4/NDAzMzEyL3Bob3Rv/L3BsdXMtc3ltYm9s/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1kVUdJOGNwcGlX/WE1Xdm90VjBHd3BJ/aTlzQ3FsYlZrMzNp/cGExTTJiSkRzPQ" alt="add">
      `;

      // Append the recipe div to the main element
      main.appendChild(recipediv);

      // Add event listener to the recipe div
      recipediv.addEventListener('click', function() {
        console.log("Add new recipe clicked");
        window.location.href = 'add.html';
      });
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });

  // Adding event listener for the #rec element
  let rec = document.getElementById('rec');
  let my = document.getElementById('my');
  rec.addEventListener('click', function(){
    window.location = 'index.html';
  });
  my.addEventListener('click',function(){
    window.location = 'my_creation.html';
  })
});
