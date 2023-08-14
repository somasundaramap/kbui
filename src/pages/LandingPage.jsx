import React from "react";
import PropTypes from "prop-types";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
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

const name = Cookies.get("username");
const pass = Cookies.get("password");


function ListItemComposition(props) {
  const { classes } = props;
  Cookies.set("username", name, { expires: 7 });
  Cookies.set("password", pass, { expires: 7 });

  
  let navigate = useNavigate();
  const clickInvoicesList = () => {
    let path = "/ui/viewinvoices";
    navigate(path);
  };

  let navigate2 = useNavigate();
  const clickPaymentUpdate = () => {
    let path = "/ui/paymentupdate";
    navigate2(path);
  };

  let navigate3 = useNavigate();
  const clickCreateInvoice = () => {
    let path = "/ui/createinvoice";
    navigate3(path);
  };

  let navigate4 = useNavigate();
  const clickCreateSubscriber = () => {
    let path = "/ui/createsubscriber";
    navigate4(path);
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
        <Typography component="h1" variant="h5">
          <img src={logo} alt="Logo" width="150" height="100" class="left" />
        </Typography>
        <Paper style={{ width: "350px" }}>
          <MenuList>
            <MenuItem onClick={clickInvoicesList} className={classes.menuItem}>
              <ListItemIcon className={classes.icon}>
                <ReceiptOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.primary }}
                inset
                primary="View invoices"
              />
            </MenuItem>

            <MenuItem onClick={clickCreateInvoice} className={classes.menuItem}>
              <ListItemIcon className={classes.icon}>
                <CreateOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.primary }}
                inset
                primary="Create invoice"
              />
            </MenuItem>
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
                primary="Create subscriber"
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
                primary="Check balance"
              />
            </MenuItem>

            <MenuItem onClick={clickPaymentUpdate} className={classes.menuItem}>
              <ListItemIcon className={classes.icon}>
                <PaymentOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.primary }}
                inset
                primary="Payment updates"
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
                primary="Update password"
              />
            </MenuItem>
          </MenuList>
        </Paper>
      </Box>
    </Container>
  );
}

ListItemComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItemComposition);
