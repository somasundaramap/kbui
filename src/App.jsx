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
            <Route path="/ui" element={<SignIn />} />
            <Route path="/ui/signin" element={<SignIn />} />
            <Route path="/ui/landingpage" element={<Landing />} />
            <Route path="/ui/viewinvoices" element={<ListInvoices />} />
            <Route path="/ui/viewpmtpending" element={<ViewPending />} />
            <Route path="/ui/createsubscriber" element={<CreateSubscriber />} />
            <Route path="/ui/paymentupdate" element={<PaymentUpdate />} />
            <Route path="/ui/createinvoice" element={<CreateInvoice />} />
            <Route path="/ui/updatepassword" element={<UpdatePassword />} />
        </Routes>
        </div>
    )
}

export default App;