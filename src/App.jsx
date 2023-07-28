import React from 'react'
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/LandingPage";
import SignIn from "./pages/Login";
import ListInvoices from "./pages/ViewInvoices"; 
import ViewPending from "./pages/ViewPmtPending";
import CreateSubscriber from './pages/CreateSubscriber';
import PaymentUpdate from './pages/PaymentUpdate';
import CreateInvoice from './pages/CreateInvoice';
import UpdatePassword from './pages/UpdatePassword';

function App() {
    return (
        <div>
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/landingpage" element={<Landing />} />
            <Route path="/viewinvoices" element={<ListInvoices />} />
            <Route path="/viewpmtpending" element={<ViewPending />} />
            <Route path="/createsubscriber" element={<CreateSubscriber />} />
            <Route path="/paymentupdate" element={<PaymentUpdate />} />
            <Route path="/createinvoice" element={<CreateInvoice />} />
            <Route path="/updatepassword" element={<UpdatePassword />} />
        </Routes>
        </div>
    )
}

export default App;