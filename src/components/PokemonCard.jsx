import React, { useEffect, useState, useRef } from 'react'

const PokemonCard = ({ pokemon, setOpenPokemonInfo, setSelectedPokemon }) => {
  const handleClick = () => {
    setOpenPokemonInfo(true)
    setSelectedPokemon(pokemon)
  }

  const [imageLoaded, setImageLoaded] = useState(false)
  const [pokeArtwork, setPokeArtwork] = useState('other/official-artwork')
  const [theme, setTheme] = useState(''); // default or gameboy

  useEffect(() => {
    const themeSel = document.getElementById('themeSel');

    if (themeSel.value === 'gameboy') {
      setTheme('gameboy');
    } else if (themeSel.value === 'home') {
      setTheme('home');
    } else {
      setTheme('');
    }
  }, []);


  const ref = useRef(null)

  useEffect(() => {
    if(document.getElementById('themeSel').value === 'gameboy') {
      setPokeArtwork('')
    } else if (document.getElementById('themeSel').value === 'home') {
      setPokeArtwork('other/home')
    } else {
      setPokeArtwork('other/official-artwork')
    }
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if(entry.isIntersecting) {
          const img = new Image()
          img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeArtwork}/${pokemon.url.split('/')[6]}.png`
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

  const themeSelElement = document.getElementById('themeSel');
  let pokemonCardDivClass = 'bg-slate-200 border-slate-300';
  if(themeSelElement && themeSelElement.value === 'gameboy') {
    pokemonCardDivClass = 'bg-gameboy-border border-gameboy-card';
  } else if (themeSelElement && themeSelElement.value === 'home') {
    pokemonCardDivClass = 'bg-home-card shadow-slate-200';
  } else {
    pokemonCardDivClass = 'bg-slate-200 border-slate-300';
  }

  return (
    <div
      ref={ref}
      className={`hover:bg-slate-300/30 cursor-pointer flex gap-4 flex-col justify-center p-4 rounded-md shadow-lg border-2 transition-all transform hover:scale-105 
      dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 dark:hover:bg-opacity-30 dark:hover:border-slate-600 dark:text-slate-50 ${pokemonCardDivClass}`}
      onClick={handleClick}
    >
      {imageLoaded ? (
        <div className='w-full h-28 flex items-center justify-center'>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeArtwork}/${pokemon.url.split('/')[6]}.png`}
            className='h-full'
            alt="image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/pokeball.png";
            }}
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