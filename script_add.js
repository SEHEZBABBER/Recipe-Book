let btn = document.getElementsByClassName('add');
function funct()
{
    let step = document.createElement('div');
    step.innerHTML = `<input type="text" name="steps" id="steps" placeholder="Enter the directions to follow" class="step">
            <input type="text" name="temprature" id="temprature" placeholder="C" class="temp">
            <div>
            <i class="fa fa-clock-o"></i>
            <input type="text" name="time" id="time" placeholder="min" class="time">
            </div>
            <button class="add" type="button">add</button>`;
    step.classList.add('step_devison');
    let steps = document.getElementById('steps_div');
    console.log(steps);
    steps.appendChild(step);
    let newBtn = step.querySelector('.add');
    newBtn.addEventListener('click', function() {
        funct();
    });
}
btn[0].addEventListener('click',funct);
let form = document.getElementsByTagName('form');
form[0].addEventListener('submit',function(event){
    event.preventDefault();
    const name = document.getElementById('name').value;
    const step = document.getElementsByClassName('step');
    const temp = document.getElementsByClassName('temp');
    const time = document.getElementsByClassName('time');
    if(!name){
        alert('name cant be empty');
    }
    let arr = [];let tem = [];let tm = [];
    for(let i = 0;i<step.length;i++){
        arr.push(step[i].value);
        tem.push(temp[i].value);
        tm.push(time[i].value);
    }
    // console.log(arr);
    let obj = {"name":name,
        "steps":arr,
        "temp":tem,
        "time":tm
    };
    localStorage.setItem(obj.name,JSON.stringify(obj));
})