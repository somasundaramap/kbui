import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const name = Cookies.get("username");
const pass = Cookies.get("password");

const CreateInvoice = () => {
  const [users, setUsers] = useState([]);
  const [description, setDesc] = useState("");
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  const URI_ACCOUNT_PG = "accounts/pagination";
  const fetchUserData = () => {
    fetch(process.env.REACT_APP_BASE_URL+URI_ACCOUNT_PG, {
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
       
        const URI_INVOICE_GEN = "invoices/charges/";
        fetch(process.env.REACT_APP_BASE_URL+URI_INVOICE_GEN+selectedValue, {
          method: "POST",
          headers: new Headers({
            Authorization: "Basic " + btoa(`${name}:${pass}`),
            Accept: "*/*",
            "Content-Type": "application/json",
            "X-Killbill-ApiKey": process.env.REACT_APP_API_KEY,
            "X-Killbill-ApiSecret": process.env.REACT_APP_API_SECRET,
            "X-kILLBILL-CreatedBy":"System Generated ",
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
        })
          .then((res) => res.json()) // no error is thrown
          .then(() => {routeChange()}) //
          .catch(() => console.log("Error"));
      });
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  
  let navigate = useNavigate();
  const routeChange = () => {
    Cookies.set("username", name );
    Cookies.set("password", pass );
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
            InvoiSmart - generate invoice
          </Typography>
          <br></br> <br></br> <br></br>
          <Typography inline variant="body5" align="left" noWrap>select subscriber</Typography>
          <nobr></nobr>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <select margin="normal"
              
              fullWidth value={selectedValue} onChange={handleSelectChange}>
              {users.map((option) => (
                <option value={option.accountId}>{option.name}</option>
              ))}
            </select>
            <p> subscriber ID: {selectedValue}!</p>
                     <TextField
              margin="normal"
              required
              fullWidth
              id="desc"
              label="Description"
              name="desc"
              autoComplete="email"
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
              autoComplete="email"
              onChange={(e) => setReason(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="amount"
              label="Amount"
              name="amount"
              autoComplete="email"
              onChange={(e) => setAmount(e.target.value)}
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
