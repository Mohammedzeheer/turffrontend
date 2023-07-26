import React from 'react';
import ReactDOM from 'react-dom/client';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { Store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from "react-toastify";
// import { ToastProvider } from 'react-hot-toast';
import "react-toastify/dist/ReactToastify.css";
// import 'tailwindcss/dist/tailwind.min.css';




// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Provider store={Store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
         <ToastContainer />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
