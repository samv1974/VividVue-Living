import React, { useRef,useState ,useEffect} from 'react'
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
import {useDispatch, useSelector } from 'react-redux'
import { app } from '../firebase'
import { updateUserStart,updateUserSuccess,updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess } from '../redux/user/userSlice'



export default function Profile() {
  const fileRef = useRef(null)
  const {currentUser,loading,error} = useSelector((state) => state.user)
  const [file,setFile] = useState(undefined)
  const [fileperc,  setFilePerc] = useState(0)
  const [fileError, setFileError] = useState(false)
  const [formData, setFormData] = useState({})
  const [updateSucess, setUpdateSucess] =useState(false)
  const dispatch = useDispatch()

  console.log(formData)
  useEffect(() => {
    if(file){
      handleFileUpload(file); 
    }
  },[file])

  const handleFileUpload = async (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage,fileName)
    const uploadTask = uploadBytesResumable(storageRef,file)

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100
      setFilePerc(Math.round(progress))
    },
    (error) => {
      setFileError(true)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadURL) => {
        setFormData({...formData,avatar:downloadURL})
      })
    }
    )
  }

  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value})
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(formData),
      })
      const data = await res.json();
      if (data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSucess(true)
    }catch(e){
      dispatch(updateUserFailure(e.message))
    }
  }

  const handleDeleteUser = async () => {
    try{
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
      
      })
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));

    }catch(e){
      dispatch(deleteUserFailure(e.message))
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-4xl text-slate-600 font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
        <img onClick={() =>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="Profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
        <p className='text-sm self-center'>
          {fileError ? (
          <span className='text-red-700'>Error Image upload
          (image must be less than 2mbs)</span> 
          ): fileperc > 0 && fileperc < 100 ? (
            <span className='text-slate-700'>
              {`Uploading ${fileperc}%`}
            </span>
          ):  fileperc === 100 ? (
              <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
              ''  
          )}
        </p>
        <input type="text" defaultValue={currentUser.username} placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
        <input type="email" defaultValue={currentUser.email} placeholder='email' className='border p-3 rounded-lg' id='emal' onChange={handleChange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password'/>
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3.5 uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'loading...' : 'update'}</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign-out</span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error : ""}</p>
      <p className='text-green-700 mt-5'>{updateSucess ? 'User updated successfully!' : ""}</p>
      
    </div>
  )
}
