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
import InvoiceList  from './pages/InvoiceList';
import Woops404 from './pages/woops404';
import PendingList from './pages/PendingList';
import Payment from './pages/Payment';
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

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
            <Route path="/ui/invoicelist" element={<InvoiceList />} />
            <Route path="/ui/pendinglist" element={<PendingList />} />            
            <Route path="/ui/*" element={<Woops404 />} />            
            <Route path="/ui/payment" element={<Payment />} />
        </Routes>
        <ToastContainer />
        </div>
    )
}

export default App;