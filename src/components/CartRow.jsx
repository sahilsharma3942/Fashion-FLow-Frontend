import axios from 'axios'
import React, { useState } from 'react'

export const CartRow = ({item , onRemove}) => {
    const[quantity,setQuantity] = useState(item.quantity);
    const handleRemove =  () => {
        
          axios.delete(`https://fashion-flow-backend.onrender.com/api/v1/cart/remove/${item.product._id}`, {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }).then(()=>{onRemove(item.product._id)})
            .catch ((error)=>{
                console.error('Error removing item from cart:', error);
            })
      }
    const handleUpdate = (value)=>{
        setQuantity(value)
        axios.put(`https://fashion-flow-backend.onrender.com/api/v1/cart/update/${item.product._id}`,{quantity:value},{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        }).then((res)=>{console.log(res.data.products)})
        .catch((err)=>{console.log(err.response.data)})
    }
  return (
    <div key={item.product._id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
        <img src={item.product.imageUrl} alt={item.product.name} className="w-24 h-24 object-cover rounded-md" />
        <div className="flex-1 ml-4">
            <h3 className="text-lg font-semibold">{item.product.name}</h3>
            <p className="text-gray-600">${item.product.price}</p>
        </div>
        <div className="flex items-center space-x-4">
            <button onClick={()=>handleUpdate(quantity+1)}>+</button>
            <span className="text-lg">Qty: {quantity}</span>
            <button onClick={()=>handleUpdate(quantity-1)}>−</button>
            <button
                onClick={handleRemove}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                Remove
            </button>
        </div>
    </div>
  )
}
