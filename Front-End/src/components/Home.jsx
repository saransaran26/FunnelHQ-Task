import React, { useEffect } from 'react'
import User from './User'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { getUser } from '../redux/userSlice';

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fun = async () => {
      try {
        const response = await axios.get("http://localhost:3000");
        console.log(response.data);
        dispatch(getUser(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    fun();
  }, []);
  return (
    <div>
        <User />
    </div>
  )
}

export default Home