import React, { useEffect, useState } from 'react';
import { AxiosUser } from '../../../../api/AxiosInstance';
import Rating from '@mui/material/Rating';
import { FaUserAlt } from "react-icons/fa";// Replace with the correct import for the Rating component
import './CardReview.css'

const CardReview = ({ id, refresh }) => {
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  const fetchReviews = async (id) => {
    try {
      const response = await AxiosUser.get(`getReviews/${id}`);
      console.log(response.data.reviews, "get response of review -----------------------");
      setReviews(response.data.reviews);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReviews(id);
  }, [refresh]);

  return (
    <div className="flex flex-col items-center mt-8 mb-10">
      <h1 className="text-xl font-bold mb-4">Reviews</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        {visibleReviews.length > 0 ? (
          visibleReviews.map((review, index) => (
            <div
              key={index}
              className={`p-3 ${index === 0 ? "" : "border-t border-gray-200"}`}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="">
                {review.userId.image ? (
                  <img
                    src={review.userId.image}
                    alt="Review Image"
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <FaUserAlt />
                )}

                <p className="text-gray-600 font-thin text-center">
                  {review.userId.username}
                </p>
              </div>

              <div>
                {/* <p className="text-gray-600">{review.rating}</p> */}
                <Rating
                  name="read-only"
                  className="ml-4"
                  value={review.rating}
                  readOnly
                />
                <p
                  className="text-gray-800"
                  style={{ flex: "1", marginLeft: "20px" }}
                >
                  {review.review}
                </p>

                {/* <div className="text-gray-400 text-sm text-right mt-2">
                  {new Date(review.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div> */}
                

              </div>
              <div className="text-gray-400 text-sm text-right mt-2 ml-auto">
                  {new Date(review.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>

            </div>
          ))
        ) : (
          <p className="p-4 text-gray-600">No reviews available.</p>
        )}
      </div>
      {reviews.length > 3 && (
        <button
          className="mt-4 text-blue-500 underline"
          onClick={() => setShowAllReviews(!showAllReviews)}
        >
          {showAllReviews ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default CardReview;

























// import React, { useEffect, useState } from 'react';
// import { AxiosUser } from '../../../../api/AxiosInstance';
// import Rating from '@mui/material/Rating';
// import { FaUserAlt } from "react-icons/fa";


// const CardReview = ({ id, refresh }) => {
//   const [reviews, setReviews] = useState([]);
//   const [showAllReviews, setShowAllReviews] = useState(false);
//   const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 4);

//   const fetchReviews = async (id) => {
//     try {
//       const response = await AxiosUser.get(`getReviews/${id}`);
//       console.log(response.data.reviews, "get response of review -----------------------");
//       setReviews(response.data.reviews);
//     } catch (error) {
//       console.error(error);
//     }
//   };


//   useEffect(() => {
//     fetchReviews(id);
//   }, [refresh]);

//   return (
//     <div className="flex flex-col items-center mt-8 mb-6">
//       <h1 className="text-xl font-bold mb-4">Reviews</h1>
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
//         {visibleReviews.length > 0 ? (
//           visibleReviews.map((review, index) => (
//             <div
//               key={index}
//               className={`p-3 ${index === 0 ? "" : "border-t border-gray-200"}`}
//               style={{ display: "flex", alignItems: "center" }}
//             >
//               <div className="">
//                 {review.userId.image ? (
//                   <img
//                     src={review.userId.image}
//                     alt="Review Image"
//                     className="w-12 h-12 rounded-full"
//                   />
//                 ) : (
//                   <FaUserAlt />
//                 )}

//                 <p className="text-gray-600 font-thin text-center">
//                   {review.userId.username}
//                 </p>
//               </div>

//               <div>
//                 {/* <p className="text-gray-600">{review.rating}</p> */}
//                 <Rating
//                   name="read-only"
//                   className="ml-4"
//                   value={review.rating}
//                   readOnly
//                 />
//                 <p
//                   className="text-gray-800"
//                   style={{ flex: "1", marginLeft: "20px" }}
//                 >
//                   {review.review}
//                 </p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="p-4 text-gray-600">No reviews available.</p>
//         )}
//       </div>
//       {reviews.length > 5 && (
//         <button
//           className="mt-4 text-blue-500 underline"
//           onClick={() => setShowAllReviews(!showAllReviews)}
//         >
//           {showAllReviews ? "Show Less" : "Show More"}
//         </button>
//       )}
//     </div>
//   );
// };

// export default CardReview;
















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