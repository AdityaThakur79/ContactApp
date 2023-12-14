import React from 'react'
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiEditCircleLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';
import useDisclouse from '../hooks/useDisclouse';
import AddandDeleteContacts from './AddandDeleteContacts';
import { toast } from 'react-toastify';
const Contact = ({ contact }) => {

  const { onClose, onOpen, isOpen } = useDisclouse();

    const deleteContact = async (id) => {
        try {
           await deleteDoc(doc(db,"contacts",id));
           toast.success("Contact Deleted Successfully");
        } catch (error) {
            console.log(error);
            toast.success("Contact Deleted Successfully");
        }
    }
    return (
        <>
            
        <div key={contact.id} className=' flex items-center justify-around rounded-lg bg-yellow p-2 name'>
            <div className='flex gap-1'>
                <HiOutlineUserCircle className='text-4xl text-orange' />
                <div>
                    <h2 className='font-medium'>{contact.name}</h2>
                    <p className='text-sm'>{contact.phoneNumber}</p>
                    <p className='text-sm'>{contact.email}</p>
                </div>
            </div>
         
            
            <div className='flex text-3xl' >
      
                <RiEditCircleLine onClick={onOpen} className='cursor-pointer'/>
                <IoMdTrash className='text-orange cursor-pointer' onClick={ () => deleteContact(contact.id) }/>
            </div>
        </div>
        <AddandDeleteContacts isOpen={isOpen} onClose={onClose} isUpdate contact={contact}/>
          
         
        </>

    )
}

export default Contact;
