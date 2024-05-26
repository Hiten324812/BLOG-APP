import React from 'react'
import { Sidebar} from 'flowbite-react'
import { FaHome  } from 'react-icons/fa'

import { useEffect, useState } from 'react'

import {Link, useLocation} from 'react-router-dom'

import { HiArrowCircleRight, HiUser } from 'react-icons/hi'

export default function DashSidebar() {

    const location = useLocation()

    const [tab,setab] = useState('')
  
    useEffect( ()=> {
      const urlparams = new URLSearchParams(location.search)
      const tabfromurl = urlparams.get('tab')
      
      setab(tabfromurl)
  
    } , [location.search])

  return (
    <Sidebar className='w-full'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
               <Link to='/dashboard?tab=profile'>
               <Sidebar.Item className='text-xl' active={tab === 'profile'} icon={HiUser} label='user' labelColor='dark' as={'div'}>
                    Profile 
                </Sidebar.Item>
               </Link>
                <Sidebar.Item className='text-xl cursor-pointer' icon={HiArrowCircleRight}>
                    SignOut 
                </Sidebar.Item>

            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
