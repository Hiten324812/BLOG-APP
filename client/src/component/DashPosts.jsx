import { Table , Modal , Button , Toast } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { HiOutlineExclamationCircle , HiCheck} from 'react-icons/hi'


export default function DashPosts() {

    const [postdata,setpostdata] = useState([])

    const [showmodel,setshowmodel] = useState(false)

    const [postdeleteid,setpostdeleteid] = useState(null)

    const [showmessage,setshowmessage] = useState(null)


    const { currentUser } = useSelector( state => state.user )

    useEffect( () => {
        
        const fetchdata = async () => {
            const res = await fetch(`/api/post/getposts?userid=${currentUser._id}` ,{
                method : 'GET'
            })

            const data = await res.json()

            if (res.ok){
                setpostdata(data.posts)
                
            }
        }

        if ( currentUser.isadmin ){
            fetchdata()
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

      const res = await fetch(`/api/post/delete/${postdeleteid}/${currentUser._id}` ,
        {
          method : 'DELETE'
        }
      )

      const data = await res.json();

      console.log(data)

      if(!res.ok)
        {
          setshowmessage(data.message)
        }
        else
        {

         
        setpostdata( (prev) =>  prev.filter( (post) => post._id !== postdeleteid ) )

          setpostdeleteid(null)
          setshowmessage('Post Deleted Successfully')
          
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
        currentUser.isadmin && postdata.length > 0 ? 
        (
           <>
           <Table hoverable className='shadow-md'>

            <Table.Head>
            <Table.HeadCell>
                Date updated
               </Table.HeadCell>
               <Table.HeadCell>
               post image 
               </Table.HeadCell>
               
               <Table.HeadCell>
                post title 
               </Table.HeadCell>
               
               <Table.HeadCell>
                category
               </Table.HeadCell>
               <Table.HeadCell>
                delete 
               </Table.HeadCell>

               <Table.HeadCell>
                edit 
               </Table.HeadCell>
            </Table.Head>

            
               {
                 postdata.map( (post) => {
                   return (
                    <Table.Body className="divide-y" key={post._id}>
                         <Table.Row className='bg-white dark:bg-gray-700 dark:border-gray-700'>
                    <Table.Cell>
                     {new Date(post.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`} >
                
                      <img src={post.image} className='w-20 h-20' />
                      </Link>
                    </Table.Cell>
                    <Table.Cell className='font-medium text-gray-900 dark:text-gray-200 '>
                     {post.title}
                    </Table.Cell>
                    <Table.Cell>
                     {post.category}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/update-post/${post._id}`}>
                       <span className='text-teal-500 hover:underline'>
                        Edit 
                       </span>
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                     
                    <span className='hover:underline text-red-500 cursor-pointer'
                    onClick={ () => {
                      setshowmodel(true)
                      setpostdeleteid(post._id)
                    }}
                        > 
                        Delete  </span>
                     
                    </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                   )
                 })
               }
          
               
               
           </Table>
           </>
        )  : 

        (<p className='text-3xl mt-8'> You have no posts </p>)
      }

<Modal show={showmodel} size="md" onClose={() => setshowmodel(false)} popup>
        <Modal.Header />
        <Modal.Body className=' dark:bg-gray-500' >
          <div className="text-center">
            <HiOutlineExclamationCircle className='mx-auto h-12 w-12 
           dark:text-gray-200 mb-4' />

           <h3 className='text-lg mb-4 dark:text-gray-400'>
            Are you sure you want to delete your account ?
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
