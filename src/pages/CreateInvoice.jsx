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
import MenuItem from "@mui/material/MenuItem";
import { Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateInvoice = () => {
  const [users, setUsers] = useState([]);
  const [description, setDesc] = useState("");
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const cred = Cookies.get("cred");
  const { t } = useTranslation();

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
          process.env.REACT_APP_BASE_URL +
            URI_INVOICE_GEN +
            selectedValue +
            "?autoCommit=true",
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
          .then((res) => {
            if (!res.ok) {
              throw Error(t("invoicegenerationfailed"));
            }
            toast.success(t("invoicegenerated"));
            routeChange();
          }) //
          .catch((err) => console.log(err));
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  let navigate = useNavigate();
  const routeChange = () => {
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
          }}
        >
          <Typography component="h1" variant="h5" align="center">
            <Link href="/ui/landingpage" underline="none">
              <img src={logo} alt="Logo" width="250" height="83" class="left" />
            </Link>
            <br></br>
          </Typography>
          <Typography component="h1" variant="h5" align="center">
            {t("generateinvoice")}
          </Typography>
          <br></br> <br></br>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              label={t("selectsubscriber")}
              margin="normal"
              fullWidth
              value={selectedValue}
              onChange={handleSelectChange}
              select
              selectProps={{}}
            >
              {users.map((option) => (
                <MenuItem value={option.accountId}>{option.name}</MenuItem>
              ))}
            </TextField>

            <TextField
              margin="normal"
              required
              fullWidth
              id="desc"
              label={t("description")}
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
              label={t("reason")}
              name="reason"
              autoComplete="reason"
              onChange={(e) => setReason(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="amount"
              label={t("amount")}
              name="amount"
              autoComplete="amount"
              value={amount}
              helperText={
                amount.trim().length !== 0
                  ? t("amountisrequired")
                  : t("amountisrequired")
              }
              error={!amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button
              type="createsub"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={fetchUserData}
            >
              {t("generateinvoice")}
            </Button>
            <Grid container></Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default CreateInvoice;
