import axios from 'axios';
import React from 'react'
import { useState , useEffect} from 'react';
import { CartRow } from './CartRow';


export const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('https://fashion-flow-backend.onrender.com/api/v1/cart',{
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                });
                //console.log(response.data)
                setCart(response.data.cart);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart:', error);
                setLoading(false);
            }
        };

        fetchCart();
    }, []);
    const handleRemove = (productId) => {
        setCart((prevCart) => {
          const updatedProducts = prevCart.products.filter(item => item.product._id !== productId);
          return { ...prevCart, products: updatedProducts };
        });
      };
    return (
        <div>
            {
                loading==true?<div>...loading</div>:<div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
                {cart && cart.products.length > 0 ? (
                  <div className="space-y-4">
                    {cart.products.map((item,index) => (
                      <CartRow item={item} key={index} onRemove={handleRemove}/>
                    ))}
                  </div>
                ) : (
                  <h3>Your cart is empty</h3>
                )}
              </div>
            }
        </div>
    )
}
