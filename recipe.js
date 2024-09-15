fetch('data.json')
  .then(response => response.json()) // Parse the response as JSON
  .then(data => {
    console.log(data); // Debugging: Check the structure of the data

    let btn = document.getElementById('goback');
    btn.addEventListener('click', function() {
      let index = localStorage.getItem('index') - 1; // Ensure index is zero-based
      if (index >= 0) {
        let recipeKey = `checkedSteps_${index}`;
        let checkedSteps = JSON.parse(localStorage.getItem(recipeKey)) || [];
        let progress = progressText.textContent;
        let prog = JSON.parse(localStorage.getItem('progress')) || [0, 0, 0, 0, 0];
        if (index < prog.length) {
          prog[index] = progress; // Update progress
          localStorage.setItem('progress', JSON.stringify(prog));
        }
      }
      window.location.href = 'index.html';
    });

    let main = document.getElementsByTagName('main')[0];
    let header = document.getElementsByTagName('header')[0];
    let progressText = document.getElementById('progress-text'); // Get the progress text element

    for (let [recipeIndex, recipe] of data.entries()) { // Use entries to get index
      // Check if the recipe ID matches the localStorage index
      if (recipe.id == localStorage.getItem('index')) {
        let h1 = document.createElement('h1');
        h1.classList.add('heading');
        h1.innerHTML = `Recipe for ${recipe.name}`;
        header.appendChild(h1);

        let recipeKey = `checkedSteps_${recipeIndex}`;
        let checkedSteps = JSON.parse(localStorage.getItem(recipeKey)) || [];

        for (let [stepIndex, st] of recipe.steps.entries()) {
          let step_div = document.createElement('div');
          let str = st.step;
          let temp = st.temp;
          let time = st.time;
          let checkboxId = `checkbox-${stepIndex}`;
          
          step_div.innerHTML = `
            <h3 class="step">${str}</h3>
            ${temp != -1 ? `<h3>Temp: ${temp}</h3>` : ''}
            ${time != -1 ? `<h3>Time: ${time}</h3>` : ''}
            <input type="checkbox" id="${checkboxId}" name="done" class="done-checkbox">
          `;
          step_div.classList.add('div');
          main.appendChild(step_div);

          // Set the checkbox state based on localStorage
          if (checkedSteps.includes(stepIndex)) {
            document.getElementById(checkboxId).checked = true;
          }
        }

        // Add the event listener to all checkboxes for progress update
        const checkboxes = document.querySelectorAll('.done-checkbox');
        const progressBar = document.getElementById('progress-bar');

        checkboxes.forEach((checkbox, idx) => {
          checkbox.addEventListener('change', () => {
            // Ensure that current checkbox is only checked if all previous are checked
            if (checkbox.checked) {
              const allPreviousChecked = Array.from(checkboxes)
                .slice(0, idx) // Get previous checkboxes
                .every(prevCheckbox => prevCheckbox.checked); // Check if all are checked

              if (!allPreviousChecked) {
                checkbox.checked = false; // Uncheck the checkbox if previous are not all checked
                alert('You must complete all previous steps before this one.');
                return;
              }
            }
            updateProgress(checkboxes, progressBar, progressText);
            saveCheckedSteps(recipeIndex); // Save checked steps state
          });
        });

        // Initialize progress
        updateProgress(checkboxes, progressBar, progressText);
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
  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }

  // Update the text in the progress text element
  if (progressText) {
    progressText.textContent = `${Math.round(progress)}%`;
  }
}

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
