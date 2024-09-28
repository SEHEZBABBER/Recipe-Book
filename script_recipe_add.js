document.addEventListener('DOMContentLoaded', function() {
    let selectedRecipeIndex = localStorage.getItem('selectedRecipeIndex');
    let recipe = JSON.parse(localStorage.getItem(`recipe_${selectedRecipeIndex}`));
    console.log(recipe);

    let header = document.getElementsByTagName('header')[0];
    let h1 = document.createElement('h1');
    h1.innerHTML = `Making recipe for ${recipe.name}`;
    header.appendChild(h1);

    let main = document.getElementsByTagName('main')[0];
    main.innerHTML = '';

    recipe.steps.forEach((step, stepIndex) => {
        let step_div = document.createElement('div');
        step_div.classList.add('div');

        let checkboxId = `checkbox-${stepIndex}`;
        let timeValue = recipe.time[stepIndex] !== -1 ? recipe.time[stepIndex] : '';
        let timeText = recipe.time[stepIndex] !== -1 ? `${timeValue} mins` : '';
        let tempValue = recipe.temp[stepIndex] !== '' ? `${recipe.temp[stepIndex]} °C` : '';

        step_div.innerHTML = `
            <h3 class="step">${step}</h3>
            <h3 class="temp">${tempValue}</h3>
            <h3 class="time">${timeText}</h3>
            <input type="checkbox" id="${checkboxId}" class="done-checkbox">
        `;
        main.appendChild(step_div);
    });

    const checkboxes = document.querySelectorAll('.done-checkbox');
    const checkedSteps = JSON.parse(localStorage.getItem(`checkedSteps_${selectedRecipeIndex}`)) || [];
    checkboxes.forEach((checkbox, idx) => {
        if (checkedSteps.includes(idx)) checkbox.checked = true;
    });

    checkboxes.forEach((checkbox, idx) => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                const allPreviousChecked = Array.from(checkboxes)
                    .slice(0, idx)
                    .every(prevCheckbox => prevCheckbox.checked);
                if (!allPreviousChecked) {
                    checkbox.checked = false;
                    alert('Complete previous steps first.');
                    return;
                }
            }
            updateProgress(); // Update progress bar
            saveCheckedSteps(selectedRecipeIndex);
        });
    });

    function saveCheckedSteps(recipeIndex) {
        const checkedSteps = [];
        document.querySelectorAll('.done-checkbox').forEach((checkbox, index) => {
            if (checkbox.checked) checkedSteps.push(index);
        });
        localStorage.setItem(`checkedSteps_${recipeIndex}`, JSON.stringify(checkedSteps));
    }

    function updateProgress() {
        const totalSteps = checkboxes.length;
        const completedSteps = Array.from(checkboxes).filter(cb => cb.checked).length;
        const progressPercent = (completedSteps / totalSteps) * 100;

        document.querySelector('.progress-bar').style.width = `${progressPercent}%`;
        document.getElementById('progress-text').textContent = `${Math.round(progressPercent)}%`;
    }

    const editSaveButton = document.getElementById('edit-save-button');
    editSaveButton.addEventListener('click', () => {
        const isEditing = editSaveButton.textContent === 'Edit';
        const stepsDivs = document.querySelectorAll('.div');

        if (isEditing) {
            stepsDivs.forEach(div => {
                let stepElement = div.querySelector('.step');
                let tempElement = div.querySelector('.temp');
                let timeElement = div.querySelector('.time');
                stepElement.innerHTML = `<input type="text" class="edit-step" value="${stepElement.textContent}">`;
                tempElement.innerHTML = `<input type="text" class="edit-temp" value="${tempElement.textContent.replace(' °C', '')}">`;
                timeElement.innerHTML = `<input type="text" class="edit-time" value="${timeElement.textContent.replace(' mins', '')}">`;
            });
            editSaveButton.textContent = 'Save';
        } else {
            let updatedSteps = [];
            let updatedTemps = [];
            let updatedTimes = [];
            stepsDivs.forEach(div => {
                let stepInput = div.querySelector('.edit-step').value;
                let tempInput = div.querySelector('.edit-temp').value;
                let timeInput = div.querySelector('.edit-time').value;
                updatedSteps.push(stepInput);
                updatedTemps.push(tempInput === '' ? '' : tempInput);
                updatedTimes.push(timeInput === '' ? -1 : parseInt(timeInput)); // Use -1 for empty time input
            });

            recipe.steps = updatedSteps;
            recipe.temp = updatedTemps;
            recipe.time = updatedTimes; // Save updated times and temps
            localStorage.setItem(`recipe_${selectedRecipeIndex}`, JSON.stringify(recipe));
            window.location.reload(); // Refresh to display changes
        }
    });

    document.getElementById('goback').addEventListener('click', () => {
        window.location.href = 'my_creation.html';
    });

    // Initialize progress on page load
    updateProgress();
});
