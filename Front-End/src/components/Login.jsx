import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    const[name,setname] = useState('')
    const[password,setpassword] = useState('')
    const[err,seterr] = useState('')
    const[boole,setboole] = useState(false)

    const handleLogin = async(e) =>{
        e.preventDefault();
        const payload = {
            name,password
        }
        try {
            const res = await axios.post('https://funnelhq-task.onrender.com/api/login',payload)
            console.log(res.response);
            // const {token} = res.data
            // localStorage.setItem('token',token)
            navigate('/home')
        } catch (error) {
            seterr(error.response.data.error);
            setboole(true)
            setTimeout(()=>{
                setboole(false)
            },3000)
        }
    }
  return (
    <div className='w-full h-screen bg-gray-400 flex justify-center items-center'>
    <div className='max-w-[400px] w-full h-auto bg-white p-5'>
        
            <h2 className='text-4xl font-bold text-center my-4'>Sign Up</h2>
            {boole && <h5 className='w-full p-1 text-center border rounded-md bg-yellow-200'>{err}</h5>}
        <form action="">
            <div className='flex flex-col my-4'>
                <label htmlFor="name" className=''>Username:</label>
                <input type="text" id='name' className='border border-black rounded-md p-1 mt-1' onChange={(e)=>setname(e.target.value)} required/>
            </div>
            <div className='flex flex-col my-4'>
                <label htmlFor="password">Password:</label>
                <input type="password" id='password' className='border border-black rounded-md p-1 mt-1' onChange={(e)=>setpassword(e.target.value)} required/>
            </div>
            <div className=''>
                <button className='border w-full p-1 my-3 bg-blue-600 text-white hover:bg-blue-500' onClick={handleLogin}>Sign In</button>
            </div>
        </form>
        <div>
            <p>Not yet register ? Register here</p>
            <button className='border w-full p-1 my-3 bg-slate-500 text-white hover:bg-slate-400' onClick={()=>navigate('/')}>Register</button>
        </div>
    </div>
</div>
  )
}

export default Login