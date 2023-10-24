import React, { useEffect, useState, useRef } from 'react'

const PokemonCard = ({ pokemon, setOpenPokemonInfo, setSelectedPokemon }) => {
  const handleClick = () => {
    setOpenPokemonInfo(true)
    setSelectedPokemon(pokemon)
  }

  const [imageLoaded, setImageLoaded] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if(entry.isIntersecting) {
          const img = new Image()
          img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png`
          img.onload = () => {
            setImageLoaded(true)
          }
          try{
            observer.unobserve(ref.current)
          } catch(err) {
            console.log(err)
          }
        }
      },
      {threshold: 0.5}
    )
    if(ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if(ref.current) {
        try{
          observer.unobserve(ref.current)
        } catch(err) {
          console.log(err)
        }
      }
    }
  }, [pokemon])

  return (
    <div
      ref={ref}
      className={`bg-slate-200 hover:bg-slate-300/30 cursor-pointer flex gap-4 flex-col justify-center p-4 rounded-md shadow-lg border-slate-300 border-2 transition-all`}
      onClick={handleClick}
    >
      {imageLoaded ? (
        <div className='w-full h-28 flex items-center justify-center'>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png`}
            className='h-full'
            alt="image"
          />
        </div>
      ) : (
        <div className='w-full h-28 flex items-center justify-center'>
          <img
            src="/assets/pokeball.png"
            className='h-full'
            alt="image"
          />
        </div>
      )}
      <h1 className='capitalize text-center font-medium text-[25px]'>{pokemon.name}</h1>
    </div>
  )
}

export default PokemonCard