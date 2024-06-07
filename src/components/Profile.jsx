import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Button from './Button';
import { ProfileField } from './ProfileField';
import {  useNavigate } from 'react-router-dom';


export const Profile = () => {
    const navigate = useNavigate();
    const [data,setData]= useState([]);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value
        }));
      };
      const handleSave = () => {
        // Update the profile data here
        axios.put("https://fashion-flow-backend.onrender.com/api/v1/user/me", formData, {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          })
          .then((res) => {
            setData(res?.data?.user);
            setEditMode(false);
          })
          .catch((err) => {
            console.log(err?.response?.data?.message);
          });
      };
    useEffect(()=>{
        axios.get("https://fashion-flow-backend.onrender.com/api/v1/user/me",{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then((res)=>{setData(res?.data?.user)})
        .catch((err)=>{console.log(err?.response?.data?.message)})
    },[])
    return data.username ? (
        <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Profile Information</h2>
            <ProfileField label={"Username"} value={data.username} edit={editMode} handleChange={handleChange}/>
            <ProfileField label={"Email"} value={data.email} edit={editMode} handleChange={handleChange}/>
            <ProfileField label={"Firstname"} value={data.firstName} edit={editMode} handleChange={handleChange}/>
            <ProfileField label={"Username"} value={data.lastName} edit={editMode} handleChange={handleChange}/>
            <div className="mt-4">
                {editMode ? (
                <div className='flex w-40 gap-6'>
                    <Button label={"Save  "} onClickHandler={handleSave}></Button>
                    <Button label={"Cancel"} onClickHandler={()=>{setEditMode(false)}}></Button>
                </div>
                ) : (
                <div className=" flex w-40 gap-6">
                    <Button label={"Edit"}onClickHandler={()=>{setEditMode(true)}}/>
                    <Button label={"Logout"} onClickHandler={()=>{
                        localStorage.removeItem("token")
                        navigate("/signin")}}/>
                </div>
                )}
            </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      );
}
