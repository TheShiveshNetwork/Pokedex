import axios from "axios";

export const fetchPokemons = (setPokemons, setLoading, pageno, pokemons) => {
    setLoading(true)
    axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${pageno}&limit=20`)
        .then((response) => {
            setPokemons(response.data)
            setLoading(false)
        });
}

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