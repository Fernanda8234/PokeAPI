'use strict'

async function informacoesPokemon(nome) {
    const url = `https://pokeapi.co/api/v2/pokemon/${nome}`
    const response = await fetch(url)
    const data     = await response.json()
    return data
}

async function informacoesPokedex(pokedex) {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${pokedex}/`
    const response = await fetch(url)
    const dados    = await response.json()
    return dados
}

function traduzirTipo(tipo) {
    const tipos = {
        normal: "Normal",
        fire: "Fogo",
        water: "Água",
        electric: "Elétrico",
        grass: "Planta",
        ice: "Gelo",
        fighting: "Lutador",
        poison: "Veneno",
        ground: "Terrestre",
        flying: "Voador",
        psychic: "Psíquico",
        bug: "Inseto",
        rock: "Pedra",
        ghost: "Fantasma",
        dragon: "Dragão",
        dark: "Sombrio",
        steel: "Metálico",
        fairy: "Fada"
    }

    return tipos[tipo]
}

function corTipagem(types) {
    const coresTipos = {
        normal: "#A8A77A",
        fire: "#EE8130",
        water: "#6390F0",
        electric: "#F7D02C",
        grass: "#7AC74C",
        ice: "#96D9D6",
        fighting: "#C22E28",
        poison: "#A33EA1",
        ground: "#E2BF65",
        flying: "#A98FF3",
        psychic: "#F95587",
        bug: "#A6B91A",
        rock: "#B6A136",
        ghost: "#735797",
        dragon: "#6F35FC",
        dark: "#705746",
        steel: "#B7B7CE",
        fairy: "#D685AD"
    }

    const elementoTipagem = document.getElementById('tipagem')

    elementoTipagem.innerHTML = "" // para não misturar com outros pokémons

    types.forEach(tipo => {
        const nomeTipo = tipo.type.name

        const tipoElemento = document.createElement("p")

        tipoElemento.textContent = traduzirTipo(nomeTipo)
        tipoElemento.style.color = coresTipos[nomeTipo]

        elementoTipagem.appendChild(tipoElemento)
    })
}

function regiao(dadosPokedex) {
    const regioes = {
        "kanto": "Kanto",
        "original-johto": "Johto",
        "updated-johto": "Johto",
        "hoenn": "Hoenn",
        "original-sinnoh": "Sinnoh",
        "extended-sinnoh": "Sinnoh",
        "original-unova": "Unova",
        "updated-unova": "Unova",
        "kalos-central": "Kalos Central",
        "kalos-coastal": "Kalos Costeira",
        "kalos-mountain": "Kalos Montanhosa",
        "original-alola": "Alola",
        "updated-alola": "Alola",
        "melemele": "Ilha Melemele",
        "akala": "Ilha Akala",
        "ula-ula": "Ilha Ula-Ula",
        "poni": "Ilha Poni",
        "galar": "Galar",
        "isle-of-armor": "Ilha da Armadura",
        "crown-tundra": "Coroa da Tundra",
        "hisui": "Hisui",
        "paldea": "Paldea",
        "kitakami": "Kitakami",
        "blueberry": "Academia Blueberry"
    }

    const ordemRegioes = {
        "kanto": 1,
        "original-johto": 2,
        "updated-johto": 2,
        "hoenn": 3,
        "original-sinnoh": 4,
        "extended-sinnoh": 4,
        "original-unova": 5,
        "updated-unova": 5,
        "kalos-central": 6,
        "kalos-coastal": 6,
        "kalos-mountain": 6,
        "original-alola": 7,
        "updated-alola": 7,
        "melemele": 7,
        "akala": 7,
        "ula-ula": 7,
        "poni": 7,
        "galar": 8,
        "isle-of-armor": 8,
        "crown-tundra": 8,
        "hisui": 9,
        "paldea": 10,
        "kitakami": 10,
        "blueberry": 10
    }

    const nomeRegiao = dadosPokedex.pokedex_numbers.filter(p => p.pokedex.name !== 'national').sort((a, b) => ordemRegioes[a.pokedex.name] - ordemRegioes[b.pokedex.name])[0]?.pokedex.name

    return regioes[nomeRegiao] // formatação da região
}

function geracao(generation) {
    const geracoes = {
        "generation-i": "1ª Geração",
        "generation-ii": "2ª Geração",
        "generation-iii": "3ª Geração",
        "generation-iv": "4ª Geração",
        "generation-v": "5ª Geração",
        "generation-vi": "6ª Geração",
        "generation-vii": "7ª Geração",
        "generation-viii": "8ª Geração",
        "generation-ix": "9ª Geração"
    }   

    return geracoes[generation] // formatação da geração
}

async function dados() {
    let pokemon = document.getElementById('pesquisar').value.trim()

    if (!isNaN(pokemon)) {
        pokemon = Number(pokemon) // para aparecer o nome de vez o número da dex
    }

    const dadosPokemon = await informacoesPokemon(pokemon)
    const dadosPokedex = await informacoesPokedex(pokemon)

    document.getElementById('destaque').style.display = 'none' // é apenas para quando a pagina é aberta

    document.getElementById('imagem').src = dadosPokemon.sprites.front_default
    document.getElementById('nome').textContent = dadosPokemon.name

    const numeroPokedex = "#" + String(dadosPokemon.id).padStart(3, "0") // para espaços vazios
    document.getElementById('numero_pokedex').textContent = numeroPokedex

    corTipagem(dadosPokemon.types) // cor das tipagens

    document.getElementById('habilidade').textContent = dadosPokemon.abilities.map(a => a.ability.name).join('\n')

    document.getElementById('descricao').textContent = dadosPokedex.flavor_text_entries.find(e => e.language.name === 'en')?.flavor_text || 'Descrição não disponível' // descrição apenas em inglês

    const nomeRegiao = dadosPokedex.pokedex_numbers.filter(p => p.pokedex.name !== 'national').sort((a, b) => a.entry_number - b.entry_number)[0]?.pokedex.name // filtro e ordem da região
    document.getElementById('regiao').textContent = regiao(dadosPokedex)
   
    document.getElementById('geracao').textContent = geracao(dadosPokedex.generation.name) // geração

    document.getElementById('pesquisar').value = ""
}

function pokemonEstatico() {
    document.getElementById('pesquisar').value = 778
    dados()
    document.getElementById('pesquisar').value = "" // para limpar ao carregar
}

// carrega com a pagina :)
window.onload = function () {
    pokemonEstatico()
}

document.getElementById('pesquisar').addEventListener('keydown', (e) => {
     if (e.key === 'Enter') dados()
 })