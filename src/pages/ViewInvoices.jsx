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
import Button from "@mui/material/Button";

// const [selectedValue, setSelectedValue] = useState("");

const ListInvoices = () => {
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const [selectedValue, setSelectedValue] = useState("");
  const name = Cookies.get("username");
  const pass = Cookies.get("password");
  const [users, setUsers] = useState([]);
  const [subscriber, setSub] = useState([]);
  const URI_ACCOUNT_PG = "accounts/pagination";
  const URI_INVOICE_LIST = "invoices/pagination";

  const fetchSubname = () => {
    //-----
    fetch(process.env.REACT_APP_BASE_URL + URI_ACCOUNT_PG, {
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
        setUsers(data);
      });
  };

  useEffect(() => {
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
      <br></br> <br></br> <br></br>
      <Typography inline variant="body5" align="left" noWrap>
        subscriber
      </Typography>
      <nobr></nobr>
      <select
        margin="normal"
        //   onChange={(e) => setPass(e.target.value)}
        fullWidth
        value={selectedValue}
        onChange={handleSelectChange}
      >
        {users.map((option) => (
          <option value={option.accountId}>{option.name}</option>
        ))}
      </select>
      <p>We eat {selectedValue}!</p>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 1 }}
        onClick={test}
      >
        Submit
      </Button>
    </Container>
  );

function test() {
  fetchInvoices()
};

  function fetchInvoices() {
    console.log(selectedValue);
    console.log(
      process.env.REACT_APP_BASE_URL + "accounts/" + selectedValue + "/invoices"
    );
    fetch(
      process.env.REACT_APP_BASE_URL +
        "accounts/" +
        selectedValue +
        "/invoices",
      {
        method: "GET",
        headers: new Headers({
          Authorization: "Basic " + btoa(`${name}:${pass}`),
          Accept: "*/*",
          "X-Killbill-ApiKey": process.env.REACT_APP_API_KEY,
          "X-Killbill-ApiSecret": process.env.REACT_APP_API_SECRET,
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });
      <html>test</html>

    return (
      <html>test</html>
    //alert("test");
    /*  <Container component="main" maxWidth="sm">
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
      </Container> */
   );
  }
};
export default ListInvoices;
