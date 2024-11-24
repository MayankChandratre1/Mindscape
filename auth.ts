import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { getUserById } from "./lib/actions/user.actions";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    callbacks:{
        session: ({session, token}) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub
                }
            }
        },
        jwt : async ({token}) => {
            if(!token.sub) return token;
            const user = await getUserById(token.sub);
            if(!user) return token;
            token.email = user.email
            token.name = user.name
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