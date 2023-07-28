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
  const email = "mytel2";
  const pass = "mytel2";
  const fetchUserData = () => {
    fetch("http://localhost:8080/1.0/kb/invoices/pagination", {
      method: "GET",
      headers: new Headers({
        Authorization: "Basic " + btoa(`${email}:${pass}`),
        Accept: "*/*",
        "X-Killbill-ApiKey": "mytel2",
        "X-Killbill-ApiSecret": "mytel2",
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
    fetchUserData();
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
      >
        <Typography component="h1" variant="h5" align="left">
          InvoiSmart - Invoices
        </Typography>
        <TableContainer component={Paper} style={{ width: "350px" }}>
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
                  <TableCell align="ri ght">{user.invoiceDate}</TableCell>
                  <TableCell align="right">{user.invoiceNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default ListInvoices;
