// import React from 'react'

import {  useNavigate } from "react-router-dom"
import Profileinfo from "../Cards/Profileinfo"
import SearchBar from "../SearchBar/SearchBar"
import { useState } from "react"
import { useLocation } from "react-router-dom"

const Navbar = () => {
  const [SearchQuiry,setSearchQuiry]=useState("")
  const navigate=useNavigate()
  const location=useLocation()
  const isdashbord=location.pathname==='/dashbord'
  const onLogout =()=>{
    navigate("/login")
  }
  const handleSearch =()=>{

  }
  const onClearSearch=()=>{
    setSearchQuiry("")
  }
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
        <h1 className="text-xl font-medium text-black py-2">CM Notes</h1>
        {isdashbord && (
        <>
        < SearchBar value={SearchQuiry}
          onChange={({target})=>{setSearchQuiry(target.value)}}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
        <Profileinfo onLogout={onLogout}/>
        </>


        )}
    </div>
  )
}

export default Navbar