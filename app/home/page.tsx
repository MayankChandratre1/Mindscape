import { auth } from '@/auth'
import { getUserById } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import React from 'react'

const Home = async () => {
  const session = await auth()
  if(session?.user?.id){
    const user = await getUserById(session.user.id);
    switch(user?.role){
        case 'ADMIN': redirect("/admin")
        case 'INSTRUCTOR': redirect("/dashboard/instructor")
        case 'STUDENT': redirect("/dasboard/student")
    }
  }
  return (
    <div>Home</div>
  )
}

export default Home