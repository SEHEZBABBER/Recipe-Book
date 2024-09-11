// Fetch the data from the JSON file
fetch('data.json')
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
        console.log(data); // Debugging: Check the structure of the data

        // Assuming `data` is an array of recipes
        for (let recipe of data) {
            // Check if the recipe ID matches the localStorage index
            if (recipe.id == localStorage.index) {
                let main = document.getElementsByTagName('main')[0];

                // Debugging: Check the recipe object
                console.log(recipe);

                for (let step of recipe.steps) {
                    // Create a new div for each step
                    let recipediv = document.createElement('div');
                    
                    // Check the step type
                    console.log(step);

                    // Set the inner HTML of the div
                    // Ensure `step` is a string; if it's an object, convert it to a string
                    recipediv.innerHTML = `<p>${typeof step === 'object' ? JSON.stringify(step) : step}</p>`;
                    
                    // Append the div to the main element
                    main.appendChild(recipediv);
                }
            }
        }
    })
    .catch(error => console.error('Error fetching data:', error));
