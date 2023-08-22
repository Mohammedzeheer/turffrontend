import { BrowserRouter, Routes,Route} from 'react-router-dom';
import './App.css';

import UserRouter from './router/UserRouter';
import AdminRouter from './router/AdminRouter';
import PartnerRouter from './router/PartnerRouter';

import PageNotFound from './components/404';
import Layout from './components/user/chat/Layout';


function App() {
  return (

    <BrowserRouter>
      <Routes>     
        {/* <Route path='/*' element={<UserRouter/>}> </Route> */}
        <Route path='/*' element={<Layout><UserRouter /></Layout>} />     
        <Route path='/admin/*' element={<AdminRouter/>}> </Route>
        <Route  path='/partner/*' element={<PartnerRouter/>}> </Route>

        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
