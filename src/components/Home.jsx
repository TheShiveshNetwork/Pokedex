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
    const [pageNumber, setPageNumber] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        fetchPokemons(setPokemons, setLoading, pageNumber,pokemons); // Don't need to pass the 'pokemons' array
    }, []);

    const fetchMorePokemons = () => {
        setPageNumber(pageNumber + 1);
        fetchPokemons((newData) => {
            setPokemons([...pokemons, ...newData]); // Append new data to existing data
            setLoading(false);
        }, setLoading, pageNumber,pokemons);
    };

   
    // Listen for scroll events and call fetchMorePokemons when reaching the bottom
    useEffect(() => {
        const handleScroll = () => {
            // console.log(window.scrollY)
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollY = window.scrollY;
            setScrollPosition(scrollY);
            console.log(documentHeight)

            // Set the threshold to halfway down the page
            const threshold = documentHeight / 2;

            if (windowHeight + scrollY >= threshold) {
                fetchMorePokemons();
            }
        };

        // Attach the scroll event listener
        window.addEventListener('scroll', handleScroll);

        return () => {
            // Remove the event listener when the component unmounts
            window.removeEventListener('scroll', handleScroll);
        };
    }, [pageNumber]);

    
    useEffect(() => {
        // Restore the scroll position when the data is loaded
        window.scrollTo(0, scrollPosition);
    }, [pokemons]); // Trigger when new data is loaded


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
                    pokemons?.filter(pokemon => {
                        if (pokemon.name.toLowerCase().includes(search.toLowerCase())) return pokemon
                    }).map((pokemon,index) => (
                        <PokemonCard pokemon={pokemon} setOpenPokemonInfo={setOpenPokemonInfo} setSelectedPokemon={setSelectedPokemon} key={index} />
                    ))
                    :
                    pokemons?.map((pokemon,index) => (
                        <PokemonCard pokemon={pokemon} setOpenPokemonInfo={setOpenPokemonInfo} setSelectedPokemon={setSelectedPokemon} key={index} />
                    ))}
            </div>

            {openPokemonInfo ? <PokemonInfo selectedPokemon={selectedPokemon} setInfoOpen={setOpenPokemonInfo} /> : <></>}
        </>
        : <Loading />
}

export default Home