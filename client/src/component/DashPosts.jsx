import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function DashPosts() {

    const [postdata,setpostdata] = useState([])

    const { currentUser } = useSelector( state => state.user )

    useEffect( () => {
        
        const fetchdata = async () => {
            const res = await fetch(`/api/post/getposts?userid=${currentUser._id}` ,{
                method : 'GET'
            })

            const data = await res.json()

            if (res.ok){
                setpostdata(data)
            }
        }

        if ( currentUser.isadmin ){
            fetchdata()
        }
       
    } , [currentUser._id])

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-200 scrollbar-thumb-slate-600
    dark:scrollbar-track-slate-100 
    '>
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
                    <Table.Body className="divide-y">
                         <Table.Row className='bg-white dark:bg-gray-700 dark:border-gray-700'>
                    <Table.Cell>
                     {new Date(post.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>
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
                      <Link to={`/delete-post/${post._id}`}>
                        <span className='hover:underline text-red-500'> Delete  </span>
                      </Link>
                    </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                   )
                 })
               }
          
               
               
           </Table>
           </>
        )  : 

        (<p> You have no posts </p>)
      }
    </div>
  )
}
