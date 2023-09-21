import React from "react";
import PropTypes from "prop-types";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ReceiptOutlinedIcon from "@material-ui/icons/ReceiptOutlined";
import PaymentOutlinedIcon from "@material-ui/icons/PaymentOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import logo from "./invoismart-logo.png";
import Cookies from "js-cookie";
import { Link } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const styles = (theme) => ({
  menuItem: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& $primary, & $icon": {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {},
});

function ListItemComposition(props) {
  let navigate = useNavigate();
  if (!Cookies.get("cred")) {
    console.log("Cookie found");
    navigate("/ui/");
  }
  const cred = Cookies.get("cred");
  console.log(cred);
  const { classes } = props;
  const { t } = useTranslation();

  let navigate4 = useNavigate();
  const clickCreateSubscriber = () => {
    let path = "/ui/createsubscriber";
    navigate4(path);
  };
  let navigate3 = useNavigate();
  const clickCreateInvoice = () => {
    let path = "/ui/createinvoice";
    navigate3(path);
  };
  let navigate1 = useNavigate();
  const clickInvoicesList = () => {
    let path = "/ui/viewinvoices";
    navigate1(path);
  };
  let navigate2 = useNavigate();
  const clickPaymentUpdate = () => {
    let path = "/ui/paymentupdate";
    navigate2(path);
  };
  let navigate5 = useNavigate();
  const clickPaymentPending = () => {
    let path = "/ui/viewpmtpending";
    navigate5(path);
  };

  let navigate6 = useNavigate();
  const clickUpdatePassword = () => {
    let path = "/ui/updatepassword";
    navigate6(path);
  };

  let navigate8 = useNavigate();
  const clickPaymentsList = () => {
    let path = "/ui/viewpayments";
    navigate8(path);
  };

  let navigate7 = useNavigate();
  const clickSignout = () => {
    Cookies.remove("cred");
    Cookies.remove("accId");
    Cookies.remove("accName");
    let path = "/ui/Signin";
    toast.info(t("signoutsuccessfully"));
    navigate7(path);
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
        <Paper style={{ width: "350px" }}>
          <MenuList>
            <MenuItem
              onClick={clickCreateSubscriber}
              className={classes.menuItem}
            >
              <ListItemIcon className={classes.icon}>
                <PersonAddOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.primary }}
                inset
                primary={t("createsubscriber")}
              />
            </MenuItem>
            <MenuItem onClick={clickCreateInvoice} className={classes.menuItem}>
              <ListItemIcon className={classes.icon}>
                <CreateOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.primary }}
                inset
                primary={t("createinvoice")}
              />
            </MenuItem>
            <MenuItem onClick={clickInvoicesList} className={classes.menuItem}>
              <ListItemIcon className={classes.icon}>
                <ReceiptOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.primary }}
                inset
                primary={t("viewinvoices")}
              />
            </MenuItem>
            <MenuItem
              onClick={clickPaymentPending}
              className={classes.menuItem}
            >
              <ListItemIcon className={classes.icon}>
                <AccountBalanceWalletOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.primary }}
                inset
                primary={t("checkbalance")}
              />
            </MenuItem>

            <MenuItem onClick={clickPaymentUpdate} className={classes.menuItem}>
              <ListItemIcon className={classes.icon}>
                <PaymentOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.primary }}
                inset
                primary={t("paymentupdates")}
              />
            </MenuItem>
            <MenuItem onClick={clickPaymentsList} className={classes.menuItem}>
              <ListItemIcon className={classes.icon}>
                <ReceiptOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.primary }}
                inset
                primary={t("viewpayments")}
              />
            </MenuItem>
            <MenuItem
              onClick={clickUpdatePassword}
              className={classes.menuItem}
            >
              <ListItemIcon className={classes.icon}>
                <VpnKeyOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.primary }}
                inset
                primary={t("updatepassword")}
              />
            </MenuItem>

            <MenuItem onClick={clickSignout} className={classes.menuItem}>
              <ListItemIcon className={classes.icon}>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.primary }}
                inset
                primary={t("signout")}
              />
            </MenuItem>
          </MenuList>
        </Paper>
      </Box>
      <ToastContainer />
    </Container>
  );
}

ListItemComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItemComposition);
