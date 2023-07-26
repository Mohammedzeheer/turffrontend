import React, { useEffect, useState } from 'react';
import { AxiosUser } from '../../../../api/AxiosInstance';

const CardReview = ({ id, refresh }) => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async (id) => {
    try {
      const response = await AxiosUser.get(`getReviews/${id}`);
      setReviews(response.data.reviews);
      console.log(response, "response");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReviews(id);
  }, [refresh]);

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-xl font-bold mb-4">Reviews</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className={`p-4 ${index === 0 ? '' : 'border-t border-gray-200'}`}>
              <p className="text-gray-600">{review.name}</p>
              <p className="text-gray-800">{review.review}</p>
            </div>
          ))
        ) : (
          <p className="p-4 text-gray-600">No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default CardReview;



















// import React, { useEffect, useState } from 'react';
// import { UserPort } from '../../../../store/port';
// import axios from 'axios'
// import './CardReview.css'
// import { AxiosUser } from '../../../../api/AxiosInstance';


// const CardReview = ({ id,refresh }) => {
//     const [reviews, setReviews] = useState([]);

//     const fetchReviews = async (id) => {
//         try {
//             const response = await AxiosUser.get(`getReviews/${id}`)
//             setReviews(response.data.reviews)
//             console.log(response, "response")
//         } catch (error) {
//             console.error(error);
//         }
//     }
//     useEffect(() => {
//         fetchReviews(id)
//     }, [refresh])

//     return (
//         <>
//          <p className=" font-sans text-center text-1xl md:text-2xl lg:text-3xl font-bold mb-6">Reviews</p>
//             <div className="flex flex-col bg-white m-auto p-auto    ">
//             <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
//                     <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 review-cards ">
//                         {reviews.length > 0 ? (
//                             reviews.map((review, index) => (
//                                 <div key={index} className="mr-20 mx-auto w-56 text-center my-4 bg-white rounded-lg shadow-lg">
//                                     <div className="px-6 py-4">
//                                         <div className="font-medium text-xl mb-2">{review.name}</div>
//                                         <p className="text-gray-700 italic text-base">{review.review}</p>
//                                     </div>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>No reviews available.</p>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </>       
//     );
// }

// export default CardReview;