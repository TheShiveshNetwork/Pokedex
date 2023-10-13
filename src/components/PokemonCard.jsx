import React, { useEffect, useState } from 'react'

const PokemonCard = ({ pokemon, setOpenPokemonInfo, setSelectedPokemon }) => {
  const handleClick = () => {
    setOpenPokemonInfo(true)
    setSelectedPokemon(pokemon)
  }

  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const loadImage = async () => {
      const image = await fetch(`
        https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '')}.svg`)

      setImageLoaded(true)
    }

    loadImage()
  }, [pokemon])

  return (
    <div
      className={`bg-slate-100 cursor-pointer flex gap-4 flex-col justify-center p-4 rounded-md transition-all`}
      onClick={handleClick}
    >
      {imageLoaded ? (
        <div className='w-full h-28 flex items-center justify-center'>
          <img
            src={`
              https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '')}.svg`}
            className='h-full'
            alt="image"
          />
        </div>
      ) : (
        <div className='w-full h-28 flex items-center justify-center'>
          <div className='w-28 h-28 bg-slate-300 rounded-full' />
        </div>
      )}
      <h1 className='capitalize text-center font-medium text-[22px]'>{pokemon.name}</h1>
    </div>
  )
}

export default PokemonCard
