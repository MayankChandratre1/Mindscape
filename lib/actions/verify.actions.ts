"use server"

import { prisma } from "@/prisma"
import { handleError } from "../utils/error.util"
import { getUserByEmail } from "./user.actions"

export const getVerificationTokenByEmail = async ( email:string)=>{
    try{
       const token = await prisma.verificationToken.findFirst({
        where:{
            email
        }
       })
       return token
    }catch(error){
        handleError("PRISMA")
    }
}

export const getVerificationTokenByToken = async ( token:string)=>{
    try{
       const verificationToken = await prisma.verificationToken.findFirst({
        where:{
            token
        }
       })
       return verificationToken
    }catch(error){
        handleError("PRISMA")
    }
}

export const verifyEmail = async (token:string) =>{
    const verificationToken = await getVerificationTokenByToken(token)

    if(!verificationToken){
        return {error: "Invalid Token!!"}
    }

    const hasExpired = new Date() > new Date(verificationToken.expires)

    if(hasExpired){
        return {error: "Expired Token!!"}
    }

    const user = await getUserByEmail(verificationToken.email);

    if(!user){
        return {error: "No Such User Exists!!"}
    }

    await prisma.user.update({
        where:{
            id: user.id
        },
        data:{
            emailVerified: new Date(),
            email: user.email
        }
    })

    await prisma.verificationToken.delete({
        where:{
            id: verificationToken.id
        }
    })

    return {success: "Verified Your Email!!"}
}