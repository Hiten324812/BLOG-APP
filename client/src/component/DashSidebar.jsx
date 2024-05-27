import React from 'react'
import { Sidebar} from 'flowbite-react'
import { FaHome  } from 'react-icons/fa'

import { useEffect, useState } from 'react'

import {Link, useLocation} from 'react-router-dom'

import { HiArrowCircleRight, HiUser } from 'react-icons/hi'

import { useDispatch } from 'react-redux'

import { signoutSuccess } from '../redux/user/userSlice'

export default function DashSidebar() {

    const location = useLocation()

    const [tab,setab] = useState('')

    const dispatch = useDispatch()
  
    useEffect( ()=> {
      const urlparams = new URLSearchParams(location.search)
      const tabfromurl = urlparams.get('tab')
      
      setab(tabfromurl)
  
    } , [location.search])

    const handlesignout = async() => {
      try {
        const res = await fetch('/api/user/signout' , {
          method : 'POST',
        });
    
        const data = await res.json();
        if (!res.ok){
          console.log(data.message)
        }else
        {
          dispatch(signoutSuccess())
        }
      } catch (error) {
        console.log(error.message)
      }
    }
  

  return (
    <Sidebar className='w-full'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
               <Link to='/dashboard?tab=profile'>
               <Sidebar.Item className='text-xl' active={tab === 'profile'} icon={HiUser} label='user' labelColor='dark' as={'div'}>
                    Profile 
                </Sidebar.Item>
               </Link>
                <Sidebar.Item className='text-xl cursor-pointer' icon={HiArrowCircleRight} onClick={handlesignout} >
                    SignOut 
                </Sidebar.Item>

            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
