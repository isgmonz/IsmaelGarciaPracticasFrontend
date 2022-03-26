// Elementos del DOM
const pokemonData = document.getElementById("pokemon-data");
const button = document.getElementById("button");
const input = document.getElementById("input");
const img = document.getElementById("img");

// Caracteristicas
const pokeName = document.getElementById("poke-name");
const pokeType = document.getElementById("poke-type");
const pokeId = document.getElementById("poke-id");
const pokeHeight = document.getElementById("poke-height");
const pokeWeight = document.getElementById("poke-weight");

// Estadisticas
const PokeHp = document.getElementById("hp");
const PokeAtk = document.getElementById("atk");
const PokeDef = document.getElementById("def");
const PokeSatk = document.getElementById("satk");
const PokeSdef = document.getElementById("sdef");
const PokeSpd = document.getElementById("spd");

// Movimientos
const PokeMoves = document.getElementById("moves-list");

button.onclick = () => {
  let pokeName = input.value.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

  fetch(url)
    .then((res) => {
      if (res.status != "200") {
        printPokeImage("assets/error.png");
        clean();
      }

      return res.json();
    })
    .then((data) => {
      if (pokeName !== "") {
        printPokeImage(data.sprites.front_default);
        printPokeFeatures(data);
        printPokeStats(data);
        printPokeMoves(data);
      }
    });
};

// Imprimir características del pokemon
const printPokeFeatures = (data) => {
  pokeName.innerText = data.name.toUpperCase();
  pokeType.innerText = "";

  for (let i = 0; i < data.types.length; i++) {
    const type = document.createElement("span");
    type.classList.add("pokemon__type");
    pokeType.appendChild(type);

    type.innerText = data.types[i].type.name;
  }

  pokeId.innerText = data.id;
  pokeHeight.innerText = data.height;
  pokeWeight.innerText = data.weight;
};

// Imprimir las estadísticas del pokemon
const printPokeStats = (data) => {
  PokeHp.innerText = data.stats[0].base_stat;
  PokeAtk.innerText = data.stats[1].base_stat;
  PokeDef.innerText = data.stats[2].base_stat;
  PokeSatk.innerText = data.stats[3].base_stat;
  PokeSdef.innerText = data.stats[4].base_stat;
  PokeSpd.innerText = data.stats[5].base_stat;
};

const printPokeMoves = (data) => {
  let moves = data.moves;
  PokeMoves.innerHTML = "";

  moves.forEach((element) => {
    const move = document.createElement("li");
    PokeMoves.appendChild(move);
    move.innerText = element.move.name;
  });
};

const printPokeImage = (url) => {
  img.src = url;
};

const clean = () => {
  pokeName.innerText = "Nombre";
  pokeId.innerText = "";
  pokeType.innerText = "";
  pokeHeight.innerText = "";
  pokeWeight.innerText = "";
  PokeMoves.innerHTML = "";
  PokeHp.innerText = "-";
  PokeAtk.innerText = "-";
  PokeDef.innerText = "-";
  PokeSatk.innerText = "-";
  PokeSdef.innerText = "-";
  PokeSpd.innerText = "-";
};
