import React from 'react';
import PrimaryButton from '../shared/PrimaryButton/PrimaryButton';
import Undeline from '../shared/Underline/Underline';
import StarRating from '../shared/StarRating/StarRating';
import { useState } from 'react';
import axios from 'axios';
import Loader from '../shared/Loader/Loader';

const CommentAndRate = ({ postId }) => {
    const [rating, setRating] = useState(0);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [loader, setLoader] = useState(false);

    const getStar = (star) => {
        setRating(star);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newComment = {
            postId,
            rating,
            userName,
            email,
            comment
        };
        try {
            setLoader(true);
            await axios.post("/api/comments", newComment);
            setTimeout(() => {
                setLoader(false);
                window.location.reload();
            }, 2000);
            
        } catch (err) { }
    };
    return (
        <>
            <div className="comment-rate-wrapper p-4 shadow-[0_5px_60px_-15px_rgba(0,0,0,0.2)] rounded">
                <h1 className='font-poppins block mx-auto text-2xl font-semibold text-fontColor mt-2 mb-4'>Leave a comment & Rate this article</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-inputs font-poppins space-y-5">
                        <div className="rateIt-input border-2 border-gray2 rounded-[5px] p-2 flex item-center space-x-5">
                            <span className='text-gray2'>Rate it</span>
                            <StarRating getStar={getStar} />
                        </div>
                        <div className="name-input border-2 border-gray2 rounded-[5px] p-2">
                            <input className='border-none outline-none w-full' type="text" name="name" placeholder='Name' onChange={e => setUserName(e.target.value)} />
                        </div>
                        <div className="email-input border-2 border-gray2 rounded-[5px] p-2">
                            <input className='border-none outline-none w-full' type="email" name="email" placeholder='Email' onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="comment-input border-2 border-gray2 rounded-[5px] p-2">
                            <textarea className='border-none outline-none w-full' name="comment" cols="40" rows="4" placeholder='Comment' onChange={e => setComment(e.target.value)}></textarea>
                        </div>
                    </div>
                    <Undeline marginY="4" />

                    <div className="form-button space-x-4 flex justify-end items-center">
                        {loader === true ? <Loader /> : ""}
                        <button type='reset' className='text-lg font-normal tracking-wider'>Clear</button>
                        <PrimaryButton width="44" height="10" buttonName="Comment" type="submit" />
                    </div>
                </form>
            </div>
        </>
    );
}

export default CommentAndRate;