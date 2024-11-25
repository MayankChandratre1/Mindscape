
import  NextAuth  from "next-auth";
import authConfig from "./auth.config";
import {
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
    DEFAULT_AUTH_REDIRECT
} from "@/routes"
const { auth } = NextAuth(authConfig)

export default auth(async (req) => {
    const {nextUrl} = req
    const isSignedIn = !!req.auth
    console.log("####AUTH: Middleware at "+nextUrl.pathname + " "+isSignedIn);
    
    
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if(isApiAuthRoute) return;

    if(isAuthRoute){
        if(isSignedIn){
            return Response.redirect(new URL(DEFAULT_AUTH_REDIRECT, nextUrl))
        }
        return
    }

    if(!isSignedIn && !isPublicRoute){
       return Response.redirect(new URL("/auth/login", nextUrl))
    }

    if(nextUrl.pathname == "/home"){
        console.log("On /home Path: ");
        console.log(req.auth?.user);
       
    }

    
})



export const config = {
    matcher:[
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ]
}