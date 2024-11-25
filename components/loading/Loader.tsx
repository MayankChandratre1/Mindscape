import { Loader2 } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div>
        <Loader2 size={24} className='animate-spin direction-alternate' />
    </div>
  )
}

export default Loader