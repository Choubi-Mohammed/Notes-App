import moment from 'moment/moment'
import React from 'react'
import { MdOutlinePushPin } from 'react-icons/md'
import { MdCreate, MdDelete } from 'react-icons/md' 

const NotesCrads = ({
        title,
        date,
        content,
        tags,
        isPinned,
        onEdit,
        onDelete,
        onPinNotes}) => {
  return (
    <div className='border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out'>
        <div className='flex items-center justify-between '>
            <div>
                <h6 className='text-sm font-medium'>{title}</h6>
                <span className='text-xs text-slate-500'>{moment(date).format("Do MMM YYYY")}</span>
            </div>
            <MdOutlinePushPin className={`icone-btn ${isPinned? 'text-primary':'text-slate-300'}`} onClick={onPinNotes} />
        </div>
      <p className='text-slate-700 mt-2'>{content ? content.slice(0, 60) : ''}</p>
      <div className='flex items-center justify-between mt-2'>
        <div className='text-xs text-slate-500'>{tags.map((item)=> `#${item} `)}</div>
        <div className='flex items-center gap-2'>
            <MdCreate
            className='icon-btn hover:text-green-600'
            onClick={onEdit}
            />
            <MdDelete
            className='icon-btn hover:text-red-500'
            onClick={onDelete}/>
        </div>
      </div >
    </div>
  )
}

export default NotesCrads
