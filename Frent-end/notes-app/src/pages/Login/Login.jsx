// import React from "react"
import { Link } from "react-router-dom"

import Navbar from "../../compenent/Navbar/Navbar"
import PassInput from "../../compenent/PassInput/PassInput"
import { useState } from "react"
import { validateEmail } from "../../utils/Helper"


const Login = () => {
    const [email,setemail]=useState("")
    const [pass,setpass]=useState("")
    const [errur,seterrur]=useState(null)
    const handleLogin = async(event)=>{
        event.preventDefault()

        if (!validateEmail(email)){
            seterrur("please entrer a valide email adress.")
            return;
        }
        if(!pass){
          seterrur("please entrer the passwod")
          return;

        }
        seterrur("")
        // login api call
    //     try {
    //       const response = await fetch('http://localhost:3000/api/notes/login/', {
    //           method: 'POST',
    //           headers: {
    //               'Content-Type': 'application/json',
    //           },
    //           body: JSON.stringify({
    //               email: email, 
    //               password: pass,
    //           }),
    //       });
    //       const data = await response.json();
    //       if (response.ok) {
    //           console.log("Login successful:", data);
    //           window.location.href = '/dashbord'; 
    //       } else {
    //           console.error("Login error:", data.message);
    //       }
    //   } catch (err) {
    //       console.error("An error occurred:", err);
    //   }
    }
  return (
    <>
      <Navbar/>
      <div className="flex items-center justify-center mt-28  ">
        <div className="w-96 border rounded bg-white px-7 py-10">
            <form onSubmit={handleLogin}>
                <h1 className="text-2xl text-center mb-7">Login</h1>
                <input type="email" placeholder="Email" className="input-box"
                value={email}
                onChange={(e)=>setemail(e.target.value)}
                />
                {/* <PassInput value={pass} onChange={(e)=>setpass(e.target.value)}/> */}
                <PassInput value={pass} onChange={(e)=>setpass(e.target.value)} placeHolder="Password"/>
                {errur && <p className="text-red-500 text-sx pb-1">{errur}</p>}
                <button className="btn-primary" type="submit">
                    Login
                </button>
                <p className=" text-sm text-center mt-4">
                    Not Registred Yet ? {" "}
                <Link to="/signup" className="font-medium text-primary underline">Create an account</Link>
                </p>
            </form>
        </div>
      </div>

    </>
  )
}

export default Login
