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

    data.forEach(recipe => {
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
    });
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
