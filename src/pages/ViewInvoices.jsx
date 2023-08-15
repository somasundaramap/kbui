import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

// const [selectedValue, setSelectedValue] = useState("");

const ListInvoices = () => {
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const [selectedValue, setSelectedValue] = useState("");
  const name = Cookies.get("username");
  const pass = Cookies.get("password");
  const [users, setUsers] = useState([]);
  const URI_ACCOUNT_PG = "accounts/pagination";
  
  const fetchSubname = () => {
    //-----
    //console.log("In fetchSubname");
    console.log(process.env.REACT_APP_BASE_URL + URI_ACCOUNT_PG);
    fetch(process.env.REACT_APP_BASE_URL + URI_ACCOUNT_PG, {
      method: "GET",
      headers: new Headers({
        Authorization: "Basic " + btoa(`${name}:${pass}`),
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
    fetchSubname();
  }, []);
 // console.log(selectedValue);
 
  let navigate = useNavigate();
  const routeChange = () => {
    Cookies.set("username", name );
    Cookies.set("password", pass );
    let a = selectedValue;
    console.log("ID"+ selectedValue);
    Cookies.set("accId", a);
    Cookies.set("accName", a);
let path = "/ui/InvoiceList";
    navigate(path);}

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
        Select Subscriber
      </Typography>
      <nobr></nobr>
      <select
        margin="normal"
        fullWidth
        value={selectedValue}
        onChange={handleSelectChange}
      >
        {users.map((option) => (
          <option value={option.accountId}>{option.name}</option>
        ))}
      </select>
      <p>Subscriber ID: {selectedValue}</p>
     
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 1 }}
        onClick={routeChange}
      >
        Submit
      </Button>
    </Container>
  );
};

export default ListInvoices;
