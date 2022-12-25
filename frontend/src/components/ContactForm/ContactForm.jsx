import React from 'react';
import PrimaryButton from '../shared/PrimaryButton/PrimaryButton';
import Loader from '../shared/Loader/Loader';
import { useState } from 'react';
import axios from 'axios';
const ContactForm = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newMessage = {
            userName,
            email,
            message
        };
        try {
            setLoader(true);
            await axios.post("/api/queries", newMessage);
            setTimeout(() => {
                setLoader(false);
                window.location.reload();
            }, 2000);

        } catch (err) { }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-inputs font-poppins space-y-5">
                    <div className="name-input border-2 border-gray2 rounded-[5px] p-2 space-x-2">
                        <span className='text-gray2'><i className="fa-solid fa-user"></i></span>
                        <input className='border-none outline-none w-96' type="text" name="name" placeholder='Name' onChange={e => setUserName(e.target.value)} />
                    </div>
                    <div className="email-input border-2 border-gray2 rounded-[5px] p-2 space-x-2">
                        <span className='text-gray2'><i className="fa-solid fa-envelope"></i></span>
                        <input className='border-none outline-none w-96' type="email" name="email" placeholder='Email' onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="message-input border-2 border-gray2 rounded-[5px] p-2 space-x-2 flex">
                        <span className='text-gray2'><i className="fa-solid fa-comments"></i></span>
                        <textarea className='border-none outline-none w-96' name="message" cols="40" rows="6" placeholder='Message' onChange={e => setMessage(e.target.value)} ></textarea>
                    </div>
                </div>

                <div className="form-button my-6 space-x-4 flex justify-end items-center">
                    {loader === true ? <Loader /> : ""}
                    <button type='reset' className='text-lg font-normal tracking-wider'>Clear</button>
                    <PrimaryButton width="44" height="10" buttonName="Send Message" type="submit" />
                </div>
            </form>
        </>
    );
}

export default ContactForm;