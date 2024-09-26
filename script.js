const API_URL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=9a7d50cbbc61493ab7f684d6bb8dc26a&query=";

document.getElementById("search-btn").addEventListener("click", searchRecipes);

async function searchRecipes() {
    const query = document.getElementById("search-input").value;
    const response = await fetch(API_URL + query);
    const data = await response.json();
    displayRecipes(data.results);
}

function displayRecipes(recipes) {
    const container = document.getElementById("recipes-container");
    container.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");
        recipeDiv.innerHTML = `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}">
            <button onclick="saveFavorite('${recipe.id}')">Guardar como Favorito</button>
        `;
        container.appendChild(recipeDiv);
    });
}

function saveFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(id)) {
        favorites.push(id);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert("Receta guardada como favorita.");
    } else {
        alert("Esta receta ya está en tus favoritos.");
    }
}
