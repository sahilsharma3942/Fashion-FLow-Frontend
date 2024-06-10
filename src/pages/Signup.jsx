import React, { useState } from 'react';
import Heading from '../components/Heading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import { BottomWaring } from '../components/BottomWaring';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = () => {
    const validationErrors = {};

    if (!firstname) validationErrors.firstname = 'Firstname is required';
    if (!lastname) validationErrors.lastname = 'Lastname is required';
    if (!email) validationErrors.email = 'Email is required';
    else if (!validateEmail(email)) validationErrors.email = 'Email is not valid';
    if (!username) validationErrors.username = 'Username is required';
    if (!password) validationErrors.password = 'Password is required';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    axios.post('https://fashion-flow-backend.onrender.com/api/v1/user/signup', {
      username,
      email,
      password,
      firstName: firstname,
      lastName: lastname
    }).then((res) => {
      console.log(res?.data?.message);
      localStorage.clear('token');
      localStorage.setItem('token', res?.data?.token);
      navigate('/');
    }).catch((err) => {
      const apiErrors = err?.response?.data?.errors || {};
      setErrors(apiErrors);
    });
  };

  return (
    <div className='flex flex-row h-fit w-fit'>
      <div className='basis-1/2'>
        <div className='flex flex-col justify-center px-12 pt-10 gap-1'>
          <Heading title={"Signup"} />
          <InputBox
            label={"Firstname"}
            onChangeHandler={(e) => setFirstname(e.target.value)}
          />
          {errors.firstname && <div className='text-red-500'>{errors.firstname}</div>}
          <InputBox
            label={"Lastname"}
            onChangeHandler={(e) => setLastname(e.target.value)}
          />
          {errors.lastname && <div className='text-red-500'>{errors.lastname}</div>}
          <InputBox
            label={"Email"}
            onChangeHandler={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className='text-red-500'>{errors.email}</div>}
          <InputBox
            label={"Username"}
            onChangeHandler={(e) => setUsername(e.target.value)}
          />
          {errors.username && <div className='text-red-500'>{errors.username}</div>}
          <InputBox
            label={"Password"}
            onChangeHandler={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className='text-red-500'>{errors.password}</div>}
          <Button label={"Signup"} onClickHandler={handleSignup} />
          <BottomWaring label={"Already have an account?"} to={"signin"} />
        </div>
      </div>
      <div className='basis-1/2'>
        <img src='../../signup.png' alt='Signup' />
      </div>
    </div>
  );
};

export default Signup;
