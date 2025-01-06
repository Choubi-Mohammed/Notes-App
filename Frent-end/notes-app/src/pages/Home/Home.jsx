import React from 'react'
import { MdAdd } from "react-icons/md"
import NotesCrads from "../../compenent/Cards/NotesCrads"
import Navbar from "../../compenent/Navbar/Navbar"
import AddEditeNotes from "./AddEditeNotes"
import { useEffect, useState } from "react"
import Modal from "react-modal" 
import AxiosInstance from "../../utils/AxiosInstance"
import { useNavigate } from "react-router-dom"
import Toastmsg from "../../compenent/ToastMsg/Toastmsg"
import AddNotesImg from "../../assets/images/add-notes.svg"
import NoDataimg from "../../assets/images/no-data.svg"
import EmptyCard from "../../compenent/EmptyCard/EmptyCard"

const Home = () => {
  const [openAddEditModel, setOpenAddEditModel] = useState({
    isShow: false,
    type: "add",
    data: null
  });
  const [showToastMsg,setshowToastMsg]=useState({
    isShow: false,
    message: "",
    type: "add",
  })
  const [allNotes, setAllNotes] = useState([])
  const [userinfo, setUserinfo] = useState(null)
  const [isSearch, setIsSearch] = useState(false)
  const Navigate=useNavigate()
  const handleEdit= async(noteDetails)=> {
    setOpenAddEditModel({ isShow: true, type: "edit", data: noteDetails });
  }
  const showToastMessage=(message,type)=>{
    setshowToastMsg({isShow: true, message,type})
  }
  const handleCloseToast=()=>{
    setshowToastMsg({isShow: false, message: ""})
  }
  const getUserInfo = async() => {
    try {
      const response = await AxiosInstance.get("/user");
      if(response.data && response.data.user){
        setUserinfo(response.data.user)
      } 
    } catch (error) {
      if(error.response.status ===401){
        localStorage.clear()
        Navigate("/login")
      }
    }
  }
  const getAllNotes = async() => {
    try {
      const response = await AxiosInstance.get("/get-notes");
      if(response.data && response.data.notes){
        setAllNotes(response.data.notes)
      } 

    } catch (error) {
      console.log('An unexpected error occurred:', error);
    }
  }
  const handleDelete=async(data)=>{
    const noteId=data._id
    try {
      const response = await AxiosInstance.delete("/delete-note/"+noteId);
      if(response.data && response.data.message){
        showToastMessage("Note deleted successfully","delete")
        getAllNotes()
      } 
    } catch (error) {
      console.log('An unexpected error occurred:', error);
    }
  }
  const onSearchNotes = async (value) => {
    if (!value) {
      setIsSearch(false);
      getAllNotes();
      return;
    }

    setIsSearch(true);
    try {
      const response = await AxiosInstance.get("/search-note/", {
        params: { search: value }
      });
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      } else {
        setAllNotes([]);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      setAllNotes([]);
    }
  }
  const updateisPinned=async(data)=>{
    const noteId=data._id
    try {
      const response = await AxiosInstance.put("/update-note-pinned/"+noteId,{
        isPinned: !data.isPinned
      });
      if(response.data && response.data.note){
        showToastMessage("Note pinned successfully","edit")
        getAllNotes()
      } 
    } catch (error) {
      console.log('An unexpected error occurred:', error);
    }
  }
  const handleClearSearch= async()=>{
    setIsSearch(false)
    getAllNotes()
  }
  useEffect(() => { 
    getUserInfo()
    getAllNotes()
    return () => {
      
    }
  }, [])
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
      <Navbar userinfo={userinfo} onSearchNotes={onSearchNotes} handleClearSearch={handleClearSearch}/>
      <div className="container mx-auto">
        {allNotes.length > 0 ? (<div className="grid grid-cols-3 gap-4 mt-8">
          {allNotes.map((item) => (
            <NotesCrads 
            key={item._id}
            title={item.title}
            content={item.content}
            date={item.createdAt}
            tags={item.tags}
            isPinned={item.isPinned}
            onEdit={() => handleEdit(item)} // Consider implementing these functions
            onDelete={() => handleDelete(item)} // Consider implementing these functions
            onPinNotes={() => updateisPinned(item)} // Consider implementing these functions
            />
          ))}
        </div>):(
          <EmptyCard imgSrc={isSearch ? NoDataimg : AddNotesImg} message={
            isSearch ? "No results found for your search. Try different keywords or create a new note."
            :`Welcome! It looks like you haven't created any notes yet. To get started, click the 'ADD' button and begin jotting down your first note. This is a great way to keep track of your thoughts and ideas. Happy note-taking!`} />
        )}
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
        <AddEditeNotes type={openAddEditModel.type} noteData={openAddEditModel.data} onClose={()=>setOpenAddEditModel({isShow: false, type: "ADD", data: null })} 
        getAllNotes={getAllNotes}
        showToastMessage={showToastMessage}
        />
      </Modal>
      <Toastmsg 
        isShow={showToastMsg.isShow} 
        message={showToastMsg.message} 
        type={showToastMsg.type} 
        onClose={handleCloseToast}
      
      />
    </>
  );
}

export default Home;