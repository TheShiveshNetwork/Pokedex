import React, { useEffect, useState } from 'react'
import { fetchPokemons } from '../api/FetchApi'
import PokemonCard from './PokemonCard'
import PokemonInfo from './PokemonInfo';

const Home = () => {
    const [pokemons, setPokemons] = useState({});
    const [search, setSearch] = useState('');
    const [openPokemonInfo, setOpenPokemonInfo] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchPokemons(setPokemons, setLoading)
    }, [])

    return !loading ?
        <>
            <div
                className={
                    `xl:px-24 px-10 mt-8 py-4 sticky top-0 bg-white ${openPokemonInfo ? 'xl:pl-10 w-[70%] relative left-[30%]' : ''}`
                }>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder='Search'
                    className='outline-none w-full border-2 py-3 px-5 text-lg rounded-full'
                />
            </div>

            <div
                className={
                    `grid gap-4 sm:grid-cols-2 xl:px-24 px-10 py-4 
                        ${openPokemonInfo ? 'lg:grid-cols-3 xl:pl-10 w-[70%] relative left-[30%]' : 'lg:grid-cols-4'}`
                }>
                {search ?
                    <></> :
                    pokemons?.results?.map((pokemon) => (
                        <PokemonCard pokemon={pokemon} setOpenPokemonInfo={setOpenPokemonInfo} setSelectedPokemon={setSelectedPokemon} key={pokemon.url} />
                    ))}
            </div>

            {openPokemonInfo ? <PokemonInfo selectedPokemon={selectedPokemon} /> : <></>}
        </>
        : <>Loading...</>
}

export default Home