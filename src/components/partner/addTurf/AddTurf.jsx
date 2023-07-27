import React, { useState } from 'react';
import axios from 'axios'
import PartnerNavbar from "../header/partnerNavbar";
import TopBar from '../sidebar/TopBar';
import { AdminPort, UserPort, PartnerPort } from '../../../store/port';
import { useSelector } from 'react-redux';
import {ToastContainer , toast } from 'react-toastify'  // for error npm 
import 'react-toastify/dist/ReactToastify.css';
import {AxiosPartner} from '../../../api/AxiosInstance'

const AddTurf = () => {
  const {partnerId} = useSelector(state => state.partner)
  const [selectImages,setSelectedImages]=useState([])
  const [images,setImages]=useState([])
  const [formData, setFormData] = useState({
    courtName: '',
    mobileNumber: '',
    state: '',
    district: '',
    openingTime:'',
    closingTime:'',
    description: '',
    location: '',
    venueTypes: [], // Changed to an array to support multiple selections
    prices: {}, // Object to store prices for each selected venue type
    // photos: [],
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Handle multi-select (venueTypes) differently
    if (type === 'checkbox') {
      // If it's a checkbox input, handle the selection of multiple options
      const isChecked = e.target.checked;
      setFormData((prevFormData) => {
        if (isChecked) {
          return {
            ...prevFormData,
            [name]: [...prevFormData[name], value],
            prices: {
              ...prevFormData.prices,
              [value]: '',
            },
          };
        } else {
          const { [value]: removedPrice, ...restPrices } = prevFormData.prices;
          return {
            ...prevFormData,
            [name]: prevFormData[name].filter((type) => type !== value),
            prices: restPrices,
          };
        }
      });
    } else {
      // For other inputs, handle as usual
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };


  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const venueType = name.replace('price_', ''); // Extract the venueType from the name
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      prices: {
        ...prevFormData.prices,
        [venueType]: value,
      },
    }));
  }


  // const handlePhotoChange1 = (e) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     photos: e.target.files,
  //   }));
  // };


  const handlePhotoChange = (event) => {
    const selectedFiles = event.target.files;

    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    setImages(selectedFiles);
  };

   console.log(images,"images console ...-----");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataObject = new FormData();
    formDataObject.append('courtName', formData.courtName);
    formDataObject.append('mobileNumber', formData.mobileNumber);
    formDataObject.append('state', formData.state);
    formDataObject.append('district', formData.district);
    formDataObject.append('openingTime', formData.openingTime);
    formDataObject.append('closingTime', formData.closingTime);
    formDataObject.append('description', formData.description);
    formDataObject.append('location', formData.location);
    formDataObject.append('venueTypes', JSON.stringify(formData.venueTypes));
    formDataObject.append('prices', JSON.stringify(formData.prices));
    formDataObject.append("partnerId", partnerId);

  
    // for (let i = 0; i < formData.photos.length; i++) {
    //   formDataObject.append(`photos[${i}]`, formData.photos[i]);
    // }
    
    for(const image of images){
      formDataObject.append('photos',image)
    }

    console.log(formDataObject,"------------formDataObject")
   
    try {
      const response = await AxiosPartner.post(`addturf`, formDataObject, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Form submitted successfully:', response.data);
      console.log('Form submitted message:', response.data.message);
      generateMessage(response.data.message)
      setFormData({
        courtName: '',
        mobileNumber: '',
        state: '',
        district: '',
        openingTime:'',
        closingTime:'',
        description: '',
        location: '',
        venueTypes: [],
        prices: {},
      });
      setSelectedImages([]);
      setImages([]);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

const generateMessage = (message) => toast.success(message, {
  autoClose: 1000, 
  position: toast.POSITION.TOP_CENTER
});

  return (
    <>
         <PartnerNavbar />
         <TopBar />
         <div className='m-3'>
         <form onSubmit={handleSubmit} className="bg-customGreen sm-my-5 md:my-10  max-w-lg mx-auto border rounded-md p-4">
  <div className='text-white font-bold  text-2xl pt-2'>
          New Venue
      </div>
      <div className='text-white text-sm pb-4'>
          Lets Getting Rolling...
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4 ">
        <div>
          {/* <label htmlFor="venueName" className="block mb-1 text-gray-800">
            Venue Name
          </label> */}
          <input
            type="text"
            id="courtName"
            name="courtName"
            placeholder='Court Name'
            value={formData.courtName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          {/* <label htmlFor="mobileNumber" className="block mb-1 text-gray-800">
            Mobile Number
          </label> */}
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            placeholder=' Mobile Number'
            value={formData.mobileNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>



      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          {/* <label htmlFor="state" className="block mb-1 text-gray-800">
            State
          </label> */}
          <input
            type="text"
            id="state"
            name="state"
            placeholder='State'
            value={formData.state}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          {/* <label htmlFor="district" className="block mb-1 text-gray-800">
            District
          </label> */}
          <input
            type="text"
            id="district"
            name="district"
            placeholder='District'
            value={formData.district}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>


      <div className="grid grid-cols-2 gap-4 mb-4 ">
        <div>
          <input
            type="text"
            id="openingTime"
            name="openingTime"
            placeholder='Opening Time'
            value={formData.openingTime}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <input
            type="text"
            id="closingTime"
            name="closingTime"
            placeholder='Closing Time'
            value={formData.closingTime}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>

      <div className="mb-4">
        {/* <label htmlFor="description" className="block mb-1 text-gray-800">
          Description
        </label> */}
        <textarea
          id="description"
          name="description"
          placeholder='Description'
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        ></textarea>
      </div>


      <div className="mb-4">
        {/* <label htmlFor="location" className="block mb-1 text-gray-800">
          Location
        </label> */}
        <input
          type="text"
          id="location"
          name="location"
          placeholder='Location'
          value={formData.location}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {/* <div className="grid grid-cols-2 gap-4 mb-4"> */}
      <div className="mb-4">
        <label className="block mb-2 text-white">Venue Types</label>
        <div className="flex">
          <label className="pl-2 ml-2 mr-4 text-white text-sm ">
            <input className='mr-2'
              type="checkbox"
              name="venueTypes"
              value="5s"
              checked={formData.venueTypes.includes('5s')}
              onChange={handleChange}
            />
            5 vs 5
          </label>
          <label className="pl-2 ml-2 mr-4 text-white text-sm">
            <input className='mr-2 p-2' 
              type="checkbox"
              name="venueTypes"
              value="7s"
              checked={formData.venueTypes.includes('7s')}
              onChange={handleChange}
            />
            7 vs 7
          </label>
        </div>
      </div>
      
        {formData.venueTypes
          .filter((venueType) => formData.prices.hasOwnProperty(venueType))
          .map((venueType) => (
            <div className="grid grid-cols-2 gap-4 mb-4" key={venueType}>
              <label htmlFor={`price_${venueType}`} className="block mb-2 text-white">
                Price for {venueType}
              </label>
              <input
                type="text"
                id={`price_${venueType}`}
                name={`price_${venueType}`}
                value={formData.prices[venueType] || ''}
                onChange={handlePriceChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          ))}

      <div className="mb-4">
       <label htmlFor="photos" className="block mb-2 text-white">
          Photos
        </label>
        <input
          type="file"
          id="photos"
          name="photos"
          multiple
          onChange={handlePhotoChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
   

      <button
        type="submit"
        className="w-full py-2 mt-2 text-white bg-customBlue rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
    </div>
    <ToastContainer/>
   
    </>
  )
  }


export default AddTurf;
















// const handlePriceChange1 = (e) => {
//   const { name, value } = e.target;
//   const venueType = name.replace('price_', ''); // Extract the venueType from the name

//   // If the name includes "price_", update the formData.prices
//   if (name.includes('price_')) {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       prices: {
//         ...prevFormData.prices,
//         [venueType]: value,
//       },
//     }));
//   } else {
//     // If it's a checkbox input, handle the selection of multiple options
//     const isChecked = e.target.checked;
//     setFormData((prevFormData) => {
//       if (isChecked) {
//         return {
//           ...prevFormData,
//           venueTypes: [...prevFormData.venueTypes, venueType],
//           prices: {
//             ...prevFormData.prices,
//             [venueType]: '',
//           },
//         };
//       } else {
//         const { [venueType]: removedPrice, ...restPrices } = prevFormData.prices;
//         return {
//           ...prevFormData,
//           venueTypes: prevFormData.venueTypes.filter((type) => type !== venueType),
//           prices: restPrices,
//         };
//       }
//     });
//   }
// };









// import React, { useState } from 'react';
// import axios from 'axios';
// import PartnerNavbar2 from '../header/PartnerNavbar2';
// import TopBar from '../sidebar/TopBar';
// import { AdminPort, UserPort, PartnerPort } from '../../../store/port';

// const AddTurf = () => {
//   const [formData, setFormData] = useState({
//     turfname: '',
//     location: '',
//     address: '',
//     pricing: '',
//     facilities: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const backendURL = `${PartnerPort}/addturf`;

//     axios
//       .post(backendURL, formData)
//       .then((response) => {
//         console.log('Data sent successfully!', response.data);
//       })
//       .catch((error) => {
//         console.error('Error sending data:', error);
//       });
//   };

//   return (
//     <>
//       <PartnerNavbar2 />
//       <TopBar />
//       <div className="max-w-md mx-auto my-20 p-10 bg-white rounded-md shadow-md shadow-top">
//         <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <div className="mb-4">
//             <label htmlFor="turfname" className="block font-bold mb-1">
//               Turf Name
//             </label>
//             <input
//               type="text"
//               id="turfname"
//               name="turfname"
//               value={formData.turfname}
//               onChange={handleChange}
//               required
//               className="w-full py-2 px-4 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="turfname" className="block font-bold mb-1">
//               Turf Name
//             </label>
//             <input
//               type="text"
//               id="turfname"
//               name="turfname"
//               value={formData.turfname}
//               onChange={handleChange}
//               required
//               className="w-full py-2 px-4 border border-gray-300 rounded-md"
//             />
//           </div>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="location" className="block font-bold mb-1">
//               Location
//             </label>
//             <input
//               type="text"
//               id="location"
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               required
//               className="w-full py-2 px-4 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="address" className="block font-bold mb-1">
//               Address
//             </label>
//             <textarea
//               id="address"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               required
//               className="w-full py-2 px-4 border border-gray-300 rounded-md resize-vertical h-20"
//             ></textarea>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="pricing" className="block font-bold mb-1">
//               Pricing
//             </label>
//             <input
//               type="text"
//               id="pricing"
//               name="pricing"
//               value={formData.pricing}
//               onChange={handleChange}
//               required
//               className="w-full py-2 px-4 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="facilities" className="block font-bold mb-1">
//               Facilities
//             </label>
//             <textarea
//               id="facilities"
//               name="facilities"
//               value={formData.facilities}
//               onChange={handleChange}
//               required
//               className="w-full py-2 px-4 border border-gray-300 rounded-md resize-vertical h-20"
//             ></textarea>
//           </div>
//           <div className="mb-4">
//             <button
//               type="submit"
//               className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AddTurf;

   






















// import React, { useState } from 'react';
// import axios from 'axios';
// import { AdminPort, UserPort, PartnerPort } from '../../../store/port';

// const AddTurf = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Replace 'YOUR_BACKEND_URL' with the actual backend endpoint URL
//     const backendURL = `${PartnerPort}/addturf`;

//     axios
//       .post(backendURL, formData)
//       .then((response) => {
//         console.log('Data sent successfully!', response.data);
//       })
//       .catch((error) => {
//         console.error('Error sending data:', error);
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Name:</label>
//         <input type="text" name="name" value={formData.name} onChange={handleChange} />
//       </div>
//       <div>
//         <label>Email:</label>
//         <input type="email" name="email" value={formData.email} onChange={handleChange} />
//       </div>
//       <div>
//         <label>Message:</label>
//         <textarea name="message" value={formData.message} onChange={handleChange} />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default AddTurf  ;


// import React, { useState } from 'react';
// import axios from 'axios';
// import PartnerNavbar2 from '../header/PartnerNavbar2';
// import TopBar from '../sidebar/TopBar';
// import { AdminPort, UserPort, PartnerPort } from '../../../store/port';


// const AddTurf = () => {
//   const [turfName, setTurfName] = useState('');
//   const [location, setLocation] = useState('');
//   const [price, setPrice] = useState('');
//   const [facilities, setFacilities] = useState('');
//   const [photo, setPhoto] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('turfName', turfName);
//     formData.append('location', location);
//     formData.append('pricing', price);
//     formData.append('facilities', facilities);
//     formData.append('photo', photo);
    

//     const data=await axios.post(`${PartnerPort}/addturf`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       },
//       withCredentials: true,
//     })
//       .then(response => {
//         // Handle successful response
//         console.log(response.data);
//         // Perform any additional actions if needed
//       })
//       .catch(error => {
//         // Handle error
//         console.error(error);
//         // Perform any error handling if needed
//       });
    

    
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setPhoto(file);
//   };

//   return (
//     <>
//      <PartnerNavbar2 />
//      <TopBar />
//     <form >
//       <label>
//         Turf Name:
//         <input
//           type="text"
//           value={turfName}
//           onChange={(e) => setTurfName(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Location:
//         <input
//           type="text"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Price:
//         <input
//           type="number"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Facilities:
//         <input
//           type="text"
//           value={facilities}
//           onChange={(e) => setFacilities(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Photo:
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//         />
//       </label>
//       <br />
//       <button onClick={handleSubmit}>Add Turf</button>
//     </form>
//     </>
//   );
// };

// export default AddTurf;











































// // import React, { useState } from 'react';

// // const AddTurf = ({ onTurfSubmit }) => {
// //   const [turfData, setTurfData] = useState({
// //     turfPhoto: '',
// //     place: '',
// //     amount: '',
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setTurfData({
// //       ...turfData,
// //       [name]: value,
// //     });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     // You can add additional validation before submitting the turfData
// //     onTurfSubmit(turfData);
// //     // Reset the form after submission
// //     setTurfData({
// //       turfPhoto: '',
// //       place: '',
// //       amount: '',
// //     });
// //   };

// //   return (
// //     <form className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg" onSubmit={handleSubmit}>
// //       <div className="mb-4">
// //         <label htmlFor="turfPhoto" className="block text-gray-700 font-bold mb-2">
// //           Turf Photo URL:
// //         </label>
// //         <input
// //           type="text"
// //           id="turfPhoto"
// //           name="turfPhoto"
// //           value={turfData.turfPhoto}
// //           onChange={handleChange}
// //           placeholder="Enter Turf Photo URL"
// //           className="px-4 py-2 border rounded w-full"
// //           required
// //         />
// //       </div>
// //       <div className="mb-4">
// //         <label htmlFor="place" className="block text-gray-700 font-bold mb-2">
// //           Place:
// //         </label>
// //         <input
// //           type="text"
// //           id="place"
// //           name="place"
// //           value={turfData.place}
// //           onChange={handleChange}
// //           placeholder="Enter Place Name"
// //           className="px-4 py-2 border rounded w-full"
// //           required
// //         />
// //       </div>
// //       <div className="mb-4">
// //         <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
// //           Amount:
// //         </label>
// //         <input
// //           type="text"
// //           id="amount"
// //           name="amount"
// //           value={turfData.amount}
// //           onChange={handleChange}
// //           placeholder="Enter Amount"
// //           className="px-4 py-2 border rounded w-full"
// //           required
// //         />
// //       </div>
// //       <button
// //         type="submit"
// //         className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
// //       >
// //         Add Turf
// //       </button>
// //     </form>
// //   );
// // };

// // export default AddTurf;
