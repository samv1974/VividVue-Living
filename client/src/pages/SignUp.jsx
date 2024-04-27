// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import OAuth from '../Components/OAuth';

// export default function SignUp() {
//   const [formData, setFormData] = useState({});
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const res = await fetch('/api/auth/signup', {
//         method: 'POST',
//         headers: {
//           'content-type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         setLoading(false);
//         setError(data.message);
//         return;
//       }
//       setLoading(false);
//       setError(null);
//       navigate('/sign-in');
//     } catch (error) {
//       setLoading(false);
//       setError(error.message);
//     }
//   };

//   return (
//     <div className='p-3 max-w-lg mx-auto'>
//       <h1 className='text-3xl text-center font-semibold p-3 mb-1'>Sign-Up</h1>
//       <form onSubmit={handleSubmit} action="text" className='flex flex-col gap-4'>
//         <input
//           type="text"
//           placeholder="Username"
//           className="border p-3 rounded-lg"
//           id="username"
//           onChange={handleChange}
//         />
//         <div className="flex gap-4">
//           <input
//             type="text"
//             placeholder="First Name"
//             className="border p-3 rounded-lg flex-1"
//             id="firstName"
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             placeholder="Last Name"
//             className="border p-3 rounded-lg flex-1"
//             id="lastName"
//             onChange={handleChange}
//           />
//         </div>
//         <input
//           type="email"
//           placeholder="Email"
//           className="border p-3 rounded-lg"
//           id="email"
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="border p-3 rounded-lg"
//           id="password"
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           className="border p-3 rounded-lg"
//           id="confirmPassword"
//           onChange={handleChange}
//         />
//         <button
//           disabled={loading}
//           className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
//         >
//           {loading ? 'Loading...' : 'Sign Up'}
//         </button>
//         <OAuth />
//       </form>
//       <div className="flex gap-2 mt-5">
//         <p>Already have an account?</p>
//         <Link to="/sign-in">
//           <span className="text-blue-700">Sign In</span>
//         </Link>
//       </div>
//       {error && <p className='text-red-500 mt-5'>{error}</p>}
//     </div>
//   );
// }


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../Components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()-+=^])(?!\s).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.username || !formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    try {
      setLoading(true);

      // Validate password before making the request
      if (!isPasswordValid(formData.password)) {
        setLoading(false);
        setError(
          'Password must meet the criteria: at least one digit, one upper case alphabet, one lower case alphabet, one special character, and no white space.'
        );
        return;
      }

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
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold p-3 mb-1'>Sign-Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="border p-3 rounded-lg flex-1"
            id="firstName"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border p-3 rounded-lg flex-1"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="border p-3 rounded-lg"
          id="confirmPassword"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Already have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
