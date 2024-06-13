import { Button, Select, TextInput , Spinner } from 'flowbite-react'
import React , {useState , useEffect } from 'react'
import { useLocation ,useNavigate } from 'react-router-dom'

import PostCard from '../component/PostCard'
import SearchCard from '../component/SearchCard'

export default function Search() {

    const [sidebardata,setsidebardata] = useState({
        searchterm : '',
        sort : 'desc',
        category : 'uncategorized'
    })


    const [searchposts,setsearchposts] = useState([])

    const [loading,setloading] = useState(false)



    const location = useLocation()
    const navigate = useNavigate()




    useEffect ( () => {

        const urlparams = new URLSearchParams(location.search)

        const searchtermlurl = urlparams.get('searchterm')
        const sortfromurl = urlparams.get('sort')
        const categoryfromurl = urlparams.get('category')

        if (searchtermlurl || sortfromurl || categoryfromurl ) 
            {
                setsidebardata({
                    ...sidebardata,
                    searchterm : searchtermlurl,
                    sort : sortfromurl || 'desc',
                    category : categoryfromurl || 'uncategorized'
                })
            }

            const fetchposts = async() => {
                setloading(true)
                const searchquery = urlparams.toString()
               
                const res = await fetch(`/api/post/getposts?${searchquery}`,
                    {
                        method : 'GET'  
                    }
                )

                if(!res.ok)
                    {
                        setloading(false)
                    }
                    else
                    {
                        const data = await res.json()

                        setsearchposts(data.posts)
                        setloading(false)

                    }
            }

            fetchposts();




    } , [location.search])

    const handlechange = (e) => {
        if ( e.target.id === 'searchTerm' )
        {
             setsidebardata({
                ...sidebardata, searchterm : e.target.value
             })
        }

        if ( e.target.id === 'Sort')
        {
            setsidebardata({
                ...sidebardata,
                sort : e.target.value                
            })
        }

        if ( e.target.id === 'Category')
            {
                setsidebardata({
                    ...sidebardata,
                    category : e.target.value
                })
            }
    }

    const handlesubmit = (e) => {

   e.preventDefault();

   const urlparams = new URLSearchParams(location.search)



     urlparams.set('searchterm',sidebardata.searchterm)
    urlparams.set('sort',sidebardata.sort)
    urlparams.set('category',sidebardata.category)

   const searchquery = urlparams.toString();

   navigate(`/search?${searchquery}`)


    }

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-4 border-b md:border-r md:min-h-screen md:min-w-[380px]'>
         <form className='flex flex-col gap-8' onSubmit={handlesubmit}>
            <div className='flex items-center gap-4 '>
                <label>
                    Search Term :
                </label>
                <TextInput 
                placeholder='search...'
                id='searchTerm'
                type='text'
                onChange={handlechange}
                value={sidebardata.searchterm} />
            </div>
            <div className='flex items-center gap-4'>
                <label>
                    Category : 
                </label>

                <Select id='Category' value={sidebardata.category} onChange={handlechange}>
                    <option value={'uncategorized'}> uncategorized </option>
                    <option value={'nodejs'}> nodejs  </option>
                    <option value={'reactjs'}> reactjs  </option>
                    <option value={'javascript'}> javascript </option>
                </Select>
                
            </div>
            <div className='flex items-center gap-4'>
                <label>
                    Sort : 
                </label>
                <Select id='Sort' value={sidebardata.sort}  onChange={handlechange}>
                    <option value={'desc'}> Latest   </option>
                    <option value={'asc'}> Oldest  </option>
               
                </Select>
                
            </div>

            <Button type='submit' gradientDuoTone={'purpleToPink'} outline>
                Apply filters
            </Button>
            
         </form>

      </div>
      <div className='p-4 flex flex-col'>
        <h1 className='text-3xl mb-5'> Search results : </h1>
       
       <div className='flex flex-wrap gap-3'>
        
       {
            !loading && searchposts.length === 0 && (
                <p className='text-xl text-gray-400'> No posts found !! </p>
            )
        }

       {
        
             loading ? (
                <Spinner size={'xl'} className='self-center items-center w-full h-[80px] '/>
            ) :
             (
                  searchposts.map(
                    sp => <SearchCard post={sp} />
                  )
              )
            
        }
       </div>

      </div>
    </div>
  )
}
