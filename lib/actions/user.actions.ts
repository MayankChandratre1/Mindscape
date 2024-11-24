"use server"

import { prisma } from "@/prisma"
import bcryptjs from "bcryptjs"
import { handleError } from "../utils/error.util"
import { generateVerificationToken } from "../utils/verify.util"
import { sendVerificationEmail } from "../email"

export const register = async (name:string, email: string, password: string) => {
    try{
        //Check if an user already exists or not
        const existingUser = await prisma.user.findFirst({
            where:{
                email
            }
        })
        if(existingUser) return { error: "User Already Exists!"}

        //Create a new user
        const user = await prisma.user.create({
            data:{
                email,
                name,
                password: await bcryptjs.hash(password, 12) 
            }
        })

       if(process.env.NODE_ENV == 'production'){
         //Generate a verification token
         const verificationToken = await generateVerificationToken(email);

         //Send Verification Mail
         await sendVerificationEmail(email, verificationToken.token);
       }

        return user
    }catch(error){
        handleError("PRISMA")
    }
}

export const getUserById = async (id: string) => {
    try{
        const user = await prisma.user.findUnique({
            where:{id}
        })
        if(!user) return null
        return user
    }catch(error){
        console.error("###PRISMA_ERR: ",error)
        return null
    }
}

export const getUserByEmail = async (email: string) => {
    try{
        const user = await prisma.user.findUnique({
            where:{email}
        })
        if(!user) return null
        return user
    }catch(error){
        console.error("###PRISMA_ERR: ",error)
        return null
    }
}