"use client"
import { motion } from "framer-motion"
import logo from "../public/Mindscape.svg"  
import Hero from "../public/Gif/hero.gif"  
import Image from "next/image";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/landingpage/FeatureCard";
import features  from "@/components/landingpage/features";
import steps from "@/components/landingpage/steps";
import StepCard from "@/components/landingpage/StepCard";
import TestimonialsComponent from "@/components/landingpage/TestimonialsComponent";
import {Linkedin , Github, Twitter } from "lucide-react"
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter()
  const redirect = (url:string) => router.push(url)
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <header className=" shadow-xl flex items-center justify-between px-5 py-3  fixed top-0 left-0 backdrop-blur-lg w-full ">
        <motion.div className="flex items-center">
          <Image alt="logo" src={logo} width={50} height={50} className="w-10 h-10"/>
          <h1 className="text-sm md:text-3xl">Mindscape</h1>
        </motion.div>
        <motion.div className="flex items-center">
          <Button onClick={()=>{
            redirect("/auth/login")
          }} className="max-md:text-sm bg-blue-500 hover:bg-blue-900">Login</Button>
        </motion.div>
      </header>
      <main className="px-5 md:px-10 pt-32">
        <section id="hero" className="grid md:grid-cols-2 place-items-center">
            <motion.div>
              <h1 className="text-2xl md:text-6xl max-md:text-center mb-5">
                Learn skills in a{" "}
                <p className="text-blue-600 font-bold italic max-md:inline-block">{" "}Modern Way.</p>
              </h1>
              <div className="max-md:hidden justify-center items-center my-3 md:my-10">
                <Button onClick={()=>{
            redirect("/auth/register")
          }} className="bg-blue-600 hover:text-white hover:bg-blue-900 hover:scale-95 active:scale-90 rounded-full md:mx-2">Be an Intructor</Button>
                -OR-
                <Button onClick={()=>{
            redirect("/auth/register")
          }} className="bg-blue-600 hover:text-white hover:bg-blue-900 hover:scale-95 active:scale-90 rounded-full md:mx-2">Enroll in a course</Button>
              </div>
              <div className="flex gap-3 max-md:text-center">
                <div className="p-3">
                  <p className="text-xl md:text-2xl text-blue-600">100K+</p>
                  <p className="text-sm md:text-xl font-thin italic">Active Students</p>
                </div>
                <div className="p-3">
                  <p className="text-xl md:text-2xl text-blue-600">1500+</p>
                  <p className="text-sm md:text-xl font-thin italic">Skilled Instructors</p>
                </div>
                <div className="p-3">
                  <p className="text-xl md:text-2xl text-blue-600">200+</p>
                  <p className="text-sm md:text-xl font-thin italic">Certified Courses</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{x:600, opacity:0}} animate={{x:0, opacity:1}} whileHover={{
              rotate:"4deg",
              scale:1.1
            }}>
              <Image alt="gif" src={Hero} width={200} height={200} className="w-full rounded-xl shadow-xl" />
              <div className="md:hidden flex justify-center items-center my-8 md:my-10">
                <Button onClick={()=>{
            redirect("/auth/register")
          }} className="bg-blue-600 hover:text-white hover:bg-blue-900 hover:scale-95 active:scale-90 rounded-full md:mx-2">Be an Intructor</Button>
                -OR-
                <Button onClick={()=>{
            redirect("/auth/register")
          }} className="bg-blue-600 hover:text-white hover:bg-blue-900 hover:scale-95 active:scale-90 rounded-full md:mx-2">Enroll in a course</Button>
              </div>
            </motion.div>
        </section>

        <section id="features" className="mt-24">
        <h2 className="mb-10 text-2xl md:text-4xl text-center">We Provide</h2>
            <div className="flex flex-wrap justify-evenly">
            {
              features.map((feature, index)=> (
                <motion.div key={index} className="m-2 md:m-4" initial={{scale:0}} whileInView={{scale:1}}>
                  <FeatureCard  feature={feature.feature} desc={feature.description} Featicon={feature.icon} />
                </motion.div>
              ))
            }
            </div>
        </section>

        <section id="HowItWorks" className="mt-24">
           <h2 className="mb-10 text-2xl md:text-4xl text-center">Get Started Today</h2>
           <div>
            {
              steps.map((step, index) => {
                return (
                  <div key={index}>
                    <StepCard step={step} />
                  </div>
                )
              })
            }
           </div>
        </section>
        
        <section id="testimonials" className="mt-24">
        <h2 className="mb-10 text-2xl md:text-4xl text-center">What Our Users Say</h2>
        <TestimonialsComponent />
        </section>
      </main>
      <footer className=" grid place-items-center md:grid-cols-3 mt-24 min-h-32">
            <div className="w-full p-3 h-full">
              <p>&copy; Mindscape</p>
              <p className="text-xs text-slate-800">Since 2024</p>
            </div>
            <div className="flex gap-4">
              <a><Twitter  size={24}/></a>
              <a><Linkedin  size={24}  /></a>
              <a><Github  size={24}  /></a>
            </div>
            <div className="w-full p-3 h-full md:text-end">
              <p>Contact</p>
              <div className="text-sm text-slate-800">
                <p>+91 11111 11111</p>
                <p>support@mindscape.com</p>
              </div>
            </div>
      </footer>
    </div>
  );
}
