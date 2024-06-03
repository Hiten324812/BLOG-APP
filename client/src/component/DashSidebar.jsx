import React from 'react'
import { Sidebar} from 'flowbite-react'
import { FaHome  } from 'react-icons/fa'

import { useEffect, useState } from 'react'

import {Link, useLocation} from 'react-router-dom'

import { HiArrowCircleRight, HiDocumentText, HiOutlineUserGroup , HiUser  } from 'react-icons/hi'

import { useDispatch , useSelector } from 'react-redux'

import { signoutSuccess } from '../redux/user/userSlice'

export default function DashSidebar() {

    const location = useLocation()

    const [tab,setab] = useState('')

    const dispatch = useDispatch()

    const { currentUser } = useSelector(state => state.user )
  
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
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
               <Link to='/dashboard?tab=profile'>
               <Sidebar.Item className='text-xl' active={tab === 'profile'} icon={HiUser} label={ currentUser.isadmin ? 'ADMIN' : 'USER' } labelColor='dark' as={'div'}>
                    Profile 
                </Sidebar.Item>
               </Link>
           
               { currentUser.isadmin && (
                 <Link to='/dashboard?tab=posts'>
                 <Sidebar.Item className='text-xl' active={tab === 'posts'} 
              icon={HiDocumentText} as={'div'}>
               Posts 
              </Sidebar.Item>
                 </Link>
               )}

            { currentUser.isadmin && (
                 <Link to='/dashboard?tab=getusers'>
                 <Sidebar.Item className='text-xl' active={tab === 'getusers'} 
              icon={HiOutlineUserGroup} as={'div'}>
               Users  
              </Sidebar.Item>
                 </Link>
               )}

                <Sidebar.Item className='text-xl cursor-pointer' icon={HiArrowCircleRight} onClick={handlesignout} >
                    SignOut 
                </Sidebar.Item>

            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
