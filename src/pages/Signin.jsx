import React, { useState } from 'react';
import axios from 'axios';
import InputBox from '../components/InputBox';
import Heading from '../components/Heading';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { BottomWaring } from '../components/BottomWaring';

const Signin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSignin = () => {
    const validationErrors = {};

    if (!username) validationErrors.username = 'Username is required';
    if (!password) validationErrors.password = 'Password is required';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    axios.post('https://fashion-flow-backend.onrender.com/api/v1/user/signin', {
      username: username,
      password: password
    }).then((res) => {
      console.log(res?.data?.message);
      localStorage.setItem('token', res?.data?.token);
      navigate('/');
    }).catch((err) => {
      const apiErrors = err?.response?.data || {};
      setErrors(apiErrors);
    });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setErrors(prevErrors => ({ ...prevErrors, username: null }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors(prevErrors => ({ ...prevErrors, password: null }));
  };

  return (
    <div className='flex flex-row h-fit w-fit'>
      <div className='basis-1/2'>
        <div className='flex flex-col justify-center gap-[50px] px-12 pt-36'>
          <Heading title={'Signin'} />
          <InputBox label={'Username'} onChangeHandler={handleUsernameChange} />
          {errors.username && <div className='text-red-500'>{errors.username}</div>}
          <InputBox label={'Password'} onChangeHandler={handlePasswordChange} />
          {errors.password && <div className='text-red-500'>{errors.password}</div>}
          {errors.message && <div className='text-red-500'>{errors.message}</div>}
          <Button label={'Signin'} onClickHandler={handleSignin} />
          <BottomWaring label={"Don't have an account?"} to={'signup'} />
        </div>
      </div>
      <div className='basis-1/2'>
        <img src='../../signin.png' alt='Signin' />
      </div>
    </div>
  );
};

export default Signin;
