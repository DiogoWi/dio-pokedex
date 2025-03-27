import { convertPokeApiDetailToPokemon } from "./poke-api.js";

const pokemonId = location.search.slice(1).split('=')[1];

const body = document.querySelector('body');

function getPokemon(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
        .then((pokemon) => {
            const dadosHtml = `
                <header class="${pokemon.type}">
                    <section>
                        <div>
                            <h1>${pokemon.name}</h1>
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>
                        </div>
                        <span>#${pokemon.number}</span>
                    </section>
                    <img src="${pokemon.photo}" alt="foto do ${pokemon.name}">
                </header>

                <section id="info">
                    <h2>Versão Shiny</h2>
                    <img src="${pokemon.photoShiny}" alt="foto do ${pokemon.name} shiny">
                </section>
            `;

            return dadosHtml;
        });
}

getPokemon(pokemonId).then((pokemon) => body.innerHTML = pokemon);