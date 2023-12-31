import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import logo from "./invoismart-logo.png";
import { Link } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

const ListInvoices = () => {
  useEffect(() => {
    fetchInvoices("accounts");
  }, []);
  const [invoice, setInvoice] = useState([]);
  const cred = Cookies.get("cred");
  const subId = Cookies.get("accId");
  const subName = Cookies.get("accName");
  const { t } = useTranslation();

/*
  useEffect(() => {
    if(!refresh) setRefresh(true)
  }, [Refresh]);

  if (Cookies.get("cred")) {
    console.log("Cookie found");
    navigate("/ui/Viewinvoices");
  }
*/
  let URL =
    process.env.REACT_APP_BASE_URL +
    "accounts/" +
    subId +
    "/payments";

  const fetchInvoices = (a) => {
    fetch(URL, {
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
        setInvoice(data);
      });
  };

  function htmlView(a) {
    var w = window.open("", "_self");
    const URI_INV_VIEW = "payments/";
    const URI_HTML = "/html";
    fetch(process.env.REACT_APP_BASE_URL + URI_INV_VIEW + a + URI_HTML, {
      method: "GET",
      headers: new Headers({
        Authorization: "Basic " + cred,
        Accept: "*/*",
        "X-Killbill-ApiKey": process.env.REACT_APP_API_KEY,
        "X-Killbill-ApiSecret": process.env.REACT_APP_API_SECRET,
      }),
    })
      .then((response) => {
        return response.text();
      })
      .then((html) => {
        w.document.body.innerHTML = html;
      
      });
  }

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
        <br></br>
        <p>{t('subscriber')}: {subName}</p>
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">{t('updateddate')} </TableCell>
              <TableCell align="right">{t('paymentnumber')}</TableCell>
              <TableCell align="right">{t('authamount')}($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoice.map((invField) => (
              <TableRow>
                <TableCell align="right">{invField.transactions[0].effectiveDate.slice(0,10)}</TableCell>
                <TableCell align="right">
                    {invField.paymentNumber}
                </TableCell>
                <TableCell align="right">
                  {invField.purchasedAmount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ListInvoices;