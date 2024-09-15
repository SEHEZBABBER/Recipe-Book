let btn = document.getElementsByClassName('add');

function funct() {
    // Create a new div for the step
    let step = document.createElement('div');
    step.innerHTML = `
        <input type="text" name="steps" id="steps" placeholder="Enter the directions to follow" class="step">
        <input type="text" name="temprature" id="temprature" placeholder="C" class="temp">
        <div>
            <i class="fa fa-clock-o"></i>
            <input type="text" name="time" id="time" placeholder="min" class="time">
        </div>
        <button class="add" type="button">Add</button>
    `;
    step.classList.add('step_division');
    let steps = document.getElementById('steps_div');
    steps.appendChild(step);

    // Add event listener to the new button
    let newBtn = step.querySelector('.add');
    newBtn.addEventListener('click', function() {
        funct(); // Recursive function to allow adding more steps
    });
}

// Add event listener for the first add button
btn[0].addEventListener('click', funct);

let form = document.getElementsByTagName('form');

form[0].addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get values from the form
    const name = document.getElementById('name').value;
    const step = document.getElementsByClassName('step');
    const temp = document.getElementsByClassName('temp');
    const time = document.getElementsByClassName('time');
    
    // Check if name field is empty
    if (!name) {
        alert('Recipe name can\'t be empty');
        return; // Stop form submission if the name is empty
    }
    
    // Initialize arrays for steps, temp, and time
    let arr = [], tem = [], tm = [];
    
    // Check if there's a 'name' array in localStorage, if not initialize it
    let namee = JSON.parse(localStorage.getItem('name')) || [];
    namee.push(name);
    localStorage.setItem('name', JSON.stringify(namee));
    
    // Loop through the step, temp, and time fields and collect values
    for (let i = 0; i < step.length; i++) {
        arr.push(step[i].value);
        tem.push(temp[i].value);
        tm.push(time[i].value);
    }

    // Create an object to store the recipe data
    let obj = {
        "name": name,
        "steps": arr,
        "temp": tem,
        "time": tm
    };

    // Get current recipe index
    let recipeIndex = namee.length - 1; // Use the length of 'name' array as the index

    // Save the recipe in localStorage using the index as the key
    localStorage.setItem(`recipe_${recipeIndex}`, JSON.stringify(obj));

    // Redirect to 'my_creation.html' after submission
    window.location.href = 'my_creation.html';
});
