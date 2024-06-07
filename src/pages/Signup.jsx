import React, { useState } from 'react'
import Heading from '../components/Heading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import { BottomWaring } from '../components/BottomWaring';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname]= useState("");
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const handleSignup = ()=>{
        axios.post("https://fashion-flow-backend.onrender.com/api/v1/user/signup",{
            username:username,
            email:email,
            password:password,
            firstName:firstname,
            lastName:lastname
            
        }).then((res)=>{
            console.log(res?.data?.message);
            localStorage.clear("token");
            localStorage.setItem("token",res?.data?.token);
            navigate("/");
        })
        .catch((err)=>{console.log(err?.response?.data)})
    }

    return (
        <div className='flex flex-row h-fit w-fit'>
            <div className='basis-1/2'>
                <div className='flex flex-col justify-center px-12 pt-10 gap-1'>
                  <Heading title={"Signup"}/>
                  <InputBox label={"Firstname"} onChangeHandler={(e)=>{setFirstname(e.target.value)}}/>
                  <InputBox label={"Lastname"} onChangeHandler={(e)=>{setLastname(e.target.value)}}/>
                  <InputBox label={"Email"} onChangeHandler={(e=>{setEmail(e.target.value)})}/>
                  <InputBox label={"Username"} onChangeHandler={(e)=>{setUsername(e.target.value)}}/>
                  <InputBox label={"Password"} onChangeHandler={(e)=>{setPassword(e.target.value)}}/>
                  <Button label={"Signup"} onClickHandler={handleSignup}/>
                  <BottomWaring label={"Already have an account?"} to={"signin"}/>
                </div>
            </div>
            <div className='basis-1/2'>
                <img src='../../signup.png'></img>
            </div>
        </div>
      )
}


export default Signup;