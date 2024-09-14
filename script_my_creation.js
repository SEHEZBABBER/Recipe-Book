let main = document.getElementsByTagName('main')[0];
let recipediv = document.createElement('div');
recipediv.classList.add('add');


recipediv.innerHTML = `
  <img src="https://imgs.search.brave.com/DLIP5yc8F1fR4TLucE_p9kZb3S9dbvzd6fN8F2PBcag/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTY4/NDAzMzEyL3Bob3Rv/L3BsdXMtc3ltYm9s/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1kVUdJOGNwcGlX/WE1Xdm90VjBHd3BJ/aTlzQ3FsYlZrMzNp/cGExTTJiSkRzPQ" alt="add">
`;

// Append the recipe div to the main element
let div = document.createElement('div');
div.innerHTML = `<h2>${localStorage.name}</h2>`;
main.appendChild(recipediv);

// Add event listener to the recipe div
recipediv.addEventListener('click', function() {
  window.location.href = 'add.html';
});
let rec = document.getElementById('rec');
  let my = document.getElementById('my');
  rec.addEventListener('click', function(){
    window.location = 'index.html';
  });
  my.addEventListener('click',function(){
    window.location = 'my_creation.html';
  });
let names = JSON.parse(localStorage.getItem('name'));
for(let i = 0;i<names.length;i++){
    let obj = JSON.parse(localStorage.getItem(names[i]));
    let div = document.createElement('div');
    div.innerHTML = `<h1>${obj.name}</h1>`;
    div.classList.add('new_creation');
    div.classList.add('recipe');
    main.removeChild(recipediv);
    main.appendChild(div);
    main.appendChild(recipediv);
}
