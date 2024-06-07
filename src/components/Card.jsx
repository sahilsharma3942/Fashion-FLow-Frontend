import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Card = ({item,id, removeFromWishlist, addToWishlist}) => {
    const [isWishlisted,setIsWishlisted] = useState();
    useEffect(() => {
      // Check if the item is already in the wishlist on initial render
      const checkWishlist = async () => {
          try {
              const response = await axios.get(`https://fashion-flow-backend.onrender.com/api/v1/user/me/wishlist`, {
                  headers: {
                      Authorization: localStorage.getItem("token")
                  }
              });
              response.data.wishlist.products.map((p)=>{
                if(p.product._id==item._id){
                  setIsWishlisted(true);
                }}); // Update isWishlisted based on server response
          } catch (error) {
              console.log(error?.response?.data);
          }
      };
      checkWishlist();
  }, []);

    const handleToggleWishlist = ()=>{
      if(isWishlisted){
        axios.delete(`https://fashion-flow-backend.onrender.com/api/v1/user/me/wishlist/${item._id}`,{
          headers:{
              Authorization:localStorage.getItem("token")
          }
      }).then((res)=>{
          console.log(res?.data)
          setIsWishlisted(false);
          removeFromWishlist(item);
           
        }).catch((err)=>{
          console.log(err?.response?.data)
        })
      }else{
        axios.post(`https://fashion-flow-backend.onrender.com/api/v1/user/me/wishlist/${item._id}`,{},{
          headers:{
              Authorization:localStorage.getItem("token")
          }
      }).then((res)=>{
          console.log(res?.data)
          setIsWishlisted(true)
          addToWishlist(item);
        }).catch((err)=>{
          console.log(err?.response?.data)
        })
      }
    }

    const addToCart = ()=>{
      axios.post(`https://fashion-flow-backend.onrender.com/api/v1/cart/add/${item._id}`,{},{
        headers:{
          Authorization:localStorage.getItem("token")
        }
      }).then((res)=>{console.log(res.data)})
      .catch((err)=>{console.log(err?.response?.data?.message)})
    }
    return (
        <Link to={`/productDetails/${item._id}`}>
          <div className="w-60 m-5 p-2 shadow-sm rounded-lg hover:scale-110 transition-transform duration-300 hover:shadow-lg" key={id}>
                <img src={item.imageUrl} alt={item.name} className="w-full h-48 rounded-t-lg" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                  <div className='flex justify-center '>
                    <button className=" size-18 m-1 p-1 bg-gray-500 text-white rounded-lg">Buy Now</button>
                    <button className="size-18 m-1 p-1 bg-gray-500 text-white rounded-lg" onClick={addToCart}>Add to cart</button>
                  </div>
                  <button onClick={handleToggleWishlist} className='ml-20 '>
                    {isWishlisted ? (
                      <span className="text-red-500">♥</span>
                    ) : (
                      <span className="text-gray-500">♡</span>
                    )}
                  </button>
                </div>
        </div>        
        </Link>
      );
}
