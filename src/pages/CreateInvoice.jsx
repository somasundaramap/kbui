import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

const CreateInvoice = () => {
  const [users, setUsers] = useState([]);
  const [description, setDesc] = useState("");
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const email = "admin";
  const pass = "password";

  const fetchUserData = () => {
    fetch(
      "http://localhost:8080/1.0/kb/accounts/search/test_json_user3_killbill",
      {
        method: "GET",
        headers: new Headers({
          Authorization: "Basic " + btoa(`${email}:${pass}`),
          Accept: "*/*",
          "X-Killbill-ApiKey": "dwlservice",
          "X-Killbill-ApiSecret": "dwlservice",
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);

        const a = users[0].accountId;

        const apiurl = "http://localhost:8080/1.0/kb/invoices/charges/" + a;
        console.log(apiurl);
        console.log(description);
        console.log(amount);

        fetch(apiurl, {
          method: "POST",
          headers: new Headers({
            Authorization: "Basic " + btoa(`${email}:${pass}`),
            "Content-Type": "application/json",
            "X-Killbill-ApiKey": "dwlservice",
            "X-Killbill-ApiSecret": "dwlservice",
            "X-Killbill-CreatedBy": "Soms",
          }),
          body: JSON.stringify([
            {
              description: `${description}`,
              planName: `${reason}`,
              amount: `${amount}`,
              currency: `${currency}`,
              accountId: `${a}`,
            },
          ]),
        })
          .then((res) => res.json()) // no error is thrown
          .then(() => console.log("Success")) //
          .catch(() => console.log("Error"));
      });
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
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            InvoiSmart - generate invoice
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
