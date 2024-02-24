// import React, { useState } from 'react'
// import { Link , useNavigate} from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { signInStart,signInSuccess,signInFailure} from '../redux/user/userSlice.js'
// import OAuth from '../Components/OAuth.jsx'
// export default function SignIn(){

//   const [formData,setFormData] = useState({})
//   //const [error,setErrors] = useState(null)
//   //const [loading,setLoading] = useState(false)

//   const {loading,error} = useSelector((state) => state.user)

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handlechange = (e) => {
//     setFormData(
//       {
//         ...formData,
//         [e.target.id]: e.target.value,
//       }
//     )
//   }
//   const handleSubmit = async(e) => {
//     e.preventDefault()
//     try{
//       // setLoading(true);
//       dispatch(signInStart())
//       const res = await fetch('/api/auth/signin',
//       {
//         method:'POST',
//         headers:{
//           'content-type':'application/json',
  
//         },
//         body:JSON.stringify(formData),
//       })
//       const data = await res.json();
//       if(data.success === false){
//         // setLoading(false)
//         // setErrors(data.message);
//         dispatch(signInFailure(data.message))
//         return;
//       }
//       // setLoading(false);
//       // setErrors(null);
//       dispatch(signInSuccess(data))
//       // console.log(data)
//       navigate('/')
//     }catch(error){
//       // setLoading(false)
//       // setErrors(error.message);
//       dispatch(signInFailure(error.message))
//     }
//     }
//   // console.log(formData);
//   return (
//     <div className='p-3 max-w-lg mx-auto'>
//       <h1 className='text-3xl text-center font-semibold p-3 mb-1'>Sign-In</h1>
//       <form onSubmit={handleSubmit} action="text" className='flex flex-col gap-4'>
//         <input type="email" placeholder='email'
//         className='border p-3 rounded-lg' id='email' onChange={handlechange}/>
//         <input type="password" placeholder='password'
//         className='border p-3 rounded-lg' id='password' onChange={handlechange}/>
//         <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'loading...':'Sign In'}</button>
//         <OAuth />
//       </form>
//       <div className='flex gap-2 mt-5'>
//         <p>Dont have an account?</p>
//         <Link to={"/sign-up"}>
//           <span className='text-blue-700'>Sign-up</span>
//         </Link>
//       </div>
//       {error && <p className='text-red-500 mt-5'>{error}</p>}
//     </div>
//   )
// }

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';
import OAuth from '../Components/OAuth.jsx';
// import backgroundImage from '../assets/background.jpg'; // Import your background image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import the home icon and eye icons

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State variable to toggle password visibility
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='p-3 max-w-lg mx-auto' >
      <div className='p-3 max-w-lg mx-auto bg-white bg-opacity-80 rounded-lg shadow-md font-roboto mt-20'>
        <h1 className='text-3xl text-center font-bold p-3 mb-1 text-slate-500'>
          <FontAwesomeIcon icon={faHome} className="icon" /> Sign-In
        </h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          {/* Form Inputs */}
          <input type="email" placeholder='Email' className='border p-3 rounded-lg transition-all duration-300 focus:outline-none focus:border-blue-500' id='email' onChange={handleChange}/>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              className='border p-3 rounded-lg transition-all duration-300 focus:outline-none focus:border-blue-500'
              id='password'
              onChange={handleChange}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="toggle-password-icon ml-3 text-slate-600"
              onClick={togglePasswordVisibility}
            />
          </div>
          <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:bg-blue-800 transition-all duration-300 disabled:opacity-80'>
            {loading ? 'Loading...' : 'Sign In'}
          </button>
          <OAuth />
        </form>
        <div className='flex gap-2 mt-5'>
          <p>Don't have an account?</p>
          <Link to={"/sign-up"}>
            <span className='text-blue-700'>Sign-up</span>
          </Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
    </div>
  );
  
}
