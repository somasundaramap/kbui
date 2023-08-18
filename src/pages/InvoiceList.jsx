import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import { Link } from "react-router-dom"
import logo from "./invoismart-logo.png";

const ListInvoices = () => {
  const [invoice, setInvoice] = useState([]);
  const name = Cookies.get("username");
  const pass = Cookies.get("password");
  const subId = Cookies.get("accId");
  const subName = Cookies.get("accName");
  let URL = process.env.REACT_APP_BASE_URL + "accounts/" + subId + "/invoices?includeInvoiceComponents=true";
 // console.log(subName);
  const fetchInvoices = () => {
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

  useEffect(() => {
    fetchInvoices();
  });

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
        Invoices
        <br></br>
        <p>Subscriber: {subName}</p>
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Date </TableCell>
              <TableCell align="right">Invoice number</TableCell>
              <TableCell align="right">Amount($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoice.map((invField) => (
              <TableRow>
                <TableCell align="right">{invField.invoiceDate}</TableCell>
                <TableCell align="right"> <Link to="https:/invoismart.com/ui/InvoiceHtmlview">{invField.invoiceNumber}</Link></TableCell>
                <TableCell align="right">{invField.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ListInvoices;
