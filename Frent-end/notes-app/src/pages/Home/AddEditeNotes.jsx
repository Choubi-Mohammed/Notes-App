import React, { useState } from 'react'
import TagInput from '../../compenent/PassInput/TagInput'
import { MdClose } from 'react-icons/md'
import AxiosInstance from '../../utils/AxiosInstance'

const AddEditeNotes = ({noteData,type,getAllNotes,onClose,showToastMessage}) => {
    const [title,settitle]=useState(noteData?.title || "")
    const [content,setcontent]=useState(noteData?.content || "")
    const [tags,setTags]=useState(noteData?.tags || [])
    const [error,seterror]=useState(null)
    // add note
    const AddNewNote=async ()=>{
        try {
            const response =await AxiosInstance.post("/add-note",{
                title,
                content,
                tags
            })
            if(response.data && response.data.note){
                showToastMessage("Note added successfully","add")
                getAllNotes()
                onClose()
            }
        } catch (error) {
            if(error.response
                && error.response.data
                && error.response.data.message){
                    seterror(error.response.data.message)
                }
        }
    }
    // edit note
    const EditNote=async ()=>{
        const noteId=noteData._id
        try {
            const response =await AxiosInstance.put("/update-note/"+noteId,{
                title,
                content,
                tags
            })
            if(response.data && response.data.note){
                showToastMessage("Note updated successfully","edit")
                getAllNotes()
                onClose()
            }
        } catch (error) {
            if(error.response
                && error.response.data
                && error.response.data.message){
                    seterror(error.response.data.message)
                }
        } 
    }
    const handleAddNote=()=>{
        if(!title){
            seterror("Please enter the title")
            return;
        }
        if(!content){
            seterror("Please enter the content")
            return;
        }
        seterror("")
        if(type==="edit"){
            EditNote()
        }else{
            AddNewNote()
        }
    }
  return (
    <div className='relative'>
        <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50' onClick={onClose}>
            <MdClose className='text-xl text-slate-400'/>
        </button>
        <div className='flex flex-col gap-2'>
            <label className='input-label'>TITLE</label>
            <input 
            type="text"
            className='text-2xl text-slate-950 outline-none'
            placeholder='Go To Game At 5'  
            value={title}
            onChange={({target})=>settitle(target.value)}      
            />
        </div>
        <div className='flex flex-col gap-2 mt-4'>
            <label className='input-label'>CONTENT</label>
            <textarea 
            type="text"
            className='text-sm text-slate-950 outline-none bg-slate-50 rounded'
            placeholder='Content'        
            rows={10}
            value={content}
            onChange={({target})=>setcontent(target.value)} 
            />
        </div>
        <div className='mt-3'>
            <label className='input-label'>TAGS</label>
            <TagInput tags={tags} setTags={setTags} /> 
        </div>
        {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}
        <button 
        className='btn-primary font-medium mt-5 p-3'
        onClick={handleAddNote}
        >
            ADD
        </button>

    </div>
  )
}

export default AddEditeNotes
