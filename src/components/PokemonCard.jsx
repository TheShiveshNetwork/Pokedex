import React, { useEffect, useState } from 'react';
import { fetchPokemonInfo } from '../api/FetchApi';
import Loading from './Loading';

const PokemonCard = ({ pokemon, setOpenPokemonInfo, setSelectedPokemon }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleClick = () => {
        setOpenPokemonInfo(true);
        setSelectedPokemon(pokemon);
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    if (!pokemon) {
        return null; // Handle the case where 'pokemon' is not defined
    }

    return (
        <div
            className={`bg-slate-100 cursor-pointer flex gap-4 flex-col justify-center p-4 rounded-md transition-all`}
            onClick={handleClick}
        >
            <div className='w-full h-28 flex items-center justify-center'>
                {!imageLoaded ? (
                    <Loading />
                ) : (
                    <img
                        src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '')}.svg`}
                        className='h-full'
                        alt="image"
                        onLoad={handleImageLoad}
                    />
                )}
            </div>
            <h1 className='capitalize text-center font-medium text-[22px]'>{pokemon.name}</h1>
        </div>
    );
};

export default PokemonCard;
