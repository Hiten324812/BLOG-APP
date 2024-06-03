import { Alert, Button, TextInput, Textarea } from 'flowbite-react'
import React , {useState , useEffect } from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'


export default function CommentSection( { postid } ) {
    const { currentUser } = useSelector(state => state.user )

    const [comment , setcomment] = useState('')

    const [allcomments , setallcomments] = useState([])
  
    const [commenterror , setcommenterror] = useState(null)

    const [totalcomment , setotalcomment] = useState(0)

    const fetchcomments = async () => {

      setcommenterror('')

      const res = await fetch (`/api/comment/getcomments/${postid}`,{
        method : 'GET'
      })


      const data = await res.json();


      if (!res.ok)
        {
           
           setcommenterror('fetching comment error')
        }
        else
        {
           setallcomments(data.comments)
           setotalcomment(data.totalcomments)
           setcommenterror('')
        }

    }

    const handlesubmitcomment = async (e) => {

      e.preventDefault();

      try {
          
         const res = await fetch('/api/comment/create-comment', {
          method : 'POST' ,
          headers : {
            'content-Type' : 'application/json'
          },
          body : JSON.stringify({
            content : comment ,
            postid,
            userid : currentUser._id
          })
         })

         const data = await res.json()

         if (!res.ok)
          {
            console.log('cannot make comment')
          }
          else
          {
            setcomment('')
            fetchcomments();
          }

      } catch (error) {

        console.log(error.message)
        
      }


    }


    useEffect( () => {

      if (postid)
        {
          fetchcomments();
        }

    } , [postid] )
    
    
  return (
    <div className='max-w-2xl w-full mx-auto'>

    
      { currentUser ? (
        <div className='flex items-center gap-2 my-5'>
        <p> signed in as : </p>    
        <img  src={currentUser.profilepicture} className='h-6 w-6 rounded-full' alt=''/>
        <Link to='/dashboard?tab=profile' className='text-cyan-500 hover:underline'>
         @{currentUser.username}
        </Link>
        </div>
        ) : (
            <div className='text-teal-500 my-5'>
                You must be signed in to comment.
                <Link to={'/signin'} className='text-blue-500 hover:underline'> Sign in </Link>
            </div>
        )}

        {
          currentUser && (
            <form className='border border-teal-500 rounded-md p-3' onSubmit={handlesubmitcomment}>
              <Textarea placeholder='Add a comment... ' rows={3}
              maxLength={'200'}
              onChange={ (e) => setcomment(e.target.value) }
              value={comment}
              />

              <div className='flex justify-between my-3 items-center'>
                <p> {200 - comment.length} characters remaining </p>
                <Button type='submit' outline gradientDuoTone={'purpleToBlue'}> submit  </Button>
              </div>
            </form>
          )

        }

        {
           commenterror && (
            <Alert color={'failure'}>

              {commenterror}

            </Alert>
           )
        }

        <div className='text-3xl my-5'>

          <p> {totalcomment} comments : </p>

        </div>

        {
           (allcomments.length > 0) ? (
              
           <div className='flex flex-col gap-3'>      
           {
             allcomments.map( (com) => {

            return (
              <div className='flex flex-row gap-3' key={com._id}>

                <div className='self-center flex-shrink-0'>
     
               <img className='h-10 w-10 rounded-full' src={com.userid.profilepicture} />

            
               </div>
                 
                 <div className='flex flex-col'>

                 <p className='text-lg font-semibold'> @{com.userid.username} <span className='text-sm mx-1 text-gray-600 dark:text-gray-400'>
                 {moment(com.createdAt).fromNow()}
                </span> </p>

                 <p className='break-all'> {com.content} </p>

                  </div>
               
              </div>
            
            )
             })
           }

           </div>

           ) : (
              
               <p> No comments yets </p>
              
           )
        }

      

    </div>
  )
}
