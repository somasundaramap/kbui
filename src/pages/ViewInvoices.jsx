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
  //const name = "admin";
  //const pass = "password";
  console.log("Viewinvoices: "+name, pass);
  const fetchSubname = () => {
    //-----
    //console.log("In fetchSubname");
    console.log(URI_ACCOUNT_PG, process.env.REACT_APP_BASE_URL + URI_ACCOUNT_PG);
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
      }) ;
      //.then(console.log(JSON.stringify(users[0].name)))
  };

  useEffect(() => {
    fetchSubname();
  }, []);
 //console.log(JSON.stringify(users[selectedValue].name));
 
  let navigate = useNavigate();
  const routeChange = () => {
    Cookies.set("username", name );
    Cookies.set("password", pass );
    let a = selectedValue;
    console.log("ID"+ users[a].accountId );
    Cookies.set("accId", users[a].accountId);
    Cookies.set("accName", users[a].name);
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
                                    <option value="none" >
                -- Select subscriber --
            </option>
        {users.map((key, index) => (
          <option value={index}>{key.name}</option>
          
        ))}
      </select>
     
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
