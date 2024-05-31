import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import { HiInformationCircle } from "react-icons/hi";
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { app } from '../firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useNavigate , useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UpdatePost() {

  const [file,setfile] = useState(null)

  const [uploaderror,setuploaderror] = useState('')

  const [imageuploadprogress,setimageuploadprogress] = useState(null)

  const [imagefileurl ,setimagefileurl] = useState('')

  const [formdata,setformdata] = useState({})

  const [formerror,setformerror] = useState(null)

  const navigate = useNavigate()
 
 const { postid } = useParams()

 const { currentUser } = useSelector( state => state.user )

 useEffect ( () => {
    try{

        const fetchpost = async () => {

            const res =
             await fetch(`/api/post/getposts?postid=${postid}`)

            const data = await res.json()

            if (!res.ok){
                console.log(data.message)
                setformerror(data.message)
                return ;
            }
            else
            {
                setformerror(null)
                setformdata(data[0])
            }


        }

        fetchpost();

    }
    catch (error) {
        console.log(error.message)
    }

 } , [postid])

  const handleuploadimage = async () => {
       
     try {
      
      if (!file) {
        setuploaderror('first select a image')
        return;
     }
       
     setuploaderror(null);

     const storage = getStorage(app)

     

     const filename = new Date().getTime() + file.name ;

     const storageref = ref(storage,filename)

     const uploadtask = uploadBytesResumable(storageref,file) 

     uploadtask.on(
       'state_changed' ,
       (snapshot) => {
         const progress = 
         (snapshot.bytesTransferred / snapshot.totalBytes) * 100 ;
         setimageuploadprogress(progress.toFixed(0))
       } ,
       (error) => {
         setuploaderror('image upload fail')
         setimageuploadprogress(null)
       } ,
       () => {
         getDownloadURL(uploadtask.snapshot.ref)
         .then( (downloadUrl) => {
            setimagefileurl(downloadUrl)
            setimageuploadprogress(null)
            setformdata({...formdata , image : downloadUrl})
         })
       }
     )



     } catch (error) {
         setuploaderror('image upload failed')
         setimageuploadprogress(null)
     }


  }

  const handlesubmit = async (e) => {

    if (!formdata.title) {
      setformerror('please give a post title name');
      return ;
    }

    e.preventDefault();
      
     try {
        const res = await fetch(`/api/post/update-post/${postid}/${currentUser._id}`,{
          method :'PUT',
          headers : { 'content-Type' : 'application/json '},
          body : JSON.stringify(formdata)
        })

        const data = await res.json()

        if (!res.ok) {
           setformerror(data.message)
        }
        else
        {
          setformerror(null)
          navigate(`/dashboard?tab=posts`)
        }
     } catch (error) {
        setformdata('something went wrong')
     }
  }

   return (
    <div className='max-w-3xl mx-auto p-3 mb-14'>
       <h1 className='text-3xl my-8 text-center'> update post </h1>
       <form className='flex flex-col gap-4 mb-5' onSubmit={handlesubmit}>
         <div className='flex flex-col gap-8 justify-between md:flex-row'>
             <TextInput type='text' id='title' placeholder='Title' required className='flex-1' onChange={ (e) => setformdata({...formdata , title : e.target.value})}
             value={formdata.title} />

             <Select onChange={ (e) => setformdata({...formdata , category : e.target.value })} value={formdata.category} required>
                <option value="uncategorized"> Select a category </option>
                <option value='javascript'> javascript </option>
                <option value='reactjs'> reactjs </option>
                <option value='nodejs'> nodejs </option>
             </Select>
         </div>

         <div className='flex p-4 items-center justify-between border-4 border-dotted border-teal-500 '>

           <FileInput  type='file' accept='image/*' onChange={ (e) => setfile(e.target.files[0]) } />

           <Button type='button' gradientDuoTone='purpleToBlue' onClick={handleuploadimage} disabled={imageuploadprogress} outline> 
           
           { imageuploadprogress ? (
             <div className='h-16 w-16'>
               <CircularProgressbar
               value={imageuploadprogress}
               text={`${imageuploadprogress}%`}
              />
             </div>
            ) : 'upload image' }
           </Button>


         </div>

         { uploaderror && (
            <div>
               <Alert color='failure'>
               { uploaderror }
            </Alert>
            </div>
           )}

           { formdata.image && (
            <div>
              <img src={formdata.image} alt='postimage' />
            </div>
           )}
          

         <ReactQuill theme='snow' placeholder='write something' className='h-72 mb-12' required 
          onChange={ (value) => setformdata({...formdata,content : value}) }
          value={formdata.content}
         />

         <Button type='submit' gradientDuoTone='purpleToPink' disabled={imageuploadprogress}> update post </Button>
       </form>

       { formerror && (
        <div>
          <Alert color='failure' icon={HiInformationCircle}>
            {formerror}
          </Alert>
          </div>
       )}
    </div>
  )
}
