import { Alert, Button, FileInput, Modal, Spinner, TextInput } from 'flowbite-react'
import React, { useState ,useRef, useEffect } from 'react'
import { useSelector ,useDispatch } from 'react-redux'
import { signinstart , signinsuccess , signinfailure , updatestart , updatesuccess , updatefailure , deleteuserstart , deleteusersuccess , deleteuserfailure , signoutSuccess } from '../redux/user/userSlice'
import { getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
import { HiInformationCircle, HiOutlineExclamation, HiOutlineExclamationCircle } from 'react-icons/hi'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {

  const { currentUser , loading , error : errormessage } = useSelector(state => state.user)

  const dispatch = useDispatch()

  const [imageFile , setImageFile] = useState(null)
  const [imageFileUrl , setimageFileUrl] = useState(null)
  const [uploadfile,setuploadfile] = useState(0) // for progress percentage
  
  const filePickeref = useRef()

  const [imagefileuploaderror,setimagefileuploaderror] = useState(null)
  const [formdata,setformdata] = useState({})
  const [uploading,setuploading] = useState(false)
  const [updateusersuccess,setupdateusersuccess] = useState(null)
  const [updateusererror , setupdateusererror] = useState(null)
  const [showmodel,setshowmodel] = useState(false)

  useEffect( () => {
    if(imageFile)
      {
        uploadImage()
      }
      
  } , [imageFile])

  // service firebase.storage {
  //   match /b/{bucket}/o {
  //     match /{allPaths=**} {
  //       allow read;
  //       allow write: if 
  //       request.resource.size < 2 * 1024 * 1024 &&
  //       request.resource.contentType.matches("image/.*")
  //     }
  //   }
  // }
  const uploadImage = async () => {

    setimagefileuploaderror(null)
    setuploading(true)
    const storage = getStorage(app)
    const filename = new Date().getTime() + imageFile.name

    const storageref = ref(storage,filename)

    const uploadtask = uploadBytesResumable(storageref,imageFile)

    uploadtask.on(
      'state_changed' , 
      (snapshot) => {
        const progress = 
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setuploadfile(progress.toFixed(2))
      } , 
      (error) => {
         setimagefileuploaderror('could not upload image  (file must be less than 2 MB)')
         setimageFileUrl('')
         setuploadfile(0)
         setImageFile(null)
         setuploading(false)
  
      } ,
      () => {
        getDownloadURL(uploadtask.snapshot.ref)
        .then( (downloadUrl) => {
          setimageFileUrl(downloadUrl);
          setuploadfile(0)
          setuploading(false)
          setformdata({...formdata, profilepicture : downloadUrl})
        })
      }
    )
  }

  const handlefile = (e) => {
     
    const file = e.target.files[0]

    if (file){
      setImageFile(file)
      setimageFileUrl(URL.createObjectURL(file))
    }
    
  }

  const handlechange = (e) => {
    setformdata({...formdata , [e.target.id] : e.target.value.trim() })
  }
  const handlesubmit =  async (e) => {
       e.preventDefault();

       setupdateusersuccess(null)
       setupdateusererror(null)

       dispatch(updatefailure(null))

       if ( Object.keys(formdata).length === 0) {
           return setupdateusererror('no changes made')
       }

       if ( !formdata.password ) {
          return setupdateusererror('password does not empty')
       }

       
       try{
          
         dispatch(updatestart());

         const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method : 'PUT' ,
          headers : { 'content-Type' : 'application/json'} ,
          body : JSON.stringify(formdata)
         } )

        const data = await res.json()

    
        if (res.ok) {
          dispatch(updatesuccess(data)) 
          setimageFileUrl(null)
          setImageFile(null)
          setupdateusersuccess(' User profile updated successfully !!!')
        }
        else
        {
          dispatch(updatefailure(data.message))
        }

       } catch(error) {
            dispatch(updatefailure(error.message))
       }

  }

  const handledelete = async() => {

     setshowmodel(false);
     try {
  
       dispatch(deleteuserstart()) 
       const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method : 'DELETE'
       });

       const data = res.json();
      
       if (!res.ok) {
         dispatch(deleteuserfailure(data.message))
       }
       else {
        dispatch(deleteusersuccess())
       }

     } catch(error) {
              dispatch(deleteuserfailure(error.message))
     }
     

  }

  const handlesignout = async() => {
    try {
      const res = await fetch('/api/user/signout' , {
        method : 'POST',
      });
  
      const data = await res.json();
      if (!res.ok){
        console.log(data.message)
      }else
      {
        dispatch(signoutSuccess())
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (

    <div className='max-w-lg mx-auto w-full'>

     <h1 className=' my-7 text-center font-semibold text-3xl'>
       Profile 
     </h1>
    
       <form className='flex flex-col gap-8' onSubmit={handlesubmit}>

        <input type='file' accept='image/*'
         onChange={handlefile}
         hidden
         ref={filePickeref}
         /> 


        <div className='relative w-32 h-32 self-center overflow-hidden 
        ' onClick={() => filePickeref.current.click()}>

        <img src={ imageFileUrl || currentUser.profilepicture } alt='picture' className={`object-cover h-full w-full rounded-full shadow-md border-[lightgray] border-4
        ${uploadfile && uploadfile < 100 && 'opacity-50' }`}   />

       { uploadfile && (
          <CircularProgressbar 
          value={uploadfile || 0 } 
          text={`${uploadfile}%`}
          strokeWidth={5}
          styles={{
           root : {
               width : '100%',
               height : '100%',
               position : 'absolute',
               top : 0,
               left : 0
           } , 
           path : {
             stroke : `rgba(62,152,199,${uploadfile})`
           }
          }}
          />
       )}

        </div>

         { imagefileuploaderror  && (
          <Alert color="failure" icon={HiInformationCircle} className='text-base'>
            {imagefileuploaderror}
          </Alert>
         )
         
         }
            
          <TextInput type='text' id='username' placeholder='username'
           defaultValue={currentUser.username} disabled />

          <TextInput type='text' id='email' placeholder='username'
           defaultValue={currentUser.email} disabled/>

          <TextInput type='text' id='password' placeholder='password' onChange={handlechange}
          />

          { errormessage ? (
             <Alert color='failure' className='text-base'>
              {errormessage}
             </Alert>
          ) : null }

           <Button type='submit' gradientDuoTone='purpleToBlue' outline disabled={loading || uploading}> <span className='text-xl' >
             { loading || uploading ? 
             ( <>
               <Spinner />
               <span className='mx-2 text-base'> Loading... </span>
              </> ) : 'update'
             }
            </span> </Button>
        
       </form>

       { updateusersuccess && (
        <Alert color='success' className='mt-5 text-base'>
          {updateusersuccess}
        </Alert>
       )}

       {
         updateusererror && (
          <Alert color='failure' className='mt-5 text-base'>
            {updateusererror}
          </Alert>
         )
       }
      
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer' onClick={ () => setshowmodel(true)}>
          Delete Account ?
        </span>
        <span onClick={handlesignout} className='cursor-pointer'>
          Sign Out 
        </span>
      </div>

      <Modal show={showmodel} onClose={() => setshowmodel(false)} popup size="md">
        <Modal.Header />
        <Modal.Body >
          <div className="text-center">
            <HiOutlineExclamationCircle className='mx-auto h-12 w-12
          text-gray-400 dark:text-gray-200 mb-4' />

           <h3 className='text-lg mb-4 text-gray-500 dark:text-gray-400'>
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
