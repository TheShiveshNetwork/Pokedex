import axios from "axios";

export const fetchPokemons = (setPokemons, setLoading) => {
    setLoading(true)
    axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1017')
    .then((response) => {
        setPokemons(response.data); // Append new data to existing data
        setLoading(false);
    })
};

export const fetchPokemonInfo = (url, setPokemonInfo, setLoadingInfo) => {
    setLoadingInfo(true);

    axios.get(url)
        .then((response) => {
            setPokemonInfo(response.data);
            setLoadingInfo(false);
        })
}

export const fetchPokemonAbout = (id, setPokemonAbout) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then((response) => {
            setPokemonAbout(response.data.flavor_text_entries
                .filter((item) => {
                    return item.language.name === 'en'
                })[0]
            )
        })
}

export const fetchPokemonEvolution = (id, setPokemonEvolution) => {
    axios.get(`https://pokeapi.co/api/v2/evolution-chain/${id}`)
        .then((response) => {
            setPokemonEvolution(response.data)
        })
}