let selectedRecipeIndex = localStorage.getItem('selectedRecipeIndex');
let recipe = JSON.parse(localStorage.getItem(`recipe_${selectedRecipeIndex}`));
console.log(recipe);