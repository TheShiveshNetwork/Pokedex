import axios from "axios";

export const fetchPokemons = (setPokemons, setLoading, pageno, prevData) => {
    setLoading(true);

    axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${pageno}&limit=20`)
        .then((response) => {
            const newData = response.data.results;
            setPokemons([...prevData, ...newData]); // Append new data to existing data
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });
};


// export const fetchPokemons = async (setLoading, pageno) => {
//     setLoading(true)
//     const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${pageno}&limit=20`)
//         .then((response) => {
//             setLoading(false)
//             return response.data;
//         });
//     return response;
// }

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