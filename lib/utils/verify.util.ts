import { v4 as uuidV4 } from "uuid"
import { getVerificationTokenByEmail } from "../actions/verify.actions";
import { prisma } from "@/prisma";

export const generateVerificationToken = async (email: string) => {
    //Generate a Token
    const token = uuidV4()
    const expires = new Date().getTime() + 1000*60*60*24 // 24 Hours

    //Check And Delete Existing token for email
    const existingToken = await getVerificationTokenByEmail(email);
    if(existingToken){
        await prisma.verificationToken.delete({
            where:{
                id: existingToken.id
            }
        })
    }

    //Create New Token
    const newToken = await prisma.verificationToken.create({
        data:{
            email,
            token,
            expires: new Date(expires)
        }
    })

    return newToken
}