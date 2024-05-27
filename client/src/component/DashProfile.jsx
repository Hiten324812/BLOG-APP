import { Alert, Button, FileInput, TextInput } from 'flowbite-react'
import React, { useState ,useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
import { HiInformationCircle } from 'react-icons/hi'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {

  const { currentUser} = useSelector(state => state.user)

  const [imageFile , setImageFile] = useState(null)
  const [imageFileUrl , setimageFileUrl] = useState(null)
  const [uploadfile,setuploadfile] = useState(0) // for progress percentage
  
  const filePickeref = useRef()

  const [imagefileuploaderror,setimagefileuploaderror] = useState(null)


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
  
      } ,
      () => {
        getDownloadURL(uploadtask.snapshot.ref)
        .then( (downloadUrl) => {
          setimageFileUrl(downloadUrl);
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

  return (

    <div className='max-w-lg mx-auto w-full'>

     <h1 className=' my-7 text-center font-semibold text-3xl'>
       Profile 
     </h1>
    
       <form className='flex flex-col gap-8'>

        <input type='file' accept='image/*'
         onChange={handlefile}
         hidden
         ref={filePickeref}
         /> 


        <div className='relative w-32 h-32 self-center overflow-hidden 
        ' onClick={() => filePickeref.current.click()}>

        <img src={ imageFileUrl || currentUser.profilepicture} alt='picture' className={`object-cover h-full w-full rounded-full shadow-md border-[lightgray] border-4
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

          <TextInput type='text' id='password' placeholder='password'
          />

           <Button type='submit' gradientDuoTone='purpleToBlue' outline> <span className='text-xl' >
            Update 
            </span> </Button>
        
       </form>
      
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>
          Delete Account ?
        </span>
        <span className='cursor-pointer'>
          Sign Out 
        </span>
      </div>
    </div>

  )
}
