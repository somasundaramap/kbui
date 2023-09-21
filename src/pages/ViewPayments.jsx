import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import logo from "./invoismart-logo.png";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "@mui/material";
import { useTranslation } from 'react-i18next';

const ListPayments = () => {
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const [selectedValue, setSelectedValue] = useState("");
  const cred = Cookies.get("cred");
  const [users, setUsers] = useState([]);
  const URI_ACCOUNT_PG = "accounts/pagination";
  const { t } = useTranslation();
  let navigate = useNavigate();

  if (!Cookies.get("cred")) {
    console.log("Cookie found");
    navigate("/ui/");
  }

 

  const fetchSubname = () => {
    //-----
    console.log(cred);
    fetch(process.env.REACT_APP_BASE_URL + URI_ACCOUNT_PG, {
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
        setUsers(data);
      });
  };

  
  useEffect(() => {
    fetchSubname();
  }, []);

  
  const routeChange = () => {
    let a = selectedValue;
    Cookies.set("accId", users[a].accountId);
    Cookies.set("accName", users[a].name);
    let path = "/ui/PaymentList";
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
        {t('payments')}
      </Typography>
      <br></br> <br></br> 
      <nobr></nobr>
      <TextField
        margin="normal"
        fullWidth
        select
        label={t('selectsubscriber')}
        value={selectedValue}
        selectProps={{}}
        onChange={handleSelectChange}
      >
        {users.map((key, index) => (
          <MenuItem value={index}>{key.name}</MenuItem>
        ))}
      </TextField>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 1 }}
        onClick={routeChange}
      >
        {t('submit')}
      </Button>
    </Container>
  );
};

export default ListPayments;
