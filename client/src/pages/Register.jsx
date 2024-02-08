import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    pinCode: '',
  });
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Your form submission logic here
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold p-3 mb-1'>Register !</h1>
      <form onSubmit={handleSubmit} action="text" className='flex flex-col gap-4'>
        <input type="text" placeholder='First Name' className='border p-3 rounded-lg' id='firstName' onChange={handleChange}/>
        <input type="text" placeholder='Last Name' className='border p-3 rounded-lg' id='lastName' onChange={handleChange}/>
        <input type="text" placeholder='Address' className='border p-3 rounded-lg' id='address' onChange={handleChange}/>
        <input type="text" placeholder='City' className='border p-3 rounded-lg' id='city' onChange={handleChange}/>
        <input type="text" placeholder='Pin Code' className='border p-3 rounded-lg' id='pinCode' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'loading...':'Register'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        {/* <p>have an account?</p> */}
        {/* <Link to={"/sign-in"}>
          <span className='text-blue-700'>Sign-in</span>
        </Link> */}
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
