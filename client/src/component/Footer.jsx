import { Footer } from 'flowbite-react'
import React from 'react'
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function FooterCom() {
  return (
    <Footer className='w-full p-6 border border-t-8 border-teal-400'>
      
      <div className='w-full grid gap-6'>
      <div className='w-full grid justify-between md:flex md:justify-between'>
     
        <div>
        <Link to='/' className='self-center text-xl md:text-2xl'>
      
      <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white' >Hiten's</span>
       Blog
      </Link>

        </div>

        <div className='grid grid-cols-2 mt-6 gap-8 md:grid-cols-3 md:gap-6'>
        <div>
        <Footer.Title title='about' className='text-xl' />
         <Footer.LinkGroup col>
          <Footer.Link className='md:text-base'>
            100 JS Projects
          </Footer.Link>
          <Footer.Link className='md:text-base'>
            Hiten's Blog
          </Footer.Link>
         </Footer.LinkGroup>
        </div>
        <div>
        <Footer.Title title='follow us' className='text-xl' />
         <Footer.LinkGroup col>
          <Footer.Link className='md:text-base'>
           github
          </Footer.Link>
          <Footer.Link className='md:text-base'>
            discord
          </Footer.Link>
         </Footer.LinkGroup>
        </div>
        <div>
        <Footer.Title title='legal' className='text-xl'/>
         <Footer.LinkGroup col>
          <Footer.Link className='md:text-base'>
           privacy policy
          </Footer.Link>
          <Footer.Link className='md:text-base'>
            terms & conditions
          </Footer.Link>
         </Footer.LinkGroup>
        </div>
        </div>

      
       </div>

       <Footer.Divider />
       <div className='grid justify-start gap-6 md:flex md:justify-between'> 

        <Footer.Copyright href='#'
        by="Hiten Blog"
        year={new Date().getFullYear()} />

        <div className='flex gap-8'>
          <Footer.Icon href='#' icon={BsFacebook} />
          <Footer.Icon href='#' icon={BsInstagram} />
          <Footer.Icon href='#' icon={BsGithub} />
          <Footer.Icon href='#' icon={BsLinkedin} />
          <Footer.Icon href='#' icon={BsTwitter} />
        </div>
        
       </div>
      

      </div>
      
      
    </Footer>
  )
}
