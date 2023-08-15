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

const ListInvoices = () => {
  const [users, setUsers] = useState([]);
  const name = Cookies.get("username");
  const pass = Cookies.get("password");
  const accId = Cookies.get("accId");
  const subName = Cookies.get("accName");
  let URL="http://localhost:8080/1.0/kb/accounts/" + accId + "/invoices";
  
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
        setUsers(data)});
      };
  
  
  useEffect(() => {
    fetchInvoices();
    }, );

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
        InvoiSmart - Invoices
        <br></br>
        <h5>Subscriber ID: {subName}</h5>
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Date </TableCell>
              <TableCell align="right">Invoice number</TableCell>
                     </TableRow>
          </TableHead>
          <TableBody> 
            {users.map((invois) => (
              <TableRow>
                <TableCell align="right">{invois.invoiceId}</TableCell>
                <TableCell align="right">{invois.invoiceNumber}</TableCell>             
              </TableRow>
            ))}         
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ListInvoices;