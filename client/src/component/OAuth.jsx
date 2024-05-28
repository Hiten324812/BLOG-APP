import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider, signInWithPopup , getAuth } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch , useSelector } from 'react-redux'
import { signinsuccess ,signinfailure , signinstart } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

export default function OAuth() {
   
    const dispatch = useDispatch()
    const navigate = useNavigate()

     const auth =getAuth(app)
    const handlegooglecilck = async () => {
          const provider = new GoogleAuthProvider()
          provider.setCustomParameters({prompt : 'select_account '})

          try {
             const resultgoogle = await signInWithPopup(auth,provider)
            
             console.log(resultgoogle)

             const res = await fetch('/api/auth/google' , {
                method : 'POST',
                headers : { 'Content-Type' : 'application/json'} ,
                body : JSON.stringify({
                    username : resultgoogle.user.displayName,
                    email : resultgoogle.user.email,
                    googlephotourl : resultgoogle.user.photoURL
                })
             })

             const data = await res.json()

             console.log(data,res)

             if ( res.ok )
                {
                    dispatch(signinsuccess(data))
                    navigate('/')
                }
          }
          catch(error){
            dispatch(signinfailure(error))
          }
    }
  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline
    onClick={handlegooglecilck}>
        <AiFillGoogleCircle className='w-6 h-6 mx-2' />
        <span className='text-base'> Continue with Google</span>
    </Button>
  )
}
