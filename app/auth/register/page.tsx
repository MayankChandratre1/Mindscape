import AnimatedXDiv from '@/components/animated/AnimatedHeading'
import RegistrationForm from '@/components/auth/RegistrationForm'
import Image from 'next/image'
import React from 'react'
import logo from "@/public/Mindscape.svg"  


const RegisterPage = () => {
  return (
    <main className='min-h-screen grid place-items-center'>
        <div>
            <Image 
            className='absolute top-0 left-0 w-full h-full opacity-10 -z-50'
            width={500} height={500} alt='bg' src={logo}  />
            <AnimatedXDiv>
                <h1 className='text-xl md:text-4xl mb-10'>Welcome To <span className='font-semibold text-blue-600'>Mindscape</span></h1>
            </AnimatedXDiv>
            <RegistrationForm />
        </div>
    </main>
  )
}

export default RegisterPage