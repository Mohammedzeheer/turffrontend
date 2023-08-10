import axios from 'axios';
import { toast } from 'react-toastify';

// Create Axios instances
export const AxiosUser = axios.create({
  baseURL: 'http://localhost:4000/',
});

export const AxiosAdmin = axios.create({
  baseURL: 'http://localhost:4000/admin/',
});

export const AxiosPartner = axios.create({
  baseURL: 'http://localhost:4000/partner/',
});


const handleAxiosError = (error) => {
  const errorMessage = error.response
    ? error.response.data.message
    : 'An error occurred while request.';
  
//   toast.error(errorMessage);
console.log(errorMessage)
  return Promise.reject(error);
};


AxiosUser.interceptors.response.use(
  (response) => response,
  (error) => handleAxiosError(error)
);

AxiosAdmin.interceptors.response.use(
  (response) => response,
  (error) => handleAxiosError(error)
);

AxiosPartner.interceptors.response.use(
  (response) => response,
  (error) => handleAxiosError(error)
);






// import axios from "axios"
// import { toast } from 'react-toastify';

// export const AxiosUser = axios.create({
//     baseURL: 'http://localhost:4000/',
// })


// export const AxiosAdmin=axios.create({
//     baseURL:'http://localhost:4000/admin/'
// })



// export const AxiosPartner=axios.create({
//     baseURL:'http://localhost:4000/partner/'
// })

