import React, { useEffect, useState } from 'react'
import { fetchPokemonAbout, fetchPokemonEvolution, fetchPokemonInfo } from '../api/FetchApi'
import Loading from './Loading'

const PokemonInfo = ({ selectedPokemon }) => {
    const [pokemonInfo, setPokemonInfo] = useState({})
    const [loadingInfo, setLoadingInfo] = useState(false)
    const [pokemonAbout, setPokemonAbout] = useState('')
    const [pokemonEvolution, setPokemonEvolution] = useState({})

    const id = selectedPokemon.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '')

    useEffect(() => {
        fetchPokemonInfo(selectedPokemon.url, setPokemonInfo, setLoadingInfo)
        fetchPokemonAbout(id, setPokemonAbout)
        fetchPokemonEvolution(id, setPokemonEvolution)
    }, [selectedPokemon])

    // console.log(pokemonInfo)
    console.log(pokemonEvolution)

    return !loadingInfo ?
        <div className='lg:w-[30vw] h-full fixed left-0 top-0 bg-gray-100 shadow-sm shadow-slate-300 px-6 py-6 overflow-y-scroll'>
            <div className='w-full flex flex-col gap-8 items-center justify-center '>
                <img
                    src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`}
                    alt="image"
                    className='w-[70%]'
                />
                <h1 className='capitalize text-3xl text-center'>{selectedPokemon.name}</h1>
            </div>

            <div className='flex flex-wrap w-full gap-4 justify-center my-3'>
                {pokemonInfo?.types?.map((type) => (
                    <div className={`pokemon-type type-${type.type.name}`} key={type.type.name}>
                        {type.type.name}
                    </div>
                ))}
            </div>

            <div className='text-center'>
                {pokemonAbout?.flavor_text?.replace('', ' ')}
            </div>

            <div className='flex gap-[14px] w-full flex-wrap text-center mt-8'>
                <div className='w-[calc(50%-7px)] flex items-center justify-center flex-col'>
                    <h3 className='text-lg font-medium'>Height</h3>
                    <div className='w-full text-center bg-slate-300 rounded-md py-2 mt-3'>
                        {pokemonInfo.height}m
                    </div>
                </div>
                <div className='w-[calc(50%-7px)] flex items-center justify-center flex-col'>
                    <h3 className='text-lg font-medium'>Weight</h3>
                    <div className='w-full text-center bg-slate-300 rounded-md py-2 mt-3'>
                        {pokemonInfo.weight}kg
                    </div>
                </div>
            </div>

            <div className='w-full text-center mt-8'>
                <h3 className='text-lg font-medium'>Abilities</h3>
                <div className='w-full flex flex-wrap gap-[14px]'>
                    {pokemonInfo?.abilities?.map((ability) => (
                        <div
                            key={ability.ability.name}
                            className='w-[calc(50%-7px)] capitalize text-center border-[3px] border-gray-300 rounded-full py-2 mt-3'
                        >
                            {ability.ability.name}
                        </div>
                    ))}
                </div>
            </div>

            <div className='mt-8 flex gap-[10px] flex-wrap'>
                {pokemonInfo?.stats?.map((stat) => (
                    <div className={`flex flex-col relative pokemon-stat stat-${stat.stat.name} ${stat.base_stat >= 100 ? `stat-${stat.stat.name}-meter` : ''}`} key={stat.stat.name}>
                        <div className='z-10'>
                            {stat.base_stat}%
                        </div>
                        <div className={`stat-${stat.stat.name}-meter absolute w-full bottom-0 left-0 rounded-bl-full rounded-br-full`} style={stat.base_stat > 70 ? { height: '70%' } : stat.base_stat > 30 ? { height: stat.base_stat + '%' } : {}} />
                    </div>
                ))}
            </div>
        </div>
        : <Loading />
}

export default PokemonInfo