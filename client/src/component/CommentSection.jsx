import { Alert, Button, TextInput, Textarea, Toast } from 'flowbite-react'
import React , {useState , useEffect } from 'react'

import { useSelector } from 'react-redux'
import { Link , useNavigate } from 'react-router-dom'

import { HiCheck } from 'react-icons/hi'


import SingleComment from './SingleComment'


export default function CommentSection( { postid } ) {
    const { currentUser } = useSelector(state => state.user )

    const [comment , setcomment] = useState('')

    const [allcomments , setallcomments] = useState([])
  
    const [commenterror , setcommenterror] = useState(null)

    const [totalcomment , setotalcomment] = useState(0)

    const [deleterror,setdeleterror] = useState(null)

    useEffect ( () => {
     
      if ( deleterror !== null )
        {
          console.log('delete error')

          const timer = setTimeout( () => {
            setdeleterror(null)
          } , 2000 )
     
     
          return () => clearTimeout(timer)
    
        }
      
    
     } , [deleterror]) 



    
    const navigate = useNavigate()



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

    const handlelike = async (commentid) => {
       try {
           
         
         if (!currentUser)
          {
           navigate('/signin');
           return ;
          }



         const res = await fetch(`/api/comment/likecomment/${commentid}`,{
          method : 'PUT'
         });

         const data = await res.json()

         if (!res.ok)
          {
              console.log('cannot like comment')
          }
          else
          {
             setallcomments( allcomments.map ( (com) => {
              return (
                (commentid === com._id) ? 
                {
                  ...com,
                  likes : data.likes,
                  numberoflikes : data.numberoflikes
                } : com
              )
             }
            )
          ) 
           
           
          }

       } catch (error) {
           console.log('internal server error')
       }
    }

    const onedit = async(samplecom,editedcontent) =>{


      setallcomments( allcomments.map( (com) => 
        samplecom._id === com._id ? (
             { ...com , content : editedcontent.content }
        ) : com 
      ))
    }

    const ondelete = async(comm) => {
        
         setallcomments ( allcomments.filter( (com) => com._id !== comm._id) )
         setotalcomment(totalcomment-1)
         setdeleterror('comment deleted')

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
             allcomments.map( (com) => 
              <SingleComment commen={com} 
             handlelike={handlelike} 
             onedit={onedit} 
             ondelete={ondelete}
             key={com._id} />
            )
           }

           </div>

           ) : (
              
               <p> No comments yets </p>
              
           )
        }


       {
        deleterror && (
          <Toast className='fixed bottom-11 left-11'>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
        <HiCheck className="h-5 w-5" />
       </div>
       <div className="ml-3 text-sm font-normal"> { deleterror }</div>
        <Toast.Toggle />
        </Toast>

        )
       }
        
      
     

    </div>
  )
}
