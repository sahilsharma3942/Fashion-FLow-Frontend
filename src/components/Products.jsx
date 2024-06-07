import React, { useEffect, useState } from 'react'
import axios, { all } from 'axios';
import { Card } from './Card';
import { useParams } from 'react-router-dom';
import { categoryMap } from '../constants/constants';


export const Products = () => {
    const [allProducts,setAllProducts] = useState([]);
    const {category} = useParams();
    useEffect(()=>{
        const getallProducts =()=>{
            axios.get("https://fashion-flow-backend.onrender.com/api/v1/products")
        .then((res)=>{
          setAllProducts(res.data)})
        .catch((err)=>{console.log(err?.response?.data?.message)})
        }
        getallProducts();
        
    },[]) 
    
    
    const filteredProducts = category
    ? allProducts.filter(product => product.category === categoryMap[category])
    : allProducts;

  return (
    <div>
      {allProducts.length === 0 ? <h1>Loading...</h1> :
        <div className='flex flex-wrap p-4'>
          {filteredProducts.map((product, index) => (
            <Card item={product} key={index} />
          ))}
        </div>}
    </div>
  );
}
