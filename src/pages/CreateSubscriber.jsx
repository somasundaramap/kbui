import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "./invoismart-logo.png";
import { Link } from "@mui/material";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from 'react-i18next';

export default function CreateSubscriber() {
  const [subName, setSubName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [addr1, setAddr1] = useState("");
  const [addr2, setAddr2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const cred = Cookies.get("cred");
  const { t } = useTranslation();
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  function myFunction() {
    const URI_ACCOUNT_CREATE = "accounts";

    fetch(process.env.REACT_APP_BASE_URL + URI_ACCOUNT_CREATE, {
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
        name: `${subName}`,
        company: `${companyName}`,
        address1: `${addr1}`,
        address2: `${addr2}`,
        city: `${city}`,
        state: `${state}`,
        postalCode: `${postalCode}`,
        country: `${country}`,
        externalKey: `${subName}`,
        email: `${email}`,
        phone: `${phone}`,
        currency: "USD",
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(t('creationfailed'));
        }
//        res.json();
        toast.success((t('subscribercreated')));
      }) // no error is thrown
      .catch((err) => {
        toast.error(err);
      });
    return routeChange();
  }

  let navigate = useNavigate();
  const routeChange = () => {
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
        <Typography component="h1" variant="h5" align="center">
          <Link href="/ui/landingpage" underline="none">
            <img src={logo} alt="Logo" width="250" height="83" class="left" />
          </Link>
          <br></br>
        </Typography>
        <Typography component="h1" variant="h5">
          {t('createsubscriber')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="sub_name"
            label={t('subscribername')}
            name="sub_name"
            autoComplete="sub_name"
            autoFocus
            value={subName}
            error={!subName}
            onChange={(e) => setSubName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="company_name"
            label={t('copmpanyname')}
            name="company_name"
            autoComplete="company_name"
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="address1"
            label={t('address1')}
            name="address1"
            autoComplete="address1"
            onChange={(e) => setAddr1(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="address2"
            label={t('address2')}
            name="address2"
            autoComplete="address2"
            onChange={(e) => setAddr2(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="city"
            label={t('city')}
            name="city"
            autoComplete="city"
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="state"
            label={t('state')}
            name="state"
            autoComplete="state"
            onChange={(e) => setState(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="country"
            label={t('country')}
            name="country"
            autoComplete="country"
            defaultValue="USA"
            onChange={(e) => setCountry(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="postalcode"
            label={t('postalcode')}
            name="postalcode"
            autoComplete="postalcode"
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="currency"
            label={t('currency')}
            name="currency"
            autoComplete="currency"
            defaultValue="USD"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label={t('phonenumber')}
            name="phone"
            autoComplete="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('email')}
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
            {t('createsubscriber')}
          </Button>
          <Grid container></Grid>
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  );
}
