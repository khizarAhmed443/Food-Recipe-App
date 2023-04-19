const apiKey = "a2de8100073f49a382d99d5dc12e3062";
const allRecipes = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;
let checkrecipe = document.getElementsByClassName("card");

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

async function showRecipes() {
  //null the cards div innerhtml
  card_container.innerHTML = "";

  //check if api hit already than not hit again
  if (localStorage.getItem("Recipes") === null) {
    //   // fetch all recipes
    await fetch(allRecipes)
      .then((response) => response.json())
      .then((data) => localStorage.setItem("Recipes", JSON.stringify(data)))
      .catch((error) => console.error(error));
  }
  // get data that store in local storage geting from API
  let data = JSON.parse(localStorage.getItem("Recipes"));
  addCards(data);
}
async function addIngredients(data, localStorageName) {
  if (localStorage.getItem(localStorageName) === null) {
    for (let index = 0; index < data.results.length; index++) {
      let element = data.results;

      const ingredientApi = `https://api.spoonacular.com/recipes/${element.id}/ingredientWidget.json?apiKey=${apiKey}&number=10`;
      await fetch(ingredientApi)
        .then((response) => response.json())
        .then((data) =>
          localStorage.setItem(element.title, JSON.stringify(data))
        )
        .catch((error) => console.error(error));

      //get ingredients data store in local storage of specific id
      let ingredentsarray = [];
      let ingredentsdata = JSON.parse(localStorage.getItem(element.title));
      for (let index = 0; index < ingredentsdata.ingredients.length; index++) {
        //object to store ingredients
        let ingredents = {};
        //get required items from api and store in ingredients hash table/object
        ingredents.name = ingredentsdata.ingredients[index].name;
        if (ingredentsdata.ingredients[index].amount.metric.unit == "") {
          ingredents.unit = "qty";
        } else {
          ingredents.unit =
            ingredentsdata.ingredients[index].amount.metric.unit;
        }
        ingredents.amount =
          ingredentsdata.ingredients[index].amount.metric.value;
        //add items objects to array of items/ingredients
        ingredentsarray.push(ingredents);
      }

      //add ingredients data into recipes data
      element.ingredients = [];

      element.ingredients = ingredentsarray;
    }

    localStorage.setItem(localStorageName, JSON.stringify(data));
  }
  let Sdata = JSON.parse(localStorage.getItem(localStorageName));
  addCards(Sdata);
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
      
      </div>
      `;
    card_container.appendChild(card);
  });
}

// Function to display search recipes
async function searchRecipeFunction() {
  card_container.innerHTML = "";
  var search = searchBar.value.toLowerCase();

  if (localStorage.getItem("search") === null) {
    const searchRecipe = `https://api.spoonacular.com/recipes/complexSearch?number=10&query=${search}&apiKey=${apiKey}`;
    await fetch(searchRecipe)
      .then((response) => response.json())
      .then((data) => localStorage.setItem(search, JSON.stringify(data)))
      .catch((error) => console.error(error));
  }
  let Sdata = JSON.parse(localStorage.getItem(search));
  addCards(Sdata);
}

// checkrecipe is object that is being converted into array
var array = Array.from(checkrecipe);
array.forEach(function (elem) {
  elem.addEventListener("click", () => {
    showrecipe(elem.id);
  });
});


async function showrecipe(id) {
  let card = document.getElementById("recipe-card-body");
  card.innerHTML = "";
  document.getElementById("recipe-card-container").style.display = "flex";
  var recipe = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
  if (localStorage.getItem(id) === null) {
    await fetch(recipe)
      .then((response) => response.json())
      .then((data) => localStorage.setItem(id, JSON.stringify(data)))
      .catch((error) => console.error(error));
  }

  var recipedata = JSON.parse(localStorage.getItem(id));
  // analyzedInstructions

  var allSteps = recipedata.analyzedInstructions[0].steps;
  allSteps.forEach(function (elem) {
    card.innerHTML += `<p> ${elem.step}</p>`;
  });
}
// Function to hide the card
function hideCard() {
  document.getElementById("recipe-card-container").style.display = "none";
}

{
  /*  <div>
 <h3 style="text-align:center">Ingredients</h3>
<table id="myTable"style="text-align:left" ><thead><tr><th>Name</th><th>Volume</th><th>Unit</th></tr></thead><tbody> ${element.ingredients
  .map(function (item) {
    return (
      "<tr><td>" +
      item.name +
      "</td><td>" +
      item.amount +
      "</td><td>" +
      item.unit +
      "</td></tr>"
    );
  })
  .join("")} </tbody></table>
  </div> */
}
