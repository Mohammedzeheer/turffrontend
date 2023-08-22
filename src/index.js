import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { Store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const toastContainerOptions = {
//   position: "top-center",
//   autoClose: 2000,
//   hideProgressBar: false,
//   newestOnTop: false,
//   closeOnClick: true,
//   rtl: false,
//   pauseOnFocusLoss: true,
//   draggable: true,
//   pauseOnHover: true,
// };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
         <ToastContainer
        width ='220px' 
        fontSize= '10px'  
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);






// import 'tailwindcss/dist/tailwind.min.css';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Provider store={Store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );