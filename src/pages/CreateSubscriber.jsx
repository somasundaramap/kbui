import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function CreateSubscriber() {
  const [subName, setSubName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [addr1, setAddr1] = useState("");
  const [addr2, setAddr2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [currency, setCurrency] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const name = Cookies.get("username");
  const pass = Cookies.get("password");  

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

  };

  function myFunction() {
    const URI_ACCOUNT_CREATE = "accounts";
    fetch(process.env.REACT_APP_BASE_URL+URI_ACCOUNT_CREATE, {
      method: "GET",
      headers: new Headers({
        Authorization: "Basic " + btoa(`${name}:${pass}`),
        Accept: "*/*",
        "X-Killbill-ApiKey": process.env.REACT_APP_API_KEY,
        "X-Killbill-ApiSecret": process.env.REACT_APP_API_SECRET,
        "X-kILLBILL-CreatedBy":"System Generated ",
      }),
      body: JSON.stringify({
        name: `${subName}`,
        company: `${companyName}`,
        address1: `${addr1}`,
        address2: `${addr2}`,
        city: `${city}`,
        state: `${state}`,
        postalCode: `${postalCode}`,
        country: `${country}`,
        externalKey: `${subName}_killbill`,
        email: `${email}}`,
        phone: `${phone}`,
        currency: `${currency}`,
      }),
    })
      .then((res) => res.json()) // no error is thrown
      .then(() => alert("Subscriber created successfully")) 
      .catch(() => console.log("Error"));
    return routeChange();
  }

  let navigate = useNavigate();
  const routeChange = () => {
    Cookies.set("username", name );
    Cookies.set("password", pass );
    let path = "/ui/Landingpage";
    navigate(path);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          InvoiSmart - Create subscriber
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="sub_name"
            label="Subscriber name"
            name="sub_name"
            autoComplete="email"
            autoFocus
            onChange={(e) => setSubName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="company_name"
            label="Company name"
            name="company_name"
            autoComplete="email"
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="address1"
            label="Address 1"
            name="address1"
            autoComplete="email"
            onChange={(e) => setAddr1(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="address2"
            label="Address 2"
            name="address2"
            autoComplete="email"
            onChange={(e) => setAddr2(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="city"
            label="City"
            name="city"
            autoComplete="email"
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="state"
            label="State"
            name="state"
            autoComplete="email"
            onChange={(e) => setState(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="country"
            label="Country"
            name="country"
            autoComplete="email"
            onChange={(e) => setCountry(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="postalcode"
            label="Postal code"
            name="postalcode"
            autoComplete="email"
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="currency"
            label="Currency"
            name="currency"
            autoComplete="email"
            onChange={(e) => setCurrency(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone #"
            name="phone"
            autoComplete="email"
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="createsub"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={myFunction}
          >
            Create subscriber
          </Button>
          <Grid container></Grid>
        </Box>
      </Box>
    </Container>
  );
}
