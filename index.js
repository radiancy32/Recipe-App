const searchbox = document.querySelector(".searchbox");
const searchbutton = document.querySelector(".searchbutton");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");

//funtion to get recipes
const fetchRecipe = async (querry) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>"
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${querry}`);
    const response = await data.json();
    
    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `
        const button = document.createElement('button');
        button.textContent ="View Recipe";
        recipeDiv.appendChild(button);

        //Adding EventListener to recipe button
        button.addEventListener('click', () => {
            openRecipePopup(meal);
        })
        recipeContainer.appendChild(recipeDiv);
    })
    
}

//function to fetch ingredients
const fetchIngredents = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure}${ingredient}</li>`;
        }
        else{
            break;
        }
    }
    return ingredientsList;
}
//function to open recipe popup
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML =`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents: </h3>
    <ul class="ingredientList">${fetchIngredents(meal)}</ul>
    <div class= "recipeInstructions">
         <h3>Instructions: </h3>
         <p >${meal.strInstructions}</p>
     </div>
    `
    recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
});

searchbutton.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInput = searchbox.value.trim();
    fetchRecipe(searchInput);
//    console.log("Button clicked");
})