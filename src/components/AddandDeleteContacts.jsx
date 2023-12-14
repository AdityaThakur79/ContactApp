import React from 'react'
import Modal from './Modal';
import { Formik, Field, Form,ErrorMessage } from "formik";
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';
import { toast } from 'react-toastify';
import * as Yup from "yup"
import "../index.css"

const contatSchemaValidation = Yup.object().shape(
    {
        name:Yup.string().required("Name is Required"),
        phoneNumber:Yup.number().required("Phone Number is Required"),
        email:Yup.string().email("Invalid Email").required("Email is Required")
    }
)

const AddandDeleteContacts = ({ isOpen, onClose, isUpdate, contact }) => {

    const addContact = async (contact) => {
        try {
            const contactRef = collection(db, "contacts");
            await addDoc(contactRef, contact);
            onClose();
            toast.success("Contact Added Successfully");

        } catch (error) {
            console.log(error);
            toast.error("Contact Cannot Be Added");
        }
    }

    const updateContact = async (contact, id) => {
        try {
            const contactRef = doc(db, "contacts", id);
            await updateDoc(contactRef, contact);
            toast.success("Contact Updated Successfully");
            onClose();

        } catch (error) {
            console.log(error);
            toast.error("Contact Cannot Be Updated");
        }
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Formik
            validationSchema={contatSchemaValidation}
                initialValues={
                    isUpdate ?
                        {
                            name: contact.name,
                            phoneNumber: contact.phoneNumber,
                            email: contact.email
                        } :
                        {
                            name: "",
                            phoneNumber: "",
                            email: ""
                        }
                }

                onSubmit={(values) => {
                    // console.log(values);

                    isUpdate ?
                        updateContact(values,contact.id) :
                        addContact(values);

                }}
            >
                <Form>
                    <div className='flex items-center p-4 gap-2 flex-col'>
                        <div className='my-1 flex flex-col'>
                            <label >Name</label>
                            <Field name="name" className='border border-orange  px-6 py-1 rounded-sm input-field'></Field>
                            <div className='text-red-600 text-xs my-1' >
                                <ErrorMessage name="name"/>
                            </div>
                        </div>

                        <div className='my-1 flex flex-col'>
                            <label >PhoneNumber</label>
                            <Field name="phoneNumber" className='border border-orange  px-6 py-1 rounded-sm input-field'></Field>
                            <div className='text-red-600 text-xs my-1' >
                                <ErrorMessage name="phoneNumber"/>
                            </div>
                        </div>

                        <div className='my-1 flex flex-col'>
                            <label>Email</label>
                            <Field name="email" className='border border-orange  px-6 py-1 rounded-sm input-field'></Field>
                            <div className='text-red-600 text-xs my-1' >
                                <ErrorMessage name="email"/>
                            </div>
                        </div>

                        <div className='flex flex-col items-center my-2 justify-center text-center'>
                            <button type='submit' className='submit-btn'>{isUpdate ? "Update" : "Add"} Contact</button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </Modal>
    )
}

export default AddandDeleteContacts;