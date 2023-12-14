import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Create() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [age, setage] = useState('');

  const handleCreate = async(e) =>{
    e.preventDefault()
    try {
        const res = await axios.post('https://funnelhq-task.onrender.com/create',{name,email,age})
        console.log(res.data);
        dispatch(createUser(res.data))
        navigate('/home')
    } catch (error) {
        console.log(error);
    }
    
  }
  return (
    <div className="bg-gray-400 w-full h-screen flex justify-center items-center">
      <div className="bg-white p-6">
        <h3 className="text-3xl text-center font-bold">Create New User</h3>
        <form onSubmit={handleCreate}>
          <div className="flex flex-col my-4">
            <label htmlFor="" className="font-bold">
              Name :
            </label>
            <input
              type="text"
              className="w-[400px] border border-black rounded-md mt-1 p-2"
              onChange={(e)=>setname(e.target.value)}
            />
          </div>
          <div className="flex flex-col my-4">
            <label htmlFor="" className="font-bold">
              Email :
            </label>
            <input
              type="email"
              className="w-[400px] border border-black rounded-md mt-1 p-2"
              onChange={(e)=>setemail(e.target.value)}
            />
          </div>
          <div className="flex flex-col my-4">
            <label htmlFor="" className="font-bold">
              Age :
            </label>
            <input
              type="text"
              className="w-[400px] border border-black rounded-md mt-1 p-2"
              onChange={(e)=>setage(e.target.value)}
            />
          </div>
          <button className="border my-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-400">
          Create
        </button>
        </form>
        
      </div>
    </div>
  );
}

export default Create;
