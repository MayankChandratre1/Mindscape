"use client"
import { verifyEmail } from '@/lib/actions/verify.actions'
import { handleError } from '@/lib/utils/error.util'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

const VerifyEmailForm = () => {
  const params = useSearchParams()
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const token = params.get("token")
  const verify = useCallback(() => {
    if(success && error) return;
    if(!token){
        setError("No Token!!")
        return
    }
    verifyEmail(token).then(data => {
        if(data.success) setSuccess(data.success)
        if(data.error) setError(data.error)
    }).catch(error => {
        handleError("VERIFICATION")
        setError("Unexpected Error!!")
    })    
  },[token, success, error])

  useEffect(()=>{
    verify()
  },[])
  return (
    <div className='text-center p-20'>
        <h3 className='text-4xl mb-4'>Verifying Mail</h3>
        {error && <p className='text-red-500'>ERROR, Email Not Verified!!</p>}
        {success && <p className='text-green-500'>Email Verified!!</p>}
        {!success && !error && <p className='text-slate-500'>Verifying in progress...</p>}
    </div>
  )
}

export default VerifyEmailForm