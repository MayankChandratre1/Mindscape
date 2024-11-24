import React from 'react'
import {motion} from "framer-motion"
import testimonials from "./testimonials"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'



const TestimonialsComponent = () => {
  return (
    <motion.div layout className="">    
        <Carousel className='w-[70%] md:w-1/2 mx-auto'>
          <CarouselContent className='px-2'>
              {
                testimonials.map((item, index) => (
                  <CarouselItem key={index} >
                    <div className=' bg-gradient-to-br from-blue-100 to-blue-400 rounded-xl shadow-md p-2 md:p-4'>
                    <div className='flex flex-col items-center'>
                      <Image width={50} height={50} alt='image' src={"/Mindscape.svg"} className='w-10 h-10 md:w-24 md:h-24' />
                      <h4 className='text-xl md:text-2xl'>{item.name}</h4> 
                    </div>
                    <div className='text-center'>
                      <p className='text-xs md:text-md text-slate-500 font-light'>{item.designation}</p> 
                      <q className='inline-block mt-4 text-sm md:text-lg text-wrap font-light'>{item.statement}</q> 
                    </div>
                    </div>
                  </CarouselItem>
                ))
              }
          </CarouselContent>
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>
    </motion.div>   
  )
}


export default TestimonialsComponent