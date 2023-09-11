import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import logo from "./invoismart-logo.png";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Link } from "@mui/material";
import { useTranslation } from 'react-i18next';

const Payment = () => {
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const [selectedValue, setSelectedValue] = useState("index");
  useEffect(() => {
    fetchInvoices("accounts");
  }, []);
  const [invoice, setInvoice] = useState([]);
  const cred = Cookies.get("cred");
  const subId = Cookies.get("accId");
  const subName = Cookies.get("accName");
  const { t } = useTranslation();
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
        Authorization: "Basic " + cred,
        Accept: "*/*",
        "X-Killbill-ApiKey": process.env.REACT_APP_API_KEY,
        "X-Killbill-ApiSecret": process.env.REACT_APP_API_SECRET,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setInvoice(data.filter(invf => invf.balance > 0));
      });
  };

  function UpdatePmt() {
    console.log(
      "In UpdatePmt" +
        " accid " +
        invoice[selectedValue].accountId +
        " Inv Id " +
        invoice[selectedValue].invoiceId +
        " Balance " +
        invoice[selectedValue].balance +
        " Uname " +
        cred +
        " SelectedValue " +
        selectedValue +
        " Index "
    );

    const URI_INV = "invoices/";
    fetch(
      process.env.REACT_APP_BASE_URL +
        URI_INV +
        invoice[selectedValue].invoiceId +
        "/payments?externalPayment=true",
      {
        method: "POST",
        headers: new Headers({
          Authorization: "Basic " + cred,
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
      }
    )
      .then((res) => res.json()) // no error is thrown
      .then(() => alert(t('paymenthasbeenupdated')))
      .catch(() => console.log("Error"));
    return routeChange();
    
  }

  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/ui/Landingpage";
    navigate(path);
  };
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
        <Link href="/ui/landingpage" underline="none">
          <img src={logo} alt="Logo" width="250" height="83" class="left" />
        </Link>
        <br></br>
      </Typography>
      <Typography component="h1" variant="h5" align="center">
        {t('paymentupdtefor')} {subName}
      </Typography>
      <br></br> <br></br> <br></br>
      <nobr></nobr>
      <TextField
        margin="normal"
        fullWidth
     //   value={selectedValue}
        onChange={handleSelectChange}
        label={t('selectinvoice')}
        select
        selectProps={{}}
      >
 
        {invoice.filter(invField => invField.balance > 0) 
        .map((key, index) => (
          <MenuItem value={index}>
            {key.invoiceNumber} - ${key.balance.toFixed(2)}
          </MenuItem>
        ))}
      </TextField>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 1 }}
        onClick={UpdatePmt}
      >
        {t('confirmpayment')}
      </Button>
    </Container>
  );
};

export default Payment;
