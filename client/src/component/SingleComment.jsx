import React , {useState , useEffect} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { FaThumbsUp , FaThumbsDown } from 'react-icons/fa'
import { HiOutlineExclamationCircle} from 'react-icons/hi'
import { useSelector } from 'react-redux'

import { Button, Modal, Textarea, Toast} from 'flowbite-react'

export default function SingleComment( { commen , handlelike , onedit , ondelete }) {


    const [isediting,setisediting] = useState(false)

    const [editedcontent,seteditedcontent] = useState(commen.content)

    const navigate = useNavigate()

    const [showmodel,setshowmodel] = useState(false)

    const { currentUser} = useSelector( state => state.user )

   

  
    const handledit = async () => {
        setisediting(true);
    }
    
    const handlesave = async () => {

        try {
            
            const res = await fetch(`/api/comment/editcomment/${commen._id}` , {
                method : 'POST' ,
                headers : {
                    'content-Type' : 'application/json'
                } ,
                body : JSON.stringify( {
                  content : editedcontent
              })
            })

            
            const data = await res.json();
            

            if (!res.ok)
                {
                    console.log(data.message)
                    console.log('cannot done editing comment')
                }
                else
                {
                   
                    onedit(commen,data)
                    seteditedcontent(data.content)
                }

                setisediting(false)

        } catch (error) {

            console.log('something went wrong')
            
        }
    }

    const handledelete = async (commentid)=> {

   

      setshowmodel(false)

      try {

        
       
         const res = await fetch(`/api/comment/deletecomment/${commentid}` ,{
           method : 'DELETE'
         })
 
         const data = await res.json();

         console.log(data)
 
         if (!res.ok)
           {
             console.log('error')
           }
           else
           {

            ondelete(commen)
    

           }
       
      } catch (error) {
         console.log('something went wrong')
      } 
 
     }

    


  return (
    <>

         

     
     <div className='flex flex-row gap-3 ' key={commen._id}>

                <div className='self-center flex-shrink-0'>
     
               <img className='h-10 w-10 rounded-full' src={commen.userid.profilepicture} />

            
               </div>
                 
                 <div className='flex flex-col w-full'>

                 <p className='text-lg font-semibold'> @{commen.userid.username} <span className='text-sm mx-1 text-gray-600 dark:text-gray-400'>
                 {moment(commen.createdAt).fromNow()}
                </span> </p>

                {
                  isediting ? 
                  (
                    <>
                    <Textarea 
                    className='w-full p-3 mb-2'
                    value={editedcontent}
                    onChange={(e) => {
                      seteditedcontent(e.target.value)
                    } }
                     /> 
                     <div className='flex justify-end gap-2'>
                        <Button type='button'
                        gradientDuoTone={'purpleToBlue'}
                         onClick={handlesave}
                        >
                            save
                        </Button>
                        <Button type='button'
                        gradientDuoTone={'purpleToBlue'}
                        outline
                        onClick={ () => {
                            seteditedcontent(commen.content)
                            setisediting(false)
                        }}
                        >
                            cancel
                        </Button>
                     </div>
                     </>
                  ) :
                   ( <><p className='break-all'> {commen.content} </p><div className='flex flex-row gap-3 mt-3'>

                        <button type='button' onClick={() => {
                          handlelike(commen._id)
                        } } className='flex gap-1'>
                          <FaThumbsUp className={`h-5 w-5 hover:text-blue-500 ${currentUser && commen.likes.includes(currentUser._id) && 'text-blue-500'}`} />
                        </button>

                        <span> {commen.numberoflikes} likes </span>

                        {currentUser && (currentUser._id === commen.userid._id) && (
                          <>
                            <button type='button' className='text-gray-600 hover:text-blue-500  dark:text-gray-200 dark:hover:text-blue-600 ' onClick={handledit}>
                              Edit
                            </button>
                            <button type='button' onClick={ () => setshowmodel(true) } className='text-gray-600 hover:text-blue-500  dark:text-gray-200 dark:hover:text-blue-600'>
                              delete
                            </button>
                          </>

                        )}
                      </div></>

                   )
                }

                 
                  </div>

                   
      <Modal show={showmodel} size="md" onClose={() => setshowmodel(false)} popup>
        <Modal.Header />
        <Modal.Body className=' dark:bg-gray-500' >
          <div className="text-center">
            <HiOutlineExclamationCircle className='mx-auto h-12 w-12 
           dark:text-gray-200 mb-4' />

           <h3 className='text-lg mb-4 dark:text-gray-400'>
            delete your comment permanently ?
           </h3>

           <div className='flex justify-center gap-4'>
           <Button color='failure' onClick={ () =>  handledelete(commen._id) } > Yes, I'm sure </Button>
              <Button color='gray'onClick={ () => setshowmodel(false) } > No, Cancel  </Button>
           </div>
          </div>
        </Modal.Body>
      </Modal>

  
  
               
              </div>
            

    </>
  )
}
