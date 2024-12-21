// import React from 'react'

import { MdAdd } from "react-icons/md"
import NotesCrads from "../../compenent/Cards/NotesCrads"
import Navbar from "../../compenent/Navbar/Navbar"

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
            <NotesCrads title="Meeting on 7th November" date="3rd November 2024"
            tags="#Meeting"
            isPinned={true}
            onEdit={()=>{}}
            onDelete={()=>{}}
            onPinNotes={()=>{}}
            />
        </div>

      </div>
      <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10" onClick={()=>{}}>
        <MdAdd className="text-[32px] text-white "/>
      </button>
      

    </>
  )
}

export default Home
