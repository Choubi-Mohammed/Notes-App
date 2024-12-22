// import React from 'react'

import { useState } from "react"
import Navbar from "../../compenent/Navbar/Navbar"
import PassInput from "../../compenent/PassInput/PassInput"
import { Link } from "react-router-dom"
import { validateEmail } from "../../utils/Helper"

const Signup = () => {
  const [name , setname]=useState('')
  const [email , setemail]=useState('')
  const [pass , setpass]=useState('')
  const [errur,seterrur]=useState()
  const handleSignUp = async (event)=>{
    event.preventDefault()
    if(!validateEmail){
      seterrur("please enter the email.")
      return;
    }
    if(!name){
      seterrur("please enter you name.")
      return;
    }
    if(!pass){
      seterrur("please enter the password.")
      return;
    }
    seterrur("")
    // hna Api register
    try {
      const response = await fetch('http://localhost:3000/api/notes/register/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              name: name, 
              email: email, 
              password: pass,
              isAdmin: false, 
          }),
      });
      const data = await response.json();
      if (response.ok) {
          console.log("Registration successful:", data);
          window.location.href = '/login'; 
      } else {
          console.error("Registration error:", data.message);
      }
  } catch (err) {
      console.error("An error occurred:", err);
  }
  
  }
  return (
    <>
      <Navbar/>
      <div className="flex items-center justify-center mt-28  ">
        <div className="w-96 border rounded bg-white px-7 py-10">
            <form onSubmit={handleSignUp}>
                <h1 className="text-2xl text-center mb-7">SigneUp</h1>
                <input type="text" placeholder="Name" className="input-box"
                value={name}
                onChange={(e)=>setname(e.target.value)}
                />
                <input type="email" placeholder="Email" className="input-box"
                value={email}
                onChange={(e)=>setemail(e.target.value)}
                />
                <PassInput value={pass} onChange={(e)=>setpass(e.target.value)}/>
                {errur && <p className="text-red-500 text-sx pb-1">{errur}</p>}
                <button className="btn-primary" type="submit">
                    Create account 
                </button>
                <p className=" text-sm text-center mt-4">
                  already have an account{" "}
                    <Link to="/login" className="font-medium text-primary underline">Login</Link>
                </p>
            </form>
        </div>
      </div>

    </>
  )
}

export default Signup
