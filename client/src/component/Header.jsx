
import {Avatar, Button, Dropdown, Navbar, TextInput} from 'flowbite-react'

import { Link , useLocation } from 'react-router-dom'

import { AiOutlineSearch } from 'react-icons/ai'

import { FaMoon , FaSun } from 'react-icons/fa'

import { useSelector ,useDispatch } from 'react-redux'

import { toggletheme } from '../redux/theme/themeSlice'

import { signoutSuccess } from '../redux/user/userSlice'

export default function Header() {

  const { currentUser } = useSelector(state => state.user)
  const {theme} = useSelector(state => state.theme)

  const dispatch = useDispatch()

  const path = useLocation().pathname;

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
    <Navbar className='border-b-2'>
      <Link to='/' className='self-center text-base md:text-2xl'>
      
      <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white' >Hiten's</span>
       Blog
      </Link>

      <form className='md:order-3'>
        <TextInput
        type='text'
        placeholder='search'
        rightIcon={AiOutlineSearch}
        className='hidden lg:inline'
         />
      </form>

      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>

      <div className='flex gap-2 md:order-last'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' onClick={ () => dispatch(toggletheme())}>
           { theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        { currentUser ? (
           <Dropdown
           arrowIcon={false}
           inline
           label={
            <Avatar 
            alt='user'
            img={currentUser.profilepicture}
            rounded/>
           }>

            <Dropdown.Header>
              <span className='block text-base'>
                @{currentUser.username}
              </span>
              <span className='block text-base font-medium text-ellipsis'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to='/dashboard?tab=profile'>
             <Dropdown.Item>
              Dashboard 
             </Dropdown.Item>
            </Link>

            <Dropdown.Divider />

            <Dropdown.Item onClick={handlesignout}>
              Sign Out
            </Dropdown.Item>

           </Dropdown>
        ) : (<Link to='/signin'>
        <Button gradientDuoTone='purpleToBlue' outline>
          Sign in 
        </Button>
      </Link>) }
        
      <Navbar.Toggle />

      </div>

      <Navbar.Collapse>
           <Navbar.Link active={path === '/'} href='/'>
             <span className='text-lg'> home  </span>
           </Navbar.Link  >
           <Navbar.Link active={path === '/about'} href='/about'>
           <span className='text-lg'> about  </span>
           </Navbar.Link>
           <Navbar.Link active={path === '/projects'} href='/projects'>
           <span className='text-lg'> projects  </span>
           </Navbar.Link>
      </Navbar.Collapse>
      
    </Navbar>
  )
}
