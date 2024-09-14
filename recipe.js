fetch('data.json')
.then(response => response.json()) // Parse the response as JSON
.then(data => {
    console.log(data); // Debugging: Check the structure of the data
    
    // Assuming data is an array of recipes
    let btn = document.getElementById('goback');
    btn.addEventListener('click',function(){
        console.log('a');
        window.location.href = 'index.html';
    });
        for (let recipe of data) {
            // Check if the recipe ID matches the localStorage index
            if (recipe.id == localStorage.index) {
                let main = document.getElementsByTagName('main')[0];
                let header = document.getElementsByTagName('header')[0];
                let h1 = document.createElement('h1');
                h1.classList.add('heading');
                h1.innerHTML = `Recipe for ${recipe.name}`;
                header.appendChild(h1);

                for (let st of recipe.steps) {
                    let step_div = document.createElement('div');
                    let str = JSON.stringify(st.step);
                    str = str.slice(1, str.length - 1);
                    let temp = st.temp;
                    let time = st.time;
                    step_div.innerHTML = `<h3 id="step">${str}</h3><input type="checkbox" name="done" class="done-checkbox" id="done">`;
                    if (temp != -1) {
                        step_div.innerHTML = `<h3 id="step">${str}</h3><h3>Temp: ${temp}</h3><input type="checkbox" name="done" class="done-checkbox" id = "done">`;
                    }
                    if (time != -1) {
                        step_div.innerHTML = `<h3 id="step">${str}</h3><h3>Time: ${time}</h3><input type="checkbox" name="done" class="done-checkbox" id = "done">`;
                    }
                    step_div.classList.add('div');
                    main.appendChild(step_div);
                }

                // Add the event listener to all checkboxes for progress update
                const checkboxes = document.querySelectorAll('.done-checkbox');
                const progressBar = document.getElementById('progress-bar');
                const progressText = document.getElementById('progress-text'); // Get the progress text element

                checkboxes.forEach(checkbox => {
                    checkbox.addEventListener('change', () => {
                        updateProgress(checkboxes, progressBar, progressText);
                    });
                });
            }
        }
    })
    .catch(error => console.error('Error fetching data:', error));

// Function to update the progress bar and percentage text
function updateProgress(checkboxes, progressBar, progressText) {
    const total = checkboxes.length;
    let checkedCount = 0;
    
    // Count the number of checked checkboxes
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkedCount++;
        }
    });

    // Calculate the percentage of progress
    const progress = (checkedCount / total) * 100;

    // Update the width of the progress bar
    progressBar.style.width = `${progress}%`;

    // Update the text in the progress bar
    progressText.textContent = `${Math.round(progress)}%`;
}