const apiKey = "f621548388724d2f92ed07915191481f";
const id = 1003464;
const ingredientApi = `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${apiKey}`;
const allRecipes = `https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=${apiKey}`;
// const recipe = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;

const card_container = document.getElementById("card-container");
const searchBar = document.getElementById("searchBar");
const searchBtn = document
  .getElementById("searchBtn")
  .addEventListener("click", searchRecipeFunction);

const homeBtn = document
  .getElementById("homeBtn")
  .addEventListener("click", showRecipes);

//call showRecipes function to display recipes data when screen load.
showRecipes();

function showRecipes() {
  card_container.innerHTML = "";
  if (localStorage.getItem("Recipe") === null) {
    fetch(allRecipes)
      .then((response) => response.json())
      .then((data) => localStorage.setItem("Recipe", JSON.stringify(data)))
      .catch((error) => console.error(error));
  }
  getIngredient();
  // console.log(ingredient);
  let data = JSON.parse(localStorage.getItem("Recipe"));
  addCards(data);
}

//function to display cards on screen
function addCards(data) {
  data.results.forEach((element) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.id = element.id;

    card.innerHTML = ` 
    <img src="${element.image}" alt="Food Recipe Image">
    <div class="card-body">
      <h3 class="card-title">${element.title}</h3>
      <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris convallis libero augue, non aliquam odio pharetra non. Sed porttitor metus eget neque varius auctor. Nullam eu dui turpis.</p>
      <a href="#" class="btn btn-primary">View Recipe</a>
      </div>
      `;
    card_container.appendChild(card);
  });
}

//Function to display search recipes
async function searchRecipeFunction() {
  card_container.innerHTML = "";
  var search = searchBar.value.toLowerCase();
  const searchRecipe = `https://api.spoonacular.com/recipes/complexSearch?number=100&query=${search}&apiKey=${apiKey}`;
  if (localStorage.getItem(search) === null) {
    await fetch(searchRecipe)
      .then((response) => response.json())
      .then((data) => localStorage.setItem(search, JSON.stringify(data)))
      .catch((error) => console.error(error));
  }

  let data = JSON.parse(localStorage.getItem(search));
  console.log(data);
  card_container.innerHTML = "";

  addCards(data);
}



function getIngredient(){
  let getData = {};
  fetch(ingredientApi)
    .then((response) => response.json())
    .then((data) => {for (let index = 0; index < data.ingredients.length; index++) {
      console.log(data.ingredients[index].name);
      
    }
      
    })
    .catch((error) => console.error(error));
    
}