"use client"
import React from 'react'
import {motion} from "framer-motion"
import Image from 'next/image'

const StepCard:React.FC<{step:{
    step: number,
    desc: string,
    image: string
}}> = ({step}) => {
  return (
    <div key={Math.random()} className='grid grid-cols-1 md:grid-cols-2 place-items-center my-5'>
        <motion.div initial={{x:-100}} whileInView={{x:0}}>
            <p className='text-xl md:text-3xl text-center'><span className='text-2xl md:text-5xl mx-2'>{step.step}</span>.{step.desc}</p>    
        </motion.div>
        <motion.div initial={{x:100}} whileInView={{x:0}}>
            <Image alt='step' width={400} height={300} src={step.image} className='rounded-xl shadow-md' />
        </motion.div>
        
    </div>
  )
}

export default StepCard