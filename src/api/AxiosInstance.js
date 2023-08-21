import axios from 'axios';

// export const AxiosUser = axios.create({
//    baseURL: 'https://aoneturfserver.onrender.com/',
// });

// export const AxiosAdmin = axios.create({
//    baseURL: 'https://aoneturfserver.onrender.com/admin/',
// });

// export const AxiosPartner = axios.create({
//    baseURL: 'https://aoneturfserver.onrender.com/partner/',
// });


export const AxiosUser = axios.create({
  baseURL: 'http://localhost:4000/',
});

export const AxiosAdmin = axios.create({
baseURL: 'http://localhost:4000/admin/',
});

export const AxiosPartner = axios.create({
  baseURL: 'http://localhost:4000/partner/',
});




























// const handleAxiosError = (error) => {
//   const errorMessage = error.response
//     ? error.response.data.message
//     : 'An error occurred while request.';
  
// //   toast.error(errorMessage);
// console.log(errorMessage)
//   return Promise.reject(error);
// };


// AxiosUser.interceptors.response.use(
//   (response) => response,
//   (error) => handleAxiosError(error)
// );

// AxiosAdmin.interceptors.response.use(
//   (response) => response,
//   (error) => handleAxiosError(error)
// );

// AxiosPartner.interceptors.response.use(
//   (response) => response,
//   (error) => handleAxiosError(error)
// );





// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// export const AxiosUser = axios.create({
//   baseURL: 'http://localhost:4000/',
// });

// export const AxiosAdmin = axios.create({
//   baseURL: 'http://localhost:4000/admin/',
// });

// export const AxiosPartner = axios.create({
//   baseURL: 'http://localhost:4000/partner/',
// });

// const handleAxiosError = (error, navigate) => {
//   const errorMessage = error.response
//     ? error.response.data.message
//     : 'An error occurred while request.';

//   if (error.response) {
//     if (error.response.status === 404) {
//       toast.error('404 - Resource Not Found');
//       navigate('/PageNotFound');
//     } else if (error.response.status === 500) {
//       toast.error('500 - Internal Server Error');
//     } else {
//       toast.error(errorMessage);
//     }
//   } else {
//     toast.error(errorMessage);
//   }
//   console.log(errorMessage);

//   return Promise.reject(error);
// };

// const AxiosUserInterceptor = (error) => handleAxiosError(error, useNavigate());
// AxiosUser.interceptors.response.use((response) => response, AxiosUserInterceptor);

// const AxiosAdminInterceptor = (error) => handleAxiosError(error, useNavigate());
// AxiosAdmin.interceptors.response.use((response) => response, AxiosAdminInterceptor);

// const AxiosPartnerInterceptor = (error) => handleAxiosError(error, useNavigate());
// AxiosPartner.interceptors.response.use((response) => response, AxiosPartnerInterceptor);
