import { Table , Modal , Button , Toast } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { HiOutlineExclamationCircle , HiCheck} from 'react-icons/hi'

import { FaCheck , FaTimes } from 'react-icons/fa'


export default function DashUsers() {


    const [showmodel,setshowmodel] = useState(false)

    const [userdeleteid,setuserdeleteid] = useState(null)

    const [showmessage,setshowmessage] = useState(null)

    const [users,setusers] = useState([])

    const [notaccess,setnotaccess] = useState(null)


    const { currentUser } = useSelector( state => state.user )

    useEffect( () => {
        
        const fetchdata = async () => {
            const res = await fetch( '/api/user/getusers' ,{
                method : 'GET'
            })

            const data = await res.json()

            if (res.ok){
                setusers(data.users)
            }
        }

        if ( currentUser.isadmin )
          {
           setnotaccess(null)
            fetchdata()
        }
        else
        {
           setnotaccess('you have not allowed to see all users details')
        }
       
    } , [currentUser._id])

    useEffect ( () => {
     const timer = setTimeout(() => {
      setshowmessage(null)
     } , 5000);

     return () => clearTimeout(timer)

    } , [showmessage])

    const handledelete = async () => {

      setshowmodel(false)

      try{

      const res = await fetch(`/api/user/deleteuser/${userdeleteid}` ,
        {
          method : 'DELETE'
        }
      )

      const data = await res.json();


      if(!res.ok)
        {
          setshowmessage(data.message)
        }
        else
        {

        
          setusers( (prev) =>  prev.filter( (user) => user._id !== userdeleteid ) )

          setuserdeleteid(null)
          setshowmessage('User Deleted Successfully')
          
        }


      }
      catch (error) {

        setshowmessage('something went wrong')
   

      }

    }

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 mb-8 scrollbar scrollbar-track-slate-200 scrollbar-thumb-slate-600
    dark:scrollbar-track-slate-100'>

     {
       showmessage && (
        <Toast className='mx-auto mb-5'>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
          <HiCheck className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal"> {showmessage} </div>
        <Toast.Toggle />
        </Toast>
       )
     }


      {
        currentUser.isadmin && users.length > 0 ? 
        (
           <>
           <Table hoverable className='shadow-md'>

            <Table.Head>
            <Table.HeadCell>
                Date created 
                (MM/DD/YY)
               </Table.HeadCell>
               <Table.HeadCell>
               user image 
               </Table.HeadCell>
               
               <Table.HeadCell>
               username
               </Table.HeadCell>
               
               <Table.HeadCell>
                email 
               </Table.HeadCell>
               <Table.HeadCell>
                 admin 
               </Table.HeadCell>
               <Table.HeadCell>
                delete 
               </Table.HeadCell>

            </Table.Head>

            
               {
                 users.map( (user) => {
                   return (
                    <Table.Body className="divide-y" key={user._id}>
                         <Table.Row className='bg-white dark:bg-gray-700 dark:border-gray-700'>
                    <Table.Cell>
                     {new Date(user.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                     
                      <img src={user.profilepicture} className='w-20 h-20' />
                   
                    </Table.Cell>
                    <Table.Cell className='font-medium text-gray-900 dark:text-gray-200 '>
                     {user.username}
                    </Table.Cell>
                    <Table.Cell>
                     {user.email}
                    </Table.Cell>
                    <Table.Cell>
                       { user.isadmin === true ? <FaCheck className='text-green-500' /> : <FaTimes className='text-red-500' /> }
                    </Table.Cell>
                    <Table.Cell>
                     
                  { !user.isadmin ? (
                     <span className='hover:underline text-red-500 cursor-pointer'
                     onClick={ () => {
                       setshowmodel(true)
                       setuserdeleteid(user._id)
                     }}
                           > 
                           Delete  </span>
                        
                  ) : 'you cannot delete admin '}
                    </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                   )
                 })
               }
          
               
               
           </Table>
           </>
        )  : 

        (<p className='text-3xl mt-8'> { notaccess ? notaccess : 'You have no Users'  }   </p>)
      }

<Modal show={showmodel} size="md" onClose={() => setshowmodel(false)} popup>
        <Modal.Header />
        <Modal.Body className=' dark:bg-gray-500' >
          <div className="text-center">
            <HiOutlineExclamationCircle className='mx-auto h-12 w-12 
           dark:text-gray-200 mb-4' />

           <h3 className='text-lg mb-4 dark:text-gray-400'>
            Are you sure you want to delete this user account ?
           </h3>

           <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handledelete} > Yes, I'm sure </Button>
              <Button color='gray'onClick={ () => setshowmodel(false) } > No, Cancel  </Button>
           </div>
          </div>
        </Modal.Body>
      </Modal>


    </div>
  )
}
