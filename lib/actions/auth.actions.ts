"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { handleError } from "../utils/error.util"

export const login = async (email: string, password: string)=>{
    try{
        const res = await signIn("credentials", {
            email, password
        })
        if(res){
            return {
                success: "Successfully Logged In"
            }
        }
        return {
            error: "Check Credentials And Try Again"
        }
    }catch(error){
        handleError("AUTH")
        if(error instanceof AuthError){
            if(error.type == 'CredentialsSignin'){
                return {
                    error: "Check Credentials And Try Again"
                }
            }
            return {
                error: "Verify Your Email and try Again!"
            }
        }

    }
}