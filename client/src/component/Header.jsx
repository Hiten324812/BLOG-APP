
import {Button, Navbar, TextInput} from 'flowbite-react'

import { Link , useLocation } from 'react-router-dom'

import { AiOutlineSearch } from 'react-icons/ai'

import { FaMoon } from 'react-icons/fa'

export default function Header() {

  const path = useLocation().pathname;
  return (
    <Navbar className='border-b-2'>
      <Link to='/' className='self-center text-base md:text-2xl'>
      
      <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white' >hiten's</span>
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
        <Button className='w-12 h-10 hidden sm:inline' color='gray'>
            <FaMoon />
        </Button>
        <Link to='signin'>
          <Button gradientDuoTone='purpleToBlue' outline>
            Sign in 
          </Button>
        </Link>
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