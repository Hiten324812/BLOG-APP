import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../component/DashSidebar'
import DashProfile from '../component/DashProfile'

export default function Dashboard() {

  const location = useLocation()

  const [tab,setab] = useState('')

  useEffect( ()=> {
    const urlparams = new URLSearchParams(location.search)
    const tabfromurl = urlparams.get('tab')
    
    setab(tabfromurl)

  } , [location.search])

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className='md:w-96'>
         <DashSidebar />
      </div>
       

       {
          tab === 'profile' && 

           <DashProfile />
          
       }
      
      
    </div>
  );
}
