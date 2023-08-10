import React, { useState } from 'react';
import PartnerNavbar from "../header/partnerNavbar";
import TopBar from '../sidebar/TopBar';
import {AxiosPartner} from '../../../api/AxiosInstance'
import {toast } from 'react-toastify'  
import 'react-toastify/dist/ReactToastify.css';

const AddTurf = () => {
  const partnerToken= localStorage.getItem('partner')
  // const headers={authorization:partnerToken}
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
    venueTypes: [], 
    prices: {}, 
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
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
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };


  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const venueType = name.replace('price_', ''); 
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      prices: {
        ...prevFormData.prices,
        [venueType]: value,
      },
    }));
  }



  const handlePhotoChange = (event) => {
    const selectedFiles = event.target.files;

    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    setImages(selectedFiles);
  };


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

  
    for(const image of images){
      formDataObject.append('photos',image)
    }
   
    try {
      const response = await AxiosPartner.post(`addturf`, formDataObject, {
        headers: {
          'Content-Type': 'multipart/form-data',
           authorization:partnerToken
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
      toast.error('Error submitting form:', error);
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
      <div className="m-3">
        <form onSubmit={handleSubmit}
          className="bg-customGreen sm-my-5 md:my-10  max-w-lg mx-auto border rounded-md p-4">
          <div className="text-white font-bold text-2xl pt-2">New Venue</div>
          <div className="text-white text-sm pb-4">Lets Getting Rolling...</div>

          <div className="grid grid-cols-2 gap-4 mb-4 ">
            <div>
              <input
                type="text"
                id="courtName"
                name="courtName"
                placeholder="Court Name"
                value={formData.courtName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div>
              <input
                type="text"
                id="mobileNumber"
                name="mobileNumber"
                placeholder=" Mobile Number"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <input
                type="text"
                id="state"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div>
              <input
                type="text"
                id="district"
                name="district"
                placeholder="District"
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
                placeholder="Opening Time"
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
                placeholder="Closing Time"
                value={formData.closingTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>

          <div className="mb-4">
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            ></textarea>
          </div>

          <div className="mb-4">
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Location"
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
                <input
                  className="mr-2"
                  type="checkbox"
                  name="venueTypes"
                  value="5s"
                  checked={formData.venueTypes.includes("5s")}
                  onChange={handleChange}
                />
                5 vs 5
              </label>
              <label className="pl-2 ml-2 mr-4 text-white text-sm">
                <input
                  className="mr-2 p-2"
                  type="checkbox"
                  name="venueTypes"
                  value="7s"
                  checked={formData.venueTypes.includes("7s")}
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
                <label
                  htmlFor={`price_${venueType}`}
                  className="block mb-2 text-white"
                >
                  Price for {venueType}
                </label>
                <input
                  type="text"
                  id={`price_${venueType}`}
                  name={`price_${venueType}`}
                  value={formData.prices[venueType] || ""}
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
            className="w-full py-2 mt-2 text-white bg-customBlue rounded-md hover:bg-blue-900"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
  }


export default AddTurf;









          {/* <label htmlFor="district" className="block mb-1 text-gray-800">
            District
          </label> */}

