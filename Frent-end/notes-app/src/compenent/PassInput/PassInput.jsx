/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const PassInput = ({value,onChange,placeHolder}) => {
    const [showPass, setShowPass] = useState(false)

    const toggleShowPass = () => {
        setShowPass(!showPass)
    }
    return (
        <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
            <input
                value={value}
                onChange={onChange}
                type={showPass ? "text" : "password"}
                placeholder={placeHolder || "Password"}
                className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'
            />
            {/* this for icosn react */}
            {showPass ? (
                <FaRegEye
                    size={22}
                    className="text-primary cursor-pointer"
                    onClick={()=>toggleShowPass()}
                />
            ):(
                <FaRegEyeSlash
                size={22}
                className="text-slate-400 cursor-pointer"
                onClick={()=>toggleShowPass()}
            />
            )}
        </div>
    )
}

export default PassInput;
