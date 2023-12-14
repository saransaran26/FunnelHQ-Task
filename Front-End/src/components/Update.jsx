import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUser } from '../redux/userSlice';
import axios from 'axios';

function Update() {
    const {id} = useParams()
    const users = useSelector(state => state.users.users)
    const user = users.find(u => u.id === id)
    const dispatch = useDispatch()
    const navigate = useNavigate()
  const [name, setname] = useState(user.name);
  const [email, setemail] = useState(user.email);
  const [age, setage] = useState(user.age);
 
  const handleEdit = async(e) =>{
    console.log("Clicked");
    e.preventDefault()
    try {
        const res = await axios.put(`http://localhost:3000/edit/${id}`,{name,email,age})
        console.log(res.data);
        dispatch(updateUser(res.data))
        navigate('/home')
    } catch (error) {
        console.log(error);
    }
}

  return (
    <div className="bg-gray-400 w-full h-screen flex justify-center items-center">
      <div className="bg-white p-6">
        <h3 className="text-3xl text-center font-bold">Edit User</h3>
        <form onSubmit={handleEdit}>
          <div className="flex flex-col my-4">
            <label htmlFor="" className="font-bold">
              Name :
            </label>
            <input
              type="text"
              className="w-[400px] border border-black rounded-md mt-1 p-2"
              value={name}
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
              value={email}
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
              value={age}
              onChange={(e)=>setage(e.target.value)}
            />
          </div>
          <button className="border my-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-400">
          Update
        </button>
        </form>
        
      </div>
    </div>
  )
}

export default Update