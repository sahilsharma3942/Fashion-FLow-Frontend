import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card } from './Card';

export const Wishlist = () => {

    const [wishlistProducts, setWishlistProducts]= useState([])
    useEffect(()=>{
        axios.get("https://fashion-flow-backend.onrender.com/api/v1/user/me/wishlist",{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        }).then((res)=>{console.log(res.data.wishlist.products)
            setWishlistProducts(res.data.wishlist.products)
        })
        .catch((err)=>{console.log(err.response.data.message)})
    },[])

    const handleRemove = (item) => {
        setWishlistProducts((prevProducts) => 
            prevProducts.filter((product) => product.product._id !== item._id)
        );
    };

    const handleAdd = (item) => {
        setWishlistProducts((prevProducts) => 
            [...prevProducts, { product: item }]
        )}

    return(
        wishlistProducts.length==0?<div><h1>...loading</h1></div>:
        <div className='flex flex-wrap p-4'>{wishlistProducts.map((product,index)=>{
            return <Card item={product.product} 
                         key={index} 
                         wishlist={wishlistProducts} 
                         addToWishlist={handleAdd} 
                         removeFromWishlist={handleRemove}/>
        })}</div>
    )
}
