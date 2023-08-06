import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { stripeKey } from "../../../../helpers/StripeKey";
import { AxiosUser } from "../../../../api/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import UserNavbar from "../../userHeader/UserNavbar";
import UserFooter from "../../userFooter/UserFooter";
import { FaBackward } from "react-icons/fa";

const BookingDetail = () => {
  const location = useLocation();
  const { ID, date, time, price, slot, email } = location.state;

  const formattedDate = new Date(date).toDateString();
  const token = localStorage.getItem("user");
  const [loading, setLoading] = useState(false);
  const [turfData, setTurfData] = useState();
  const Navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("stripe");

  const fetchTurf = async () => {
    try {
      console.log(ID, "id");
      const response = await AxiosUser.get(`viewTurf/${ID}`);
      setTurfData(response.data.turf);
      console.log(turfData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchTurf();
  }, []);

  const stripePromise = loadStripe(`${stripeKey}`);

  const handlePayment = async () => {
    setLoading(true);
    if (!token) return Navigate("/login");
    try {
      const response = await AxiosUser.post( `booking`,
        { ID, date, time, price, slot, email,selectedPaymentMethod },
        { headers: { authorization: token } }
      );
      console.log(response,'----------------response')
      if (response.data.errors) {
        const {wallet} = response.data.errors;
           generateError(wallet);
           setLoading(false);
      }
      if (response && response.status === 200) {
        if (selectedPaymentMethod === "stripe") {
         const stripe = await stripePromise;
         const result = await AxiosUser.get(`payment/${response.data._id}`);
         if (result && result.status === 200) {        
            await stripe.redirectToCheckout({ sessionId: result.data.response });
          } 
         }
          else if (selectedPaymentMethod === "wallet") {
             Navigate(`/success/${response.data._id}`)
          }
        }
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        if (data.message === "User is blocked") {
          generateError("User is blocked");
        } else {
          generateError("Internal server error");
        }
      } else {
        generateError("Something went wrong");
      }
    }
    setLoading(false);
  };

  const generateError = (err) =>
    toast.error(err, {
      autoClose: 1000,
      position: toast.POSITION.TOP_CENTER,
    });

  return (
    <>
      <UserNavbar />
      <section className="text-gray-600 body-font m-5">
        <div className="container mx-auto flex flex-wrap justify-center items-center">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <img
              src={turfData?.images[0]}
              alt="Turf"
              className="w-full h-auto rounded-lg"
            />
          </div>

          <div className="w-full lg:w-1/2 p-5 lg:p-10 flex flex-col items-center">
  <div className="text-center">
    <h2 className="font-sans font-bold p-3">Booking Details</h2>
    {turfData ? (
      <>
        <p className="mb-2 font-mono font-semibold text-lg">
          {turfData.courtName}
        </p>
        <p className="mb-2 text-sm">{turfData.location}</p>
        <p className="mb-2">Date: {formattedDate}</p>
        <p className="mb-2">Time: {time}</p>
        <p className="mb-2">Price: {price}</p>
        <p className="mb-2">Slot: {slot}</p>
        <div className="space-y-4 flex flex-col items-start">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value="stripe"
              checked={selectedPaymentMethod === "stripe"}
              onChange={() => setSelectedPaymentMethod("stripe")}
              className="form-radio h-4 w-4 text-indigo-600"
            />
            <span className="text-gray-700">Pay with Online</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value="wallet"
              checked={selectedPaymentMethod === "wallet"}
              onChange={() => setSelectedPaymentMethod("wallet")}
              className="form-radio h-4 w-4 text-indigo-600"
            />
            <span className="text-gray-700">Pay with Wallet</span>
          </label>
        </div>
        <button
          type="button"
          onClick={handlePayment}
          disabled={loading}
          className="w-full lg:w-[200px] h-10 p-0 font-semibold bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 mt-5 rounded-lg"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </>
    ) : (
      <p>Loading...</p>
    )}
  </div>
</div>

          <button
            type="button"
            onClick={() => Navigate(-1)}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex", // Use flex display to align items in the same row
              alignItems: "center",
            }}
            className="p-[10px] py-2 font-semibold rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 mt-5"
          >
            <FaBackward style={{ marginRight: "5px" }} /> Go Back
          </button>
        </div>
      </section>

      <UserFooter />
    </>
  );
};

export default BookingDetail;










// import { loadStripe } from "@stripe/stripe-js";
// import { useEffect, useState } from "react";
// import { stripeKey } from "../../../../helpers/StripeKey";
// import { AxiosUser } from "../../../../api/AxiosInstance";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import UserNavbar from "../../userHeader/UserNavbar";
// import UserFooter from "../../userFooter/UserFooter";
// import { FaBackward } from "react-icons/fa";

