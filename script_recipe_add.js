document.addEventListener('DOMContentLoaded', function() {
    // Fetch recipe from localStorage
    let selectedRecipeIndex = localStorage.getItem('selectedRecipeIndex');
    let recipe = JSON.parse(localStorage.getItem(`recipe_${selectedRecipeIndex}`)); // Fetching recipe from localStorage
    console.log(recipe);

    let header = document.getElementsByTagName('header')[0];
    let h1 = document.createElement('h1');
    h1.classList.add('heading'); // Apply consistent styling
    h1.innerHTML = `Making recipe for ${recipe.name}`;
    header.appendChild(h1);

    let main = document.getElementsByTagName('main')[0];
    let progressText = document.getElementById('progress-text'); // Get the progress text element

    // Clear previous steps if any
    main.innerHTML = '';

    // Render recipe steps
    recipe.steps.forEach((step, stepIndex) => {
        let step_div = document.createElement('div');
        step_div.classList.add('div'); // Apply consistent styling

        let checkboxId = `checkbox-${stepIndex}`;

        let timeText = recipe.time[stepIndex] !== -1 ? `${recipe.time[stepIndex]} mins` : 'Time:';

        step_div.innerHTML = `
            <h3 class="step">${step}</h3>
            ${recipe.temp[stepIndex] !== -1 ? `<h3 class="temp">Temp: ${recipe.temp[stepIndex]}</h3>` : ''}
            <h3 class="time">Time: ${timeText}</h3>
            <input type="checkbox" id="${checkboxId}" name="done" class="done-checkbox">
        `;

        main.appendChild(step_div);
    });

    // Initialize checkboxes
    const checkboxes = document.querySelectorAll('.done-checkbox');

    // Set the checkbox state based on localStorage
    const checkedSteps = JSON.parse(localStorage.getItem(`checkedSteps_${selectedRecipeIndex}`)) || [];
    checkboxes.forEach((checkbox, idx) => {
        if (checkedSteps.includes(idx)) {
            checkbox.checked = true;
        }
    });

    // Add the event listener to all checkboxes for state update
    checkboxes.forEach((checkbox, idx) => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                const allPreviousChecked = Array.from(checkboxes)
                    .slice(0, idx)
                    .every(prevCheckbox => prevCheckbox.checked);

                if (!allPreviousChecked) {
                    checkbox.checked = false;
                    alert('You must complete all previous steps before this one.');
                    return;
                }
            }
            saveCheckedSteps(selectedRecipeIndex); // Save checked steps state
        });
    });

    // Function to save the state of checked checkboxes for a specific recipe
    function saveCheckedSteps(recipeIndex) {
        const checkedSteps = [];
        document.querySelectorAll('.done-checkbox').forEach((checkbox, index) => {
            if (checkbox.checked) {
                checkedSteps.push(index);
            }
        });
        localStorage.setItem(`checkedSteps_${recipeIndex}`, JSON.stringify(checkedSteps));
    }

    // Get references to the buttons
    const editButton = document.getElementById('edit-button');
    const submitButton = document.getElementById('submit-button');

    // Check if buttons exist before adding event listeners
    if (editButton && submitButton) {
        // Function to toggle edit mode
        function toggleEditMode() {
            const stepsDivs = document.querySelectorAll('.div');
            const isEditing = editButton.textContent === 'Edit';

            stepsDivs.forEach(step_div => {
                let stepElement = step_div.querySelector('.step');
                let tempElement = step_div.querySelector('.temp');
                let timeElement = step_div.querySelector('.time');
                let checkboxElement = step_div.querySelector('.done-checkbox');

                if (isEditing) {
                    // Convert text to input fields
                    stepElement.innerHTML = `<input type="text" class="edit-step" value="${stepElement.textContent}">`;
                    tempElement.innerHTML = `<input type="text" class="edit-temp" value="${tempElement.textContent.replace('Temp: ', '')}">`;
                    timeElement.innerHTML = `<input type="text" class="edit-time" value="${timeElement.textContent.replace('Time: ', '')}">`;
                    checkboxElement.style.display = 'none';
                } else {
                    // Convert input fields back to text
                    let newStep = stepElement.querySelector('.edit-step').value;
                    let newTemp = tempElement.querySelector('.edit-temp').value;
                    let newTime = timeElement.querySelector('.edit-time').value;

                    stepElement.innerHTML = newStep;
                    tempElement.innerHTML = newTemp ? `Temp: ${newTemp}` : '';
                    timeElement.innerHTML = newTime ? `Time: ${newTime}` : '';

                    checkboxElement.style.display = 'inline';
                }
            });

            // Toggle button text
            editButton.textContent = isEditing ? 'Save' : 'Edit';
            submitButton.style.display = isEditing ? 'inline' : 'none';
        }

        // Function to save edited steps
        function saveEditedSteps() {
            const stepsDivs = document.querySelectorAll('.div');

            let updatedSteps = [];
            let updatedTemps = [];
            let updatedTimes = [];

            stepsDivs.forEach(step_div => {
                let stepElement = step_div.querySelector('.edit-step');
                let tempElement = step_div.querySelector('.edit-temp');
                let timeElement = step_div.querySelector('.edit-time');

                updatedSteps.push(stepElement ? stepElement.value : step_div.querySelector('.step').textContent);
                updatedTemps.push(tempElement ? tempElement.value : step_div.querySelector('.temp').textContent.replace('Temp: ', ''));
                updatedTimes.push(timeElement ? timeElement.value : step_div.querySelector('.time').textContent.replace('Time: ', ''));
            });

            // Update recipe object and save to localStorage
            recipe.steps = updatedSteps;
            recipe.temp = updatedTemps.map(temp => temp || -1); // Use -1 if empty
            recipe.time = updatedTimes.map(time => time || -1); // Use -1 if empty

            localStorage.setItem(`recipe_${selectedRecipeIndex}`, JSON.stringify(recipe));

            // Reload the page to reflect changes
            window.location.reload();
        }

        // Add event listeners
        editButton.addEventListener('click', toggleEditMode);
        submitButton.addEventListener('click', saveEditedSteps);
    } else {
        console.error('Edit or Submit button not found.');
    }
});
