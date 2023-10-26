import React, { useEffect, useState } from 'react'
import { fetchPokemons } from '../api/FetchApi'
import PokemonCard from './PokemonCard'
import PokemonInfo from './PokemonInfo';
import Loading from './Loading';

import kantoData from './version-data.json';

const Home = () => {
    const [pokemons, setPokemons] = useState([]); // Initialize pokemons as an empty array
    const [search, setSearch] = useState('');
    const [openPokemonInfo, setOpenPokemonInfo] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState({});
    const [loading, setLoading] = useState(false);
    const [generation, setGeneration] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [gameVersion, setGameVersion] = useState('');

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
                    className="outline-none border-2 py-3 px-5 text-lg mr-5 rounded-full cursor-pointer"
                >
                    <option value="">All Generations</option>
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

                <select
                    value={gameVersion}
                    onChange={(e) => setGameVersion(e.target.value)}
                    className="outline-none border-2 py-3 px-5 text-lg rounded-full cursor-pointer"
                >
                    <option value="">All Versions</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="yellow">Yellow</option>
                    <option value="gold">Gold</option>
                    <option value="silver">Silver</option>
                    <option value="crystal">Crystal</option>
                    <option value="ruby">Ruby</option>
                    <option value="sapphire">Sapphire</option>
                    <option value="emerald">Emerald</option>
                    <option value="firered">Fire Red</option>
                    <option value="leafgreen">Leaf Green</option>
                    <option value="diamond">Diamond</option>
                    <option value="pearl">Pearl</option>
                    <option value="platinum">Platinum</option>
                    <option value="heartgold">Heart Gold</option>
                    <option value="soulsilver">Soul Silver</option>
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="black-2">Black 2</option>
                    <option value="white-2">White 2</option>
                    <option value="x">X</option>
                    <option value="y">Y</option>
                    <option value="omega-ruby">Omega Ruby</option>
                    <option value="alpha-sapphire">Alpha Sapphire</option>
                    <option value="sun">Sun</option>
                    <option value="moon">Moon</option>
                    <option value="ultra-sun">Ultra Sun</option>
                    <option value="ultra-moon">Ultra Moon</option>
                    <option value="lets-go-pikachu">Let's Go Pikachu</option>
                    <option value="lets-go-eevee">Let's Go Eevee</option>
                    <option value="sword">Sword</option>
                    <option value="shield">Shield</option>
                    <option value="legends-arceus">Legends Arceus</option>
                    <option value="scarlet">Scarlet</option>
                    <option value="violet">Violet</option>
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
                        ?.filter((pokemon) => {
                            if (gameVersion) {
                                const pokemonId = pokemon.url.split('/')[6];
                                return kantoData[gameVersion].Pokemon.some((kantoPokemon) => kantoPokemon.url === pokemonId);
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
                        ?.filter((pokemon) => {
                            if (gameVersion) {
                                const pokemonId = pokemon.url.split('/')[6];
                                if(kantoData[gameVersion].Pokemon.some((kantoPokemon) => kantoPokemon.url === pokemonId)) console.log(true)
                                return kantoData[gameVersion].Pokemon.some((kantoPokemon) => kantoPokemon.url === pokemonId);
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