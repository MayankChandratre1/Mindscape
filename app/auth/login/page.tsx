import React from 'react'
import AnimatedXDiv from '@/components/animated/AnimatedHeading'
import Image from 'next/image'
import logo from "@/public/Mindscape.svg" 
import LoginForm from '@/components/auth/LoginForm'

const LoginPage = () => {
  return (
    <main className='min-h-screen grid place-items-center'>
        <div>
            <Image 
            className='absolute top-0 left-0 w-full h-full opacity-10 -z-50'
            width={500} height={500} alt='bg' src={logo}  />
            <AnimatedXDiv>
                <h1 className='text-xl md:text-4xl mb-10'>Welcome Back <span className='font-semibold text-blue-600'>User</span></h1>
            </AnimatedXDiv>
            <LoginForm />
        </div>
    </main>
  )
}

export default LoginPage