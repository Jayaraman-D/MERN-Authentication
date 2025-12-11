import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import baseUrl from '../utils/url';
import {toast} from 'react-toastify'
import axios from 'axios';

const Navbar = () => {
const navigate = useNavigate();


const handleLogoutButton = async()=>{

  try {

    console.log('logout btn is clicked');

    const res = await axios.post(`${baseUrl}/api/auth/logout`,{},{withCredentials: true});
    toast.success(res.data.message);

    navigate('/login');

    
  } catch (error) {
    console.log(`Error occured in logout: ${error.message}`)
  }

}

  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>

        <img src={assets.logo} alt='logo' className='w-28 sm:w-32'/>

        <button onClick={()=> handleLogoutButton()}
        className='flex items-center gap-2 border border-gray-500
        rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100'>Logout</button>
    </div>
  )
}

export default Navbar