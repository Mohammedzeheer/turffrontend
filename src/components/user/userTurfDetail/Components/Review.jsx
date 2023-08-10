import React, { useState } from 'react';
import {AxiosUser} from '../../../../api/AxiosInstance'
import { useSelector } from 'react-redux';
import RatingComponent from './Rating';
import { toast } from "react-toastify";

const ReviewModal = ({ isOpen, toggle, turfId,refresh,setRefresh }) => {

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
   console.log(turfId,'----------------------------turf id in review modal');

   const {username } = useSelector((state) => state.user);
   const usertoken=localStorage.getItem('user')
   const headers = { authorization: usertoken }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          if (!review) {
            toast.error('Please enter a review before submitting.',{
                position: "top-center",
            });
            return;
          }
      
          await AxiosUser.post(`reviews`, { turfId, review, rating},{headers});
          toggle();
          setRefresh(!refresh);
          toast.success('Review Submitted Successfully',{
            position: "top-center",
            autoClose:1000
          });
        } catch (err) {
          console.error(err);
        }
      };

    return (
        <>
            {isOpen ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                          
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                               
                                <div className="flex justify-content-center p-2 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-2xl text-gray-500 font-semibold">
                                        Review & Ratings
                                    </h3>
                                </div>
                            
                                <div className="relative p-6 flex-auto">
                                    <form onSubmit={handleSubmit}>

                                        <div style={{ textAlign: 'center', textTransform: 'uppercase' }}>
                                            <label className="block text-gray-900 font-bold mb-2" htmlFor="review">
                                                {username}
                                            </label>
                                        </div>


                                        <div className="mb-2">
                                        <RatingComponent rating={rating} setRating={setRating} />
                                        </div>

                                       
                                        <div className="mb-4">
                                            <textarea
                                                className="block appearance-none w-full  bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="review"
                                                placeholder='Review here'
                                                rows="5"
                                                value={review}
                                                onChange={(e) => setReview(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="flex items-center justify-end">

                                        <button
                                                className="text-red-500 background-transparent font-bold uppercase  text-sm outline-none mr-1 mb-1" 
                                                type="button"
                                                onClick={toggle}
                                            >
                                                Close
                                            </button>
                                            <button
                                               className="text-green-500 background-transparent font-bold uppercase  text-sm outline-none mr-1 mb-1"   
                                                type="submit"
                                            >
                                                Save
                                            </button>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="opacity-25 fixed inset-0 z-40 bg-black"></div> */}
                </>
            ) : null}

        </>
    );
};

export default ReviewModal