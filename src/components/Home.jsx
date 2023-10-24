import React, { useEffect, useState } from 'react'
import { fetchPokemons } from '../api/FetchApi'
import PokemonCard from './PokemonCard'
import PokemonInfo from './PokemonInfo';
import Loading from './Loading';

const Home = () => {
    const [pokemons, setPokemons] = useState([]); // Initialize pokemons as an empty array
    const [search, setSearch] = useState('');
    const [openPokemonInfo, setOpenPokemonInfo] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState({});
    const [loading, setLoading] = useState(false);
    const [generation, setGeneration] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        fetchPokemons(setPokemons, setLoading, generation);
    }, [generation]);

    const filter = () => {
        setShowFilters(!showFilters);
        setGeneration('');
    }

    return !loading ?
        <>
            <div
            className={`xl:px-24 px-10 mt-8 py-4 sticky top-0 bg-white ${openPokemonInfo ? 'xl:pl-10 w-[70%] relative left-[30%]' : ''}`}
            >
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search"
                    className="outline-none w-full border-2 py-3 px-5 text-lg rounded-full"
                />
                <p className='text-lg cursor-pointer' onClick={filter}>Filters: {showFilters.toString()} </p>
                <div hidden={!showFilters}>
                <select
                    value={generation}
                    onChange={(e) => setGeneration(e.target.value)}
                    className="outline-none border-2 py-3 px-5 text-lg rounded-full cursor-pointer"
                >
                    <option value="0,1017">All Generations</option>
                    <option value="0,151">Generation 1</option>
                    <option value="151,100">Generation 2</option>
                    <option value="251,135">Generation 3</option>
                    <option value="386,107">Generation 4</option>
                    <option value="493,156">Generation 5</option>
                    <option value="649,72">Generation 6</option>
                    <option value="721,88">Generation 7</option>
                    <option value="809,96">Generation 8</option>
                    <option value="905,112">Generation 9</option>
                </select>
                </div>
            </div>

            <div
                className={
                    `grid gap-4 sm:grid-cols-2 xl:px-24 px-10 py-4 
                        ${openPokemonInfo ? 'lg:grid-cols-3 xl:pl-10 w-[70%] relative left-[30%]' : 'lg:grid-cols-4'}`
                }>
                {search
                    ? pokemons?.results
                        ?.filter((pokemon) => {
                            if (pokemon.name.toLowerCase().includes(search.toLowerCase())) return pokemon;
                        })
                        ?.filter((pokemon) => {
                            if (generation) {
                            const offset = generation.split(',')[0];
                            const limit = generation.split(',')[1];
                            const pokemonId = pokemon.url.split('/')[6];
                            return pokemonId > Number(offset) && pokemonId <= Number(offset) + Number(limit);
                            }
                            return true;
                        })
                        .map((pokemon, index) => (
                            <PokemonCard pokemon={pokemon} setOpenPokemonInfo={setOpenPokemonInfo} setSelectedPokemon={setSelectedPokemon} key={index} />
                        ))
                    : pokemons?.results
                        ?.filter((pokemon) => {
                            if (generation) {
                            const offset = generation.split(',')[0];
                            const limit = generation.split(',')[1];
                            const pokemonId = pokemon.url.split('/')[6];
                            return pokemonId > Number(offset) && pokemonId <= Number(offset) + Number(limit);
                            }
                            return true;
                        })
                        .map((pokemon, index) => (
                            <PokemonCard
                            pokemon={pokemon}
                            setOpenPokemonInfo={setOpenPokemonInfo}
                            setSelectedPokemon={setSelectedPokemon}
                            key={index}
                            />
                    ))}
            </div>

            {openPokemonInfo ? <PokemonInfo selectedPokemon={selectedPokemon} setInfoOpen={setOpenPokemonInfo} /> : <></>}
        </>
        : <Loading />
}

export default Home