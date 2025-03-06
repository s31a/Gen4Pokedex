document.addEventListener("DOMContentLoaded", function () {
    let caughtPokemon = JSON.parse(localStorage.getItem("caughtPokemon")) || {};

    document.querySelectorAll(".pokemon").forEach(pokemon => {
        let pokeID = pokemon.querySelector("ID").textContent.replace("#", "");
        if (caughtPokemon[pokeID]) {
            pokemon.classList.add("Caught");
        }
        
        pokemon.addEventListener("click", function() {
            pokemon.classList.toggle("Caught");

            if (pokemon.classList.contains("Caught")) {
                caughtPokemon[pokeID] = true;
            } else {
                delete caughtPokemon[pokeID];
            }

            localStorage.setItem("caughtPokemon", JSON.stringify(caughtPokemon));
        })

    })
});