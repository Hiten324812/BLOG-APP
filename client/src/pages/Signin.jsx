import { Button } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Signin() {
  return (
    <div>
     <Link to='/signup'>
      <Button>
      sign up 
      </Button>
     </Link>
    </div>
  )
}
