import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./invoismart-logo.png";

const CreateInvoice = () => {
  const [users, setUsers] = useState([]);
  const [description, setDesc] = useState("");
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const cred = Cookies.get("cred");
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };
  console.log("Create Invoice: " + cred);

  const URI_ACCOUNT_PG = "accounts/pagination";
  const fetchUserData = () => {
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
        console.log(cred);
        const URI_INVOICE_GEN = "invoices/charges/";
        fetch(
          process.env.REACT_APP_BASE_URL + URI_INVOICE_GEN + selectedValue + "?autoCommit=true",
          {
            method: "POST",
            headers: new Headers({
              Authorization: "Basic " + cred,
              Accept: "*/*",
              "Content-Type": "application/json",
              "X-Killbill-ApiKey": process.env.REACT_APP_API_KEY,
              "X-Killbill-ApiSecret": process.env.REACT_APP_API_SECRET,
              "X-kILLBILL-CreatedBy": "System Generated ",
            }),
            body: JSON.stringify([
              {
                description: `${description}`,
                planName: `${reason}`,
                amount: `${amount}`,
                currency: "USD",
                accountId: `${selectedValue}`,
              },
            ]),
          }
        )
          .then((res) => res.json()) // no error is thrown
          .then(() => {
            routeChange();
          }) //
          .catch(() => console.log("Error"));
      });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  let navigate = useNavigate();
  const routeChange = () => {
//    Cookies.set("username", name);
 //   Cookies.set("password", pass);
    let path = "/ui/Landingpage";
    navigate(path);
  };
  return (
    <div>
      {users.map((user) => (
        <div hidden>{user.accountId}</div>
      ))}
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            //  alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" align="center">
            <img src={logo} alt="Logo" width="250" height="83" class="left" />
            <br></br>
          </Typography>
          <Typography component="h1" variant="h5" align="center">
            Generate invoice
          </Typography>
          <br></br> <br></br>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <select
              margin="normal"
              fullWidth
              value={selectedValue}
              onChange={handleSelectChange}
            >
              <option value="none">-- Select subscriber --</option>
              {users.map((option) => (
                <option value={option.accountId}>{option.name}</option>
              ))}
            </select>
            <TextField
              margin="normal"
              required
              fullWidth
              id="desc"
              label="Description"
              name="desc"
              autoComplete="desc"
              autoFocus
              onChange={(e) => setDesc(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="plan_name"
              label="Reason "
              name="reason"
              autoComplete="reason"
              onChange={(e) => setReason(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="amount"
              label="Amount"
              name="amount"
              autoComplete="amount"
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button
              type="createsub"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={fetchUserData}
            >
              Generate invoice
            </Button>
            <Grid container></Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default CreateInvoice;
