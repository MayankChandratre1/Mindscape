import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import zod from "zod"
import bcryptjs from "bcryptjs"
import { NextAuthConfig } from "next-auth";
import { signinInputSchema } from "./lib/schemas";



export default {
    providers: [Credentials({
        async authorize(credentials){
            const verifiedCreds =  signinInputSchema.safeParse(credentials)
            if(verifiedCreds.success){
                const user = await prisma.user.findUnique({
                    where:{
                        email: verifiedCreds.data.email
                    },
                    select:{
                        id: true,
                        email: true,
                        emailVerified: true,
                        name: true,
                        image: true,
                        password: true,
                        role: true
                    }
                })
                if(!user) return null
                const passwordMatch = await bcryptjs.compare(verifiedCreds.data.password, user.password || "");
                if(passwordMatch) return user
            }
            return null
        },
        
    })],
} satisfies NextAuthConfig