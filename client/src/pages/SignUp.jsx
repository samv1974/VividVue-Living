// import React, { useState } from 'react'
// import { Link , useNavigate} from 'react-router-dom'
// import OAuth  from '../Components/OAuth'

// export default function SignUp(){
//   const [formData,setFormData] = useState({})
//   const [error,setErrors] = useState(null)
//   const [loading,setLoading] = useState(false)

//   const navigate = useNavigate()

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
//       setLoading(true);
//       const res = await fetch('/api/auth/signup',
//       {
//         method:'POST',
//         headers:{
//           'content-type':'application/json',
  
//         },
//         body:JSON.stringify(formData),
//       })
//       const data = await res.json();
//       if(data.success === false){
//         setLoading(false)
//         setErrors(data.message);
//         return;
//       }
//       setLoading(false);
//       setErrors(null);
//       // console.log(data)
//       navigate('/sign-in')
//     }catch(error){
//       setLoading(false)
//       setErrors(error.message);
//     }
//     }
//   // console.log(formData);
//   return (
//     <div className='p-3 max-w-lg mx-auto'>
//       <h1 className='text-3xl text-center font-semibold p-3 mb-1'>Sign-Up</h1>
//       <form onSubmit={handleSubmit} action="text" className='flex flex-col gap-4'>
//         <input type="text" placeholder='username'
//         className='border p-3 rounded-lg' id='username' onChange={handlechange}/>
//         <input type="email" placeholder='email'
//         className='border p-3 rounded-lg' id='email' onChange={handlechange}/>
//         <input type="password" placeholder='password'
//         className='border p-3 rounded-lg' id='password' onChange={handlechange}/>
//         <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'loading...':'SignUp'}</button>
//         <OAuth />
//       </form>
//       <div className='flex gap-2 mt-5'>
//         <p>have an account?</p>
//         <Link to={"/sign-in"}>
//           <span className='text-blue-700'>Sign-in</span>
//         </Link>
//       </div>
//       {error && <p className='text-red-500 mt-5'>{error}</p>}
//     </div>
//   )
// }


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../Components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        setError(null);
      }, 5000); // Adjust the duration as needed
    }
    return () => clearTimeout(timer);
  }, [error]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold p-3 mb-1">Sign-Up</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path
                fillRule="evenodd"
                d="M14.348 14.849a1 1 0 0 1-1.415 1.414l-3.535-3.536-3.536 3.536a1 1 0 1 1-1.414-1.414l3.536-3.535-3.536-3.536a1 1 0 1 1 1.414-1.414l3.536 3.536 3.535-3.536a1 1 0 0 1 1.415 1.414l-3.536 3.536 3.536 3.535z"
              />
            </svg>
          </span>
        </div>
      )}
      <form onSubmit={handleSubmit} action="text" className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'loading...' : 'SignUp'}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign-in</span>
        </Link>
      </div>
    </div>
  );
}
