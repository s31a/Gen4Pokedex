async function fetchPokemonData() {
    const response = await fetch('./PokeInfo/jDex.json');
    const data = response.json();
    console.log(data)
    return data;
}

async function displayPokemon(start, end) {
    let pokedex = await document.getElementById("pokedex");
    const pokemonData = await fetchPokemonData();

    // Used to load pokemon
    let caughtPokemon = JSON.parse(localStorage.getItem("caughtPokemon")) || {};

    for (let i = start; i <= end; i += 30) {
        let box = document.createElement("div");
        box.className = "box";
        let boxHeader = document.createElement("h3");
        boxHeader.textContent = `Box ${1+((i-1)/30)}`
        box.appendChild(boxHeader);

        for (let j = i; j < i + 30 && j <= end; j++) {
            let pokeCard = document.createElement("div");
            pokeCard.className = "pokemon";
            let pokeImg = document.createElement("img");
            let pokeName = document.createElement("name");
            let pokeID = document.createElement("ID");
            
            let pokemon = pokemonData.find(p => parseInt(p.JID) == j);
            
            pokeImg.src = `./Sprites/${pokemon.ID}.png`;
            pokeName.textContent = pokemon.NAME;
            pokeID.textContent = "#" + pokemon.JID;
            
            if (caughtPokemon[pokemon.ID]) {
                pokeCard.classList.add("Caught");
            }

            pokeCard.addEventListener("click", function() {
                pokeCard.classList.toggle("Caught");

                if (pokeCard.classList.contains("Caught")) {
                    caughtPokemon[pokemon.ID] = true;
                } else {
                    delete caughtPokemon[pokemon.ID];
                }
            
                localStorage.setItem("caughtPokemon", JSON.stringify(caughtPokemon));
            });

            pokeCard.appendChild(pokeImg);
            pokeCard.appendChild(pokeName);
            pokeCard.appendChild(pokeID);
            box.appendChild(pokeCard);
        }
        pokedex.appendChild(box);
    }
}

displayPokemon(1, 256);