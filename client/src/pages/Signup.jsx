import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
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
      This is a demo project. You can sign up with your email and password or with Google.
      </p>

      </div>
       
       {/* right */}
      <div className='flex-1'>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <Label value="Your username" className='text-xl' />
          <TextInput type='text' 
          placeholder='username' 
          id='username' sizing="lg" />
        </div>
        <div className='flex flex-col gap-2'>
          <Label value="Your email" className='text-xl' />
          <TextInput type='text' 
          placeholder='email'
          id='email' sizing="lg" />
        </div>
        <div className='flex flex-col gap-2'>
          <Label value="Your password" className='text-xl' />
          <TextInput type='password' 
          placeholder='password'
          id='password' sizing="lg" />
        </div>
        <Button gradientDuoTone='purpleToPink' type='submit' > Sign Up </Button>
      </form>
      
      <div className='flex gap-2 text-base mt-5'>
        <span> Have an account?</span>
        <Link to='/signin' className='text-blue-500'>
        sign in
        </Link>
      </div>
   
      </div>

      </div>

    </div>
  )
}
