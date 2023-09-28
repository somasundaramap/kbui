import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./invoismart-logo.png";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
 

export default function SignIn() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const cred = btoa(`${name}:${pass}`);
  const [refresh, setRefresh] = useState(false);
  let navigate = useNavigate();
  const { t } = useTranslation();
  const urlencoded = new URLSearchParams();
  urlencoded.append("username", `${name}`);
  urlencoded.append("password", `${pass}`);
  
  const changeLanguage = (Lng) => {
    i18n.changeLanguage(Lng);
    Cookies.set("ISLng ", Lng);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if(!refresh) setRefresh(true)
  }, [refresh]);

  if (Cookies.get("cred")) {
    console.log("Cookie found");
    
    navigate("/ui/landingpage");
  }

  function myFunction() {
      fetch("http://localhost:8081/login", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded",
        }),
        body: urlencoded,
      })
       
      .then((res) => {
        if (!res.ok) {
          throw Error("Failed");
        } else {
          Cookies.set("cred", cred);
          navigate("/ui/landingpage");
        }
      })
      .catch((err) => {
        toast.error("Login failed");
      });

    return;
  }

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
          <Link href="/ui" underline="none">
            <img src={logo} alt="Logo" width="250" height="83" class="left" />
          </Link>
          <br></br>
          <br></br>
        </Typography>

        <div onChange={(e) => changeLanguage(e.target.value)}>
          Language:
          <input type="radio" name="english" value="en" />
          English
          <input type="radio" defaultChecked name="english" value="es" />
          Spanish
          <br></br>
          <br></br>
        </div>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label={t("username")}
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            error={!name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t("password")}
            type="password"
            id="password"
            autoComplete="current-password"
            value={pass}
            error={!pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={t("rememberme")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1 }}
            onClick={myFunction}
          >
            {t("signin")}
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                {t("forgotpassword?")}
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {t("donthaveanaccount?signup")}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <br></br>

      <ToastContainer />
    </Container>
  );
}
