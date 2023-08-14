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

const ListInvoices = () => {
  const [users, setUsers] = useState([]);
  const email = "admin";
  const pass = "password";
  const fetchInvoices = () => {
    fetch("http://localhost:8080/1.0/kb/invoices/pagination", {
      method: "GET",
      headers: new Headers({
        Authorization: "Basic " + btoa(`${email}:${pass}`),
        Accept: "*/*",
        "X-Killbill-ApiKey": "bob",
        "X-Killbill-ApiSecret": "lazar",
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });
  };
  
  const fetchSubname = () => {
    users.map((user) => (console.log(user.invoiceDate, user.accountId)));
    fetch("http://localhost:8080/1.0/kb/invoices/pagination", {
      method: "GET",
      headers: new Headers({
        Authorization: "Basic " + btoa(`${email}:${pass}`),
        Accept: "*/*",
        "X-Killbill-ApiKey": "bob",
        "X-Killbill-ApiSecret": "lazar",
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });
  };





  useEffect(() => {
    fetchInvoices();
    fetchSubname();
  }, []);

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
            {users.map((user) => (
              <TableRow>
                <TableCell align="right">{user.invoiceDate}</TableCell>
                <TableCell align="right">{user.invoiceNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ListInvoices;