import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Spinner } from 'flowbite-react'
import { Link, useParams } from 'react-router-dom'
import CommentSection from '../component/CommentSection'

export default function PostPage() {

    const [loading,setloading] = useState(false)
    const [error ,seterror] = useState(null)
    const [post , setpost] = useState(null)

   

    const { postslug } = useParams()



    useEffect( () => {

        const fetchpost = async () => {

            try {

                setloading(true)

                const res = await fetch(`/api/post/getposts?slug=${postslug}`);

                const data = await res.json() ;


                if (!res.ok){
                  seterror('Something went wrong !')
                  setloading(false)
                }
                else{
   
                    setpost(data.posts[0])

                    setloading(false)
                    seterror(null)

                }
                

            } catch (error) {
                seterror('Something went wrong !')
                setloading(false)
            }
        }

        fetchpost()

    } , [postslug])

    if (loading)  return (
        <div className='flex justify-center items-center min-h-screen'>
            <Spinner className='h-12 w-12'/>
        </div>
    )

    if (post === undefined) return (
        <div className='flex justify-center pt-5 min-h-96'>

            <p className='text-3xl'> 404 page not found !!! </p>

        </div>
    )

 
  return (
    <div className='p-3 flex flex-col max-w-6xl min-h-screen mx-auto mt-5'>

        <h1 className='text-center font-serif text-4xl'> { post && post.title } </h1>

        <Link to={`/search?category=${post && post.category}`} className='self-center mt-5'>
        <Button color={'gray'} pill size={'xs'}> {post && post.category} </Button>
        </Link>

        <img src={post && post.image} alt='post image' className='mt-10 max-w-[600px] max-h-[400px] w-full self-center' />

        <div className='flex justify-between'>
            <span> 
                {post && new Date(post.createdAt).toLocaleDateString()} 
                </span>
                <span>
               {post && ( (post.content.length/1000).toFixed(0) || 1 ) } mins read 
                </span>
        </div>

        <div dangerouslySetInnerHTML={ { __html : post && post.content }}>
       
        </div>


       <CommentSection postid={post && post._id} />
     
        
    </div>
  )
}
