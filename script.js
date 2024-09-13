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
      <h2>Create Your Own Customised Recipe</h2>
      <img src = "https://imgs.search.brave.com/9lZbDneHCDEhp5adErvUdvh7Bk3i4zM-IVjT8fEi1Ug/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni83OTA0Lzc5MDQy/MDcucG5nP3NlbXQ9/YWlzX2h5YnJpZA" alt="add">
    `;

    // Append the recipe div to the main element
    main.appendChild(recipediv);

    // Add event listener to the recipe div
    recipediv.addEventListener('click', function() {
      console.log("Recipe clicked");
      window.location.href = 'add.html';
    })
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
