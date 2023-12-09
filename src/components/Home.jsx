import React, { useEffect, useState } from 'react'
import { fetchPokemons } from '../api/FetchApi'
import PokemonCard from './PokemonCard'
import PokemonInfo from './PokemonInfo';
import Loading from './Loading';

import VersionData from './data/version-data.json';
import SelectCompoent from './SelectCompoent';

const Home = () => {
    const [pokemons, setPokemons] = useState([]); // Initialize pokemons as an empty array
    const [search, setSearch] = useState('');
    const [openPokemonInfo, setOpenPokemonInfo] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState({});
    const [loading, setLoading] = useState(false);
    const [generation, setGeneration] = useState('');
    const [gameVersion, setGameVersion] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark', 'bg-slate-900', 'text-slate-50');
          } else {
            document.documentElement.classList.remove('dark', 'bg-slate-900', 'text-slate-50');
          }
    }, [isDarkMode]);

    useEffect(() => {
        fetchPokemons(setPokemons, setLoading, generation);
    }, [generation]);

    const filter = () => {
        setGeneration('');
        setGameVersion('');
    }

    return !loading ?
        <>
            <div
                className={
                    `xl:px-24 px-10 mt-8 py-4 sticky top-0 bg-white dark:bg-slate-900 ${openPokemonInfo ? 'xl:pl-10 w-[70%] relative left-[30%]' : ''}`
                }>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search"
                    className='outline-none w-full border-2 py-3 px-5 text-lg rounded-full 
                    dark:bg-slate-800 dark:text-slate-50'
                />

                <div className='flex justify-center flex-col md:flex-row md:justify-end gap-3 mt-3'>
                    <SelectCompoent
                        valueFor={"generation"}
                        value={generation}
                        setValue={setGeneration}
                    />
                    <SelectCompoent
                        valueFor={"gameVersion"}
                        value={gameVersion}
                        setValue={setGameVersion}
                    />
                    <button onClick={toggleDarkMode} className='text-xl mg-5'>
                        {isDarkMode ? `☀` : `🌕`}
                    </button> 
                </div>
            </div>

            <div
                className={
                    `grid gap-4 sm:grid-cols-2 xl:px-24 px-10 py-4 dark:bg-slate-900 
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
                                return VersionData[gameVersion].Pokemon.some((kantoPokemon) => kantoPokemon.url === pokemonId);
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
                                return VersionData[gameVersion].Pokemon.some((kantoPokemon) => kantoPokemon.url === pokemonId);
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