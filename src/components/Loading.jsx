import React from 'react'

const Loading = () => {
    return (
        <div className='h-full z-50 w-full fixed top-0 left-0 bg-white flex items-center justify-center'>
            <div className='h-20 w-20 animate-spin'>
                <img
                    src="/assets/pokeball.png"
                    className='h-full'
                    alt="image"
                />
            </div>
        </div>
    )
}

export default Loading