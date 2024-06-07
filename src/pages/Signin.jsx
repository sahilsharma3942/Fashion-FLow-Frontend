import React, { useState } from 'react'
import axios from "axios";
import InputBox from '../components/InputBox';
import Heading from '../components/Heading';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { BottomWaring } from '../components/BottomWaring';

const Signin = () => {
  const navigate = useNavigate();
  const [username,setUsername]= useState("");
  const [password,setPassword] = useState("");

  const handleSignin = ()=>{
      axios.post("https://fashion-flow-backend.onrender.com/api/v1/user/signin",{
        username:username,
        password:password
      }).then((res)=>{
        console.log(res?.data?.message);
        localStorage.setItem("token",res?.data?.token);
        navigate("/");
        
      })
      .catch((err)=>{console.log(err?.response?.data?.message)})


  }

  const handleUsernameChange =(e)=>{
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e) =>{
    setPassword(e.target.value);
  }

  return (
    <div className='flex flex-row h-fit w-fit'>
        <div className='basis-1/2'>
            <div className='flex flex-col justify-center gap-[50px] px-12 pt-36'>
              <Heading title={"Signin"}/>
              <InputBox label={"Username"} onChangeHandler={handleUsernameChange}/>
              <InputBox label={"Password"} onChangeHandler={handlePasswordChange}/>
              <Button label={"Signin"} onClickHandler={handleSignin}/>
              <BottomWaring label={"Don't have an account?"} to={"signup"}></BottomWaring>
            </div>
        </div>
        <div className='basis-1/2'>
            <img src='../../signin.png'></img>
        </div>
    </div>
  )
}

export default Signin;