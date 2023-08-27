import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import logo from "./invoismart-logo.png";
import Button from "@mui/material/Button";

const Payment = () => {
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const [selectedValue, setSelectedValue] = useState("");
  useEffect(() => {
    fetchInvoices("accounts");
  }, []);
  const [invoice, setInvoice] = useState([]);
  const [users, setUsers] = useState([]);
  const name = Cookies.get("username");
  const pass = Cookies.get("password");
  const subId = Cookies.get("accId");
  const subName = Cookies.get("accName");
  let URL =
    process.env.REACT_APP_BASE_URL +
    "accounts/" +
    subId +
    "/invoices?includeInvoiceComponents=true";
  console.log("In fetch inv " + subName + "|" + URL);
  const fetchInvoices = (a) => {
    fetch(URL, {
      method: "GET",
      headers: new Headers({
        Authorization: "Basic " + btoa(`${name}:${pass}`),
        Accept: "*/*",
        "X-Killbill-ApiKey": process.env.REACT_APP_API_KEY,
        "X-Killbill-ApiSecret": process.env.REACT_APP_API_SECRET,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setInvoice(data);
      });
  };

function UpdatePmt(){

console.log("In UpdatePmt"+ " accid " + invoice[selectedValue].accountId + " Inv Id "+ invoice[selectedValue].invoiceId + " Balance " + invoice[selectedValue].balance +" Uname "+ name +" Pass "+ pass );

const URI_INV = "invoices/";
fetch(process.env.REACT_APP_BASE_URL + URI_INV + invoice[selectedValue].invoiceId + "/payments?externalPayment=true", {
  method: "POST",
  headers: new Headers({
    Authorization: "Basic " + btoa(`${name}:${pass}`),
    Accept: "*/*",
    "Content-Type": "application/json",
    "X-Killbill-ApiKey": process.env.REACT_APP_API_KEY,
    "X-Killbill-ApiSecret": process.env.REACT_APP_API_SECRET,
    "X-kILLBILL-CreatedBy": "System Generated ",
  }),
  body: JSON.stringify({
    accountId: `${invoice[selectedValue].accountId}`,
    purchasedAmount: `${invoice[selectedValue].balance}`,
    targetInvoiceId: `${invoice[selectedValue].invoiceId}`,
  }),
})
  .then((res) => res.json()) // no error is thrown
  .then(() => alert("Payment has been updated"))
  .catch(() => alert("Error"));
return routeChange();
}

let navigate = useNavigate();
const routeChange = () => {
Cookies.set("username", name);
Cookies.set("password", pass);
let path = "/ui/Landingpage";
navigate(path);
}
  return (
    <Container component="main" maxWidth="sm">
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    ></Box>
    <Typography component="h1" variant="h5" align="center">
      <img src={logo} alt="Logo" width="250" height="83" class="left" />
      <br></br>
    </Typography>
    <Typography component="h1" variant="h5" align="center">
      Payment update for {subName}
    </Typography>
    <br></br> <br></br> <br></br>
    <Typography inline variant="body5" align="left" noWrap>
      Select Invoice
    </Typography>
    <nobr></nobr>
    <select
      margin="normal"
      fullWidth
      value={selectedValue}
      onChange={handleSelectChange}
    >
      <option value="none">-- Select Invoice  --</option>
      {invoice.map((key, index) => (
        <option value={index}>{key.invoiceNumber} - $ {key.balance.toFixed(2)}</option>
      ))}
    </select>
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 1 }}
      onClick={UpdatePmt}
    >
      Confirm Payment
    </Button>
  </Container>

  );
};

export default Payment;
