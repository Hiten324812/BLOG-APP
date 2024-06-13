import React from 'react'

import { Link } from 'react-router-dom'

export default function PostCard( {post}) {
  return (
    <div className='group relative overflow-hidden w-[400px] h-[350px] rounded-lg transition-all border border-teal-500'>
       <Link to={`/post/${post.slug}`}>
         <img src={post.image} className='h-[250px] w-full group-hover:h-[200px] transition-all duration-700 z-10' />
        
       </Link>

       <div className='p-3'>
        <p className='text-lg font-semibold line-clamp-2'> {post.title} </p>
        <span className='italic'> {post.category} </span>
        <Link to={`/post/${post.slug}`} className='absolute left-0 right-0 z-20 group-hover:bottom-0 bottom-[-200px] border border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white text-center py-2 transition-all duration-300 rounded-lg'>
            Read More 
        </Link>
       </div>
       
    </div>
  )
}
