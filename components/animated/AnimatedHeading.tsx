"use client"
import React from 'react'
import {motion} from "framer-motion"

interface AnimatedProps {
    children: React.ReactNode
}

const AnimatedXDiv:React.FC<AnimatedProps> = ({children}) => {
  return (
    <motion.div initial={{x:-400}} animate={{x:0}}>
        {children}
    </motion.div>
  )
}

export default AnimatedXDiv