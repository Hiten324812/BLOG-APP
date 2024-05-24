import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { signinstart , signinsuccess , signinfailure} from '../redux/user/userSlice'

import { useDispatch , useSelector } from 'react-redux'
import OAuth from '../component/OAuth'

export default function Signup() {
  
  const [formdata,setformdata] = useState({})
  const dispatch = useDispatch()
  const { loading , error : errormessage } = useSelector(state => state.user)
  const navigate = useNavigate()

  const handlechange = (e) => {
    setformdata({...formdata, [e.target.id] : e.target.value.trim()

    })
  }

   const handlesubmit = async (e) => {
       e.preventDefault();

       if ( !formdata.email || !formdata.password ) {
        return dispatch(signinfailure('please fill all our the required fields !!'))
       }

       try {
          
        dispatch(signinstart());

          const res = await fetch('/api/auth/signin' , {
            method : 'POST',
            headers : { 'content-Type' : 'application/json'},
            body : JSON.stringify(formdata)
          })

         
          const data = await res.json();

          console.log(data)

          if ( data.status !== 200) // index.js settings for error 
            {
             dispatch(signinfailure(data.message))
            }
          
        
            if(res.ok) {
              dispatch(signinsuccess(data))
              navigate('/')
            }

       } catch(error) {
          dispatch(signinfailure(error.message))
          console.log(error)
       }

   }

  
  

  return (
    <div className='min-h-24 mt-20'>
      
      <div className='flex p-3 flex-col max-w-3xl mx-auto gap-10 md:flex-row md:items-center'>
       {/* left */}
      <div className='flex-1'>
      <Link to='/' className='text-4xl dark:text-white font-bold'>
      
      <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white' >Hiten's</span>
       Blog
      </Link>
      <p className='mt-5 text-base font-semibold'>
      This is a demo project. You can sign in with your email and password or with Google.
      </p>

      </div>
       
       {/* right */}
      <div className='flex-1'>
      <form className='flex flex-col gap-4' onSubmit={handlesubmit}>

        <div className='flex flex-col gap-2'>
          <Label value="Your email" className='text-xl' />
          <TextInput type='text' 
          placeholder='email'
          id='email' sizing="lg"   onChange={handlechange}/>
        </div>
        <div className='flex flex-col gap-2'>
          <Label value="Your password" className='text-xl' />
          <TextInput type='password' 
          placeholder='password'
          id='password' sizing="lg"  onChange={handlechange} />
        </div>
        <Button gradientDuoTone='purpleToPink' type='submit'
        disabled={loading} > 
          {
            loading ? ( <>
             <Spinner />
             <span className='mx-2 text-base'> Loading... </span>
            </>) : 'sign in'
          }
         </Button>
         <OAuth />
      </form>

      

      { errormessage && (
        <Alert className='mt-5 text-base' color='failure'>
          {errormessage}
        </Alert>
      )}
      
      <div className='flex gap-2 text-base mt-5'>
        <span> Don't have an account?</span>
        <Link to='/signup' className='text-blue-500'>
        sign up
        </Link>
      </div>
   
      </div>

      </div>

    </div>
  )
}
