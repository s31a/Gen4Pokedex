async function fetchPokemonData() {
    const response = await fetch('info.json');
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
            
            let pokemon = pokemonData.find(p => parseInt(p.id) == j);
            
            pokeImg.src = `./Sprites/${pokemon.id}.png`;
            pokeName.textContent = pokemon.name;
            pokeID.textContent = "#" + pokemon.id;
            
            if (caughtPokemon[pokemon.id]) {
                pokeCard.classList.add("Caught");
            }

            pokeCard.addEventListener("click", function() {
                pokeCard.classList.toggle("Caught");

                if (pokeCard.classList.contains("Caught")) {
                    caughtPokemon[pokemon.id] = true;
                } else {
                    delete caughtPokemon[pokemon.id];
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

displayPokemon(1, 492);