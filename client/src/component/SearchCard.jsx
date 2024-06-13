import { Card } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SearchCard( {post}) {
  return (
    <Link to={`/post/${post.slug}`}>
     <Card imgSrc={post.image} className='max-w-md border-solid border-slate-400 hover:shadow-2xl 
     hover:shadow-blue-500
     dark:hover:shadow-cyan-500'>

<h1 className='text-2xl tracking-tight min-h-16 text-gray-900 dark:text-gray-200
  '> {post.title} </h1>

<p className='font-normal text-gray-700 dark:text-gray-400'> {post.category} </p>

</Card>
    </Link>
  )
}
