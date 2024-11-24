"use client"
import {motion} from "framer-motion"
import React, { ForwardRefExoticComponent, RefAttributes } from 'react'
import { LucideProps } from 'lucide-react'

const FeatureCard = ({feature, Featicon, desc}:{
    feature:string,
    Featicon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
    desc: string
}) => {
  return (
    <motion.div key={feature} className="p-3 shadow-md rounded-xl h-full bg-gradient-to-br from-blue-100 to-blue-400 ">
        <div className='inline-block bg-white shadow-md p-3 rounded-xl'>
            <Featicon size={32}  />
        </div>
        <div className='p-2'>
            <h4 className='text-xl font-semibold'>{feature}</h4>
            <p className='text-slate-600 text-justify text-sm'>{desc}</p>
        </div>
    </motion.div>
  )
}

export default FeatureCard