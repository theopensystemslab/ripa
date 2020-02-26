import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Info } from "@material-ui/icons";
import * as React from "react";

import useForm from "./lib/useForm";

const useStyles = makeStyles(theme => ({
  notificationCard: {
    minHeight: "14rem",
    position: "relative",
    display: "flex",
    height: "100%",
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(3),
    backgroundColor: theme.palette.info.main,
    color: theme.palette.info.contrastText,
    "& a": {
      color: theme.palette.grey[800],
      opacity: "0.6"
    }
  },
  cardInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    display: "flex",
    width: "100%",
    alignItems: "center",
    padding: theme.spacing(1, 2),
    justifyContent: "space-between",
    color: theme.palette.grey[800]
  }
}));

interface IPayment {
  fee: number;
}
const Payment: React.FC<IPayment> = ({ fee }) => {
  const classes = useStyles();
  return (
    <Box className={classes.notificationCard} px={2}>
      <Typography variant="h5" component="p">
        The planning fee for this project is
      </Typography>
      <Typography variant="h3" component="p">
        <strong>£{fee}</strong>
      </Typography>
      <div className={classes.cardInfo}>
        <a href="#">How was this calculated?</a>
        <IconButton edge="end">
          <Info />
        </IconButton>
      </div>
    </Box>
  );
};

const CardDetails: React.FC = () => {
  const defaults = {
    cardholderName: "",
    month: "",
    year: "",
    securityCode: ""
  };

  const { values, handleChange, handleSubmit } = useForm(defaults, v => {
    console.log(v);
  });

  return (
    <Box py={4}>
      <form onSubmit={handleSubmit}>
        <Box maxWidth={440}>
          <Typography variant="h4" gutterBottom>
            <strong>Enter card details</strong>
          </Typography>
          <Box pb={3}>
            <TextField
              type="number"
              value={values.month}
              name="cardNumber"
              fullWidth
              onChange={handleChange}
              placeholder="card number"
              label="Card number"
            />
            <Box fontSize="body2.fontSize" color="grey.400" pt={1}>
              Accepted credit and debit card types
            </Box>
          </Box>
          <Box pb={3}>
            <Typography variant="body2" component="div" gutterBottom>
              Expiry date
            </Typography>
            <Box maxWidth={200}>
              <Grid container spacing={1} alignItems="flex-end" wrap="nowrap">
                <Grid item>
                  <TextField
                    type="number"
                    value={values.month}
                    name="month"
                    onChange={handleChange}
                    placeholder="month"
                    label="Month"
                  />
                </Grid>
                <Grid item>
                  <Box fontSize="24px" fontWeight="400" lineHeight="40px">
                    /
                  </Box>
                </Grid>
                <Grid item>
                  <TextField
                    type="number"
                    value={values.year}
                    name="year"
                    onChange={handleChange}
                    placeholder="year"
                    label="Year"
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box pb={3}>
            <TextField
              value={values.cardholderName}
              name="cardholderName"
              onChange={handleChange}
              placeholder="name"
              label="Name on card"
              fullWidth
            />
          </Box>
          <Box pb={5}>
            <TextField
              value={values.securityCode}
              name="securityCode"
              onChange={handleChange}
              placeholder="security code"
              label="Card security code"
            />
          </Box>
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Save and Continue
        </Button>
      </form>
    </Box>
  );
};

interface IReceipt {
  fee: number;
  paidOn: Date;
  reference: string;
}
const Receipt: React.FC<IReceipt> = ({ fee, paidOn }) => {
  const classes = useStyles();
  return (
    <Box className={classes.notificationCard}>
      <Typography variant="h5" component="p">
        Planning fee paid
      </Typography>
      <Typography variant="h3" component="p">
        <strong>£{fee}</strong>
      </Typography>
      <Grid container alignItems="flex-end" justify="space-between">
        <Grid item>
          <Box fontSize="caption.fontSize" pl={3} pt={3} textAlign="left">
            It was paid on
            <Typography variant="h6">{paidOn.toLocaleDateString()}</Typography>
          </Box>
          <Box fontSize="caption.fontSize" pl={3} pt={2} textAlign="left">
            Reference
            <Typography variant="h6">0271911328</Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box pr={3}>
            <a href="#">Request a refund</a>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default {
  fee: (
    <Container maxWidth="md">
      <Box p={4}>
        <Payment fee={204} />
      </Box>
    </Container>
  ),
  cardDetails: (
    <Box px={4} bgcolor="background.paper">
      <CardDetails />
    </Box>
  ),
  receipt: (
    <Container maxWidth="md">
      <Box p={4}>
        <Receipt
          fee={204}
          paidOn={new Date(2020, 0, 1)}
          reference={"0271911328"}
        />
      </Box>
    </Container>
  )
};
