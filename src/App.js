import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home/home';
import Ticket from './Ticket/ticket';
import RePrint from './Components/rePrint/RePrint';
import Verification from './Components/verification/Verification';
// import Form2 from './form2/form2';
// import Signature from './signature/signature';
// import Site_reg from './site_reg/site_reg';


function App() {
  return (
    

      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Home/>}/>
          <Route path='ticket' element = {<Ticket/>}/>
          <Route path='re-print' element = {<RePrint/>}/>
          <Route path='verification' element = {<Verification/>}/>
          {/* <Route path='signature' element = {<Signature/>}/> */}
          {/* <Route path='Site_reg' element = {<Site_reg/>}/> */}
        </Routes>
    </BrowserRouter>
  );
}

export default App;
