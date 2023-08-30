import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./invoismart-logo.png";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";



export default function SignIn() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const cred = btoa(`${name}:${pass}`);
  let navigate = useNavigate();
  let navigate_signin = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  function myFunction() {
    fetch(process.env.REACT_APP_BASE_URL + "invoices/pagination", {
      method: "GET",
      headers: new Headers({
        Authorization: "Basic " + cred,
        Accept: "*/*",
        "X-Killbill-ApiKey": process.env.REACT_APP_API_KEY,
        "X-Killbill-ApiSecret": process.env.REACT_APP_API_SECRET,
      }),
    })
      .then((response) => {
        console.log(response.status);
        if (response.status !== 401) {
          Cookies.set("cred", cred);
          let path = "/ui/Landingpage";
          navigate(path);
        } 
      })
      .catch((err) => {
        alert("Login failed");
      // toast.error("Login failed");
        let path = "/ui";
        navigate_signin(path);
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
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Username"
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
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={pass}
            error={!pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1 }}
            onClick={myFunction}
          >
            Sign In
          </Button>
          
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        <ToastContainer />
      </Box>
     </Container>

  );
}
