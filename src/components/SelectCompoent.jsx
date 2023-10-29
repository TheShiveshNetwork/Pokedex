import React, { useState } from 'react'

const SelectCompoent = ({ valueFor, value, setValue }) => {
    const [selectOptionClicked, setSelectOptionClicked] = useState(false);

    const handleSelectChange = (e) => {
        if (e.target.value) {
            setSelectOptionClicked(true);
        }
        setValue(e.target.value)
    }

    return (
        <select
            value={value}
            onChange={(e) => handleSelectChange(e)}
            // className={`outline-none border-2 py-1 px-5 text-md rounded-full cursor-pointer ${selectOptionClicked && 'bg-red-400'}`}
            className={`outline-none border-2 py-1 px-5 text-md rounded-full cursor-pointer`}
        >
            {
                valueFor === "generation" ?
                    <>
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
                    </>
                    : valueFor === "gameVersion" &&
                    <>
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
                    </>
            }

        </select>
    )
}

export default SelectCompoent