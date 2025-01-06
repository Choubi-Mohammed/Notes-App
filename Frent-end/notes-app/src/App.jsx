// import React from 'react'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
const router=(
  <Router>
    <Routes>
      <Route path="/dashbord" exact element={<Home/>}/>
      <Route path="/login" exact element={<Login/>}/>
      <Route path="/signup" exact element={<Signup/>}/>
    </Routes>
  </Router>
)
const App = () => {

  return (
    <div>
      {router}
    </div>
  )
}

export default App
