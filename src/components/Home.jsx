import React, { useEffect, useState } from 'react'
import { fetchPokemons } from '../api/FetchApi'
import PokemonCard from './PokemonCard'
import PokemonInfo from './PokemonInfo';
import Loading from './Loading';

const Home = () => {
    const [pokemons, setPokemons] = useState({});
    const [search, setSearch] = useState('');
    const [openPokemonInfo, setOpenPokemonInfo] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState({})
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0); // Track the current page

    useEffect(() => {
        fetchPokemons(setPokemons, setLoading, page)
    }, [])

    // Function to fetch more Pokémon data when scrolling to the bottom
    const fetchMorePokemons = () => {
        // Fetch more data based on the current page
        fetchPokemons(setPokemons, setLoading, page + 1);
        setPage(page + 1);
    };

    // Listen for scroll events and call fetchMorePokemons when reaching the bottom
    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollY = window.scrollY;

            // Adjust the value 'your_threshold_here' to control when to load more data
            if (windowHeight + scrollY >= documentHeight - 0.9) {
                fetchMorePokemons();
            }
        };

        // Attach the scroll event listener
        window.addEventListener('scroll', handleScroll);

        return () => {
            // Remove the event listener when the component unmounts
            window.removeEventListener('scroll', handleScroll);
        };
    }, [page]);

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
                    pokemons?.results?.filter(pokemon => {
                        if (pokemon.name.toLowerCase().includes(search.toLowerCase())) return pokemon
                    }).map((pokemon) => (
                        <PokemonCard pokemon={pokemon} setOpenPokemonInfo={setOpenPokemonInfo} setSelectedPokemon={setSelectedPokemon} key={pokemon.url} />
                    ))
                    :
                    pokemons?.results?.map((pokemon) => (
                        <PokemonCard pokemon={pokemon} setOpenPokemonInfo={setOpenPokemonInfo} setSelectedPokemon={setSelectedPokemon} key={pokemon.url} />
                    ))}
            </div>

            {openPokemonInfo ? <PokemonInfo selectedPokemon={selectedPokemon} setInfoOpen={setOpenPokemonInfo} /> : <></>}
        </>
        : <Loading />
}

export default Home