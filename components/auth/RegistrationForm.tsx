"use client"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { registerInputSchema } from "@/lib/schemas"
import { useForm } from "react-hook-form"
import zod from "zod"
import CustomFormItem from "../form/CustomFormItem"
import { register } from "@/lib/actions/user.actions"
import { useState } from "react"
import Loader from "../loading/Loader"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

const RegistrationForm = () => {
    const form = useForm<zod.infer<typeof registerInputSchema>>({
        resolver: zodResolver(registerInputSchema),
        defaultValues:{
            email:"",
            name:"",
            password:"",
            role: "STUDENT"
        }
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const onSubmit = async (values:zod.infer<typeof registerInputSchema>) => {
        setError("")
        setSuccess("")
        setLoading(true)        
        const res = await register(values)
        if(res?.error){
            setError(res.error)
            toast({
                title:"Oops!!",
                variant:"destructive",
                description:res.error
            })
            setLoading(false)
            return
        }
        setSuccess(res?.success || "")
        toast({
            title:"Successfully Done!!",
            description:res.success
        })
        setLoading(false)
    }

        return (
    <div>
        <Form {...form}>
            {
                error && <p className="text-xl text-red-500 text-center">{error}</p>
            }
            {
                success && <p className="text-xl text-green-500 text-center">{success}</p>
            }
            <form onSubmit={form.handleSubmit((values)=>{
                onSubmit(values)
            })}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({field})=>(
                        <CustomFormItem field={field} label="email" />
                    )}
                />
                
                <FormField
                    control={form.control}
                    name="name"
                    render={({field})=>(
                        <CustomFormItem field={field} label="name" />
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field})=>(
                        <CustomFormItem field={field} label="password" />
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={"Role"}/>
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                             <SelectItem value="INSTRUCTOR">Instructor</SelectItem>
                             <SelectItem value="STUDENT">Student</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <Button variant={"blue"} className="mt-4">{
                    loading ? <Loader />: "Register"    
                }</Button>
            </form>
        </Form>
        <div className="mt-4 max-md:text-sm">
            Already Have an account? <Link href={"/auth/login"} className="underline">Log In</Link>
        </div>
    </div>
  )
}



export default RegistrationForm