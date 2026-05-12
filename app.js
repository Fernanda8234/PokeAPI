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

async function dados() {
    const pokemon = document.getElementById('pesquisar').value
    const dadosPokemon = await informacoesPokemon(pokemon)
    const dadosPokedex = await informacoesPokedex(pokemon)

    document.getElementById('imagem').src = dadosPokemon.sprites.front_default
    document.getElementById('nome').textContent = pokemon
    const pokedex = document.getElementById('numero_pokedex').textContent = dadosPokemon.id
    document.getElementById('tipagem').textContent = dadosPokemon.types.map(t => t.type.name).join('\n') // pra apacerer como lista 
    document.getElementById('habilidade').textContent = dadosPokemon.abilities.map(a => a.ability.name).join('\n') 
    document.getElementById('descricao').textContent = dadosPokedex.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text || 'Descrição não disponível'
    document.getElementById('regiao').textContent = dadosPokedex.pokedex_numbers.filter(p => p.pokedex.name !== 'national').sort((a,b) => a.entry_number - b.entry_number)[0]?.pokedex.name || 'Desconhecida' // ordem das regiões
    document.getElementById('geracao').textContent = dadosPokedex.generation.name

    const numero_pokedex = "#" + pokedex

    document.getElementById('numero_pokedex').innerText = numero_pokedex
}

 document.getElementById('pesquisar').addEventListener('keydown', (e) => {
     if (e.key === 'Enter') dados()
 })