// import React from 'react'
import { MdAdd } from "react-icons/md"
import NotesCrads from "../../compenent/Cards/NotesCrads"
import Navbar from "../../compenent/Navbar/Navbar"
import AddEditeNotes from "./AddEditeNotes"
import { useState } from "react"
import Modal from "react-modal" 

const Home = () => {
  const [openAddEditModel, setOpenAddEditModel] = useState({
    isShow: false,
    type: "ADD",
    data: null
  });
   
  const handleAddClick = () => {
    setOpenAddEditModel({ isShow: true, type: "ADD", data: null });
  };

  const handleCloseModal = () => {
    setOpenAddEditModel({ ...openAddEditModel, isShow: false });
  };

  const modalStyle = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.2)"
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NotesCrads 
            title="Meeting on 7th November" 
            date="3rd November 2024"
            tags="#Meeting"
            isPinned={true}
            onEdit={() => {}} // Consider implementing these functions
            onDelete={() => {}} 
            onPinNotes={() => {}} 
          />
        </div>
      </div>
      <button 
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10" 
        onClick={handleAddClick}
      >
        <MdAdd className="text-[32px] text-white " />
      </button>
      <Modal
        isOpen={openAddEditModel.isShow}
        onRequestClose={handleCloseModal}
        style={modalStyle}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 "
      >
        <AddEditeNotes type={openAddEditModel.type} noteData={openAddEditModel.data} onClose={()=>setOpenAddEditModel({isShow: false, type: "ADD", data: null })}/>
      </Modal>
    </>
  );
}

export default Home;