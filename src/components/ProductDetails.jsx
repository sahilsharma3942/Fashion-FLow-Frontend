import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Fetch product details using the ID
        console.log("sasasasas",productId);
        axios.get(`http://localhost:3000/api/v1/products/${productId}`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        }).then(res =>{
                console.log(res.data);
                setProduct(res.data);
            }).catch(error => console.error('Error fetching product details:', error?.response?.data?.message));
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }
    const addToCart = ()=>{
        axios.post(`https://fashion-flow-backend.onrender.com/api/v1/cart/add/${product.product._id}`,{},{
          headers:{
            Authorization:localStorage.getItem("token")
          }
        }).then((res)=>{console.log(res.data)})
        .catch((err)=>{console.log(err?.response?.data?.message)})
      }

    return (
        <div className="max-w-2xl mx-auto p-5">
            <div className="shadow-md rounded-lg overflow-hidden">
                <img src={product.product.imageUrl} alt={product.product.name} className="w-full h-96 object-cover" />
                <div className="p-5">
                    <h2 className="text-2xl font-bold mb-2">{product.product.name}</h2>
                    <p className="text-gray-700 mb-4">{product.product.description}</p>
                    <p className="text-gray-900 font-semibold text-lg mb-4">${product.product.price}</p>
                    <button className="size-18 m-1 p-1 bg-gray-500 text-white rounded-lg">Buy Now</button>
                    <button className="size-18 m-1 p-1 bg-gray-500 text-white rounded-lg" onClick={() => addToCart(product)}>Add to cart</button>
                    
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
