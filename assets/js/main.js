const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
            <div class="info">
                <ol class="types">
                <span>Tipo:</span>
                    ${pokemon.types
                      .map(
                        (type) => `
                    <li class="type ${type}">${type}</li>`
                      )
                      .join("")} 
                </ol>
                <ol class="more">
                <span>Habilidades: </span>
                ${pokemon.abilities
                    .map(
                      (ability) => `
                  <li ${ability}">• ${ability}</li>`
                    )
                    .join("")} 
                </ol>
                <ol class="more base">
                <li>Altura: ${pokemon.height} m</li>
                <li>Peso: ${pokemon.weight} kg</li>
                <li>Experiência base: ${pokemon.base_experience}</li>
                </ol>
            </div>
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
