import React from 'react'


const InputBox = ({label , onChangeHandler}) => {
  return (
    <div className='flex flex-col'>
        <label className='text-lg p-2'>{label}</label>
        <input type="text" placeholder={label} className='border p-4 rounded-md' onChange={onChangeHandler}></input>     
    </div>
  )
}

export default InputBox;