import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { getUserById } from "./lib/actions/user.actions";
import { prisma } from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    callbacks:{
        session: ({session, token}) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub,
                    role: token.role
                }
            }
        },
        jwt : async ({token, user}) => {
            if(!token.sub) return token;
            const existingUser = await getUserById(token.sub);
            if(!user) return token;
            token.email = user.email
            token.name = user.name
            token.role = existingUser?.role
            return token
        },
        signIn: async ({user, account}) => {
           if(process.env.NODE_ENV === 'production'){
            if(account?.provider != "Credentials"){
                return true
            }

            const existingUser = await getUserById(user.id ?? "")

            if(!existingUser?.emailVerified){
                return false
            }
           }
            return true
        }
    },
    ...authConfig,
    session: {strategy: 'jwt'}
})