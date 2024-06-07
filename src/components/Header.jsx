import React from 'react';
import { Link } from 'react-router-dom';
import { Cart } from './Cart';

export const Header = () => {
  return (
    <div className=' flex justify-center border-b border-solid border-gray-600'>
        <div className='container flex justify-between gap-5 p-5'>
            <div className='p-2'>
                <img src='../../header.svg'/>
            </div>
            <div className='p-2'>
                <ul className='flex flex-wrap gap-5'>
                    <li className=' hover:text-gray-900 hover:font-bold'><Link to={"/"}>Home</Link></li>
                    <li className=' hover:text-gray-900 hover:font-bold'><Link to={"/products"}>Shop</Link></li>
                    <li className=' hover:text-gray-900 hover:font-bold'><Link to={`/products/women`}>Women</Link></li>
                    <li className=' hover:text-gray-900 hover:font-bold'><Link to={`/products/men`}>Men</Link></li>
                    <li className=' hover:text-gray-900 hover:font-bold'><Link to={`/products/accessories`}>Accessories</Link></li>
                    <li className=' hover:text-gray-900 hover:font-bold'><Link to={"/wishlist"}>Wishlist</Link></li>
                    <li className=' hover:text-gray-900 hover:font-bold'>Us</li>
                </ul>
            </div>
            <div className='flex gap-5'>
                <Link to={"/profile"}><img src='https://cdn-icons-png.freepik.com/256/1144/1144760.png?semt=ais_hybrid' className='w-10 h-10'/></Link>
                <Link to={"/cart"}><img src='../../cart2.jpeg' className='w-24 h-16 '></img></Link>
                
            </div>
        </div>
    </div>
  )
}