// const BookingDetail = () => {
//   const location = useLocation();
//   const { ID, date, time, price, slot, email } = location.state;

//   const formattedDate = new Date(date).toDateString();
//   const token = localStorage.getItem("user");
//   const [loading, setLoading] = useState(false);
//   const [turfData, setTurfData] = useState();
//   const Navigate = useNavigate();

//   const fetchTurf = async () => {
//     try {
//       console.log(ID, "id");
//       const response = await AxiosUser.get(`viewTurf/${ID}`);
//       setTurfData(response.data.turf);
//       console.log(turfData);
//     } catch (error) {
//       toast.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchTurf();
//   }, []);

//   const stripePromise = loadStripe(`${stripeKey}`);

//   const handlePayment = async () => {
//     setLoading(true);
//     if (!token) return Navigate("/login");
//     try {
//       const response = await AxiosUser.post(
//         `booking`,
//         { ID, date, time, price, slot, email },
//         { headers: { authorization: token } }
//       );

//       if (response && response.status === 200) {
//         const stripe = await stripePromise;
//         const result = await AxiosUser.get(`payment/${response.data._id}`);
//         if (result && result.status === 200) {
//           await stripe.redirectToCheckout({ sessionId: result.data.response });
//         }
//       }
//     } catch (error) {
//       if (error.response) {
//         const { data } = error.response;
//         if (data.message === "User is blocked") {
//           generateError("User is blocked");
//         } else {
//           generateError("Internal server error");
//         }
//       } else {
//         generateError("Something went wrong");
//       }
//     }
//     setLoading(false);
//   };

//   const generateError = (err) =>
//     toast.error(err, {
//       autoClose: 1000,
//       position: toast.POSITION.TOP_CENTER,
//     });

//   return (
//     <>
//       <UserNavbar />
//       <section className="text-gray-600 body-font m-5">
//         <div className="container mx-auto flex flex-wrap justify-center items-center">
//           <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
//             <img
//               src={turfData?.images[0]}
//               alt="Turf"
//               className="w-full h-auto rounded-lg"
//             />
//           </div>

//           <div className="w-full lg:w-1/2 p-5 lg:p-10">
//             <div className="text-center">
//               <h2 className="font-sans font-bold p-3">Booking Details</h2>
//               {turfData ? (
//                 <>
//                   <p className="mb-2 font-mono font-semibold text-lg">
//                     {turfData.courtName}
//                   </p>
//                   <p className="mb-2 text-sm">{turfData.location}</p>
//                   <p className="mb-2">Date: {formattedDate}</p>
//                   <p className="mb-2">Time: {time}</p>
//                   <p className="mb-2">Price: {price}</p>
//                   <p className="mb-2">Slot: {slot}</p>
//                   <button
//                     type="button"
//                     onClick={handlePayment}
//                     disabled={loading}
//                     className="w-full lg:w-[200px] h-10 p-0 font-semibold bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 mt-5 rounded-lg"
//                   >
//                     {loading ? "Processing..." : "Pay and Book"}
//                   </button>
//                 </>
//               ) : (
//                 <p>Loading...</p>
//               )}
//             </div>
//           </div>
//           <button
//             type="button"
//             onClick={() => Navigate(-1)}
//             style={{
//               marginLeft: "auto",
//               marginRight: "auto",
//               display: "flex", // Use flex display to align items in the same row
//               alignItems: "center",
//             }}
//             className="p-[10px] py-2 font-semibold rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 mt-5"
//           >
//             <FaBackward style={{ marginRight: "5px" }} /> Go Back
//           </button>
//         </div>
//       </section>

//       <UserFooter />
//     </>
//   );
// };

// export default BookingDetail;






// <>
// <UserNavbar/>
//   <section className="text-gray-600 body-font m-5">
//     <div className="container mx-auto">
//       <div className="text-center">
//         <h2 className="font-sans font-bold p-5">Booking Details</h2>
//         <p>Date: {formattedDate}</p>
//         <p>Time: {time}</p>
//         <p>Price:{price}</p>
//         <p>Slot: {slot}</p>
//         <button
//           type="button"
//           onClick={handlePayment}
//           disabled={loading}
//           className="w-[200px] h-8 p-0 font-semibold bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 mt-5"
//         >
//           {loading ? "Processing..." : "Pay and Book"}
//         </button>
//       </div>
//     </div>
//   </section>
//   <UserFooter/>
// </>
