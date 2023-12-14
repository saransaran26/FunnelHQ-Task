import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate()
    const[name,setname] = useState('')
    const[password,setpassword] = useState('')
    const[err,seterr] = useState('')
    const[boole,setboole] = useState(false)

    const handleRegsiter = async(e) =>{
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/register',{name,password})
            console.log(res.data);
            navigate('/login')
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
            
                <h2 className='text-4xl font-bold text-center my-4'>Register</h2>
                {boole && <h5 className='w-full p-1 text-center border rounded-md bg-yellow-200'>{err}</h5>}
            <form action="">
                <div className='flex flex-col my-4'>
                    <label htmlFor="name" className=''>Username:</label>
                    <input type="text" id='name' className='border border-black rounded-md p-1 mt-1' value={name} onChange={(e)=>setname(e.target.value)} required/>
                </div>
                <div className='flex flex-col my-4'>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id='password' className='border border-black rounded-md p-1 mt-1' value={password} onChange={(e)=>setpassword(e.target.value)} required/>
                </div>
                <div className=''>
                    <button className='border w-full p-1 my-3 bg-blue-600 text-white hover:bg-blue-500' onClick={handleRegsiter}>Register</button>
                </div>
            </form>
            <div>
                <p>Already have an account ? Log in</p>
                <button className='border w-full p-1 my-3 bg-slate-500 text-white hover:bg-slate-400' onClick={()=>navigate('/login')}>Log In</button>
            </div>
        </div>
    </div>
  )
}

export default Register