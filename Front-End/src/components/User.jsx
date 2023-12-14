import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../redux/userSlice";

function User() {
  const users = useSelector((state) => state.users.users);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleDelete = async(id) => {
    console.log("Clicked");
    try {
        const res = await axios.delete(`http://localhost:3000/delete/${id}`)
        dispatch(deleteUser({id}))
        
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className="bg-gray-400 w-full h-screen flex justify-center items-center">
      <div className="bg-white">
        <div className="overflow-x-auto">
          <div>
          <h3 className="text-center font-bold text-4xl p-4">Sample Todo app</h3>
          </div>
          
          <div className="pl-3">
            <button className="border my-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-400" onClick={()=>navigate('/create')}>
              Add +
            </button>
          </div>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Age</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td className="py-2 px-4 border-b">{user.name}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">{user.age}</td>
                    <td className="py-2 px-4 border-b">
                      <button className="px-4 py-2 ml-2 rounded-md bg-green-500 text-white hover:bg-green-400"
                      onClick={()=>navigate(`/edit/${user.id}`)}
                      >
                        Update
                      </button>
                      <button className="px-4 py-2 ml-2 rounded-md bg-red-500 text-white hover:bg-red-400"
                      onClick={()=>handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default User;
