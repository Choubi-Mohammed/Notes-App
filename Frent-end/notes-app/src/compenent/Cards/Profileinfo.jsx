import React from 'react'
import { Getinitail } from '../../utils/Helper'

const Profileinfo = ({userinfo, onLogout}) => {
  return (
    <div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
            {Getinitail(userinfo.name)}
        </div>
        <div>
            <p className='text-sm font-medium'>{userinfo.name}</p>
            <button onClick={onLogout} className='text-sm text-slate-700 underline'>Logout</button>
        </div>
    </div>
  )
}

export default Profileinfo
