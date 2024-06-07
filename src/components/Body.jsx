import React from 'react'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

export const Body = () => {
    const navigate=useNavigate();
    return(
        <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url('https://images.pexels.com/photos/3768005/pexels-photo-3768005.jpeg')` }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Step into Fashion at Your Ultimate Style Destination!</h1>
                <p className="text-lg md:text-2xl mb-8">Explore a World of Fashion Possibilities with Exclusive Discounts - Dive into Your Ultimate Style Destination and Elevate Your Wardrobe Today!</p>
                <div>
                    <Button label={"Shop Now"} onClickHandler={()=>{navigate("/products")}}/>
                </div>
            </div>
        </div>
    )

}