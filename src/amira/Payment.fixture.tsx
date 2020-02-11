import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

import useForm from "../lib/useForm";

interface IPayment {
  fee: number;
}
const Payment: React.FC<IPayment> = ({ fee }) => {
  return (
    <Box bgcolor="#ddd" px={2} py={5} textAlign="center">
      <Typography variant="h5" component="p">
        The planning fee for this project is
      </Typography>
      <Typography variant="h4" component="p">
        <strong>£{fee}</strong>
      </Typography>
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
    <Box bgcolor="background.paper" p={4}>
      <form onSubmit={handleSubmit}>
        <div>
          <Typography variant="h5" gutterBottom>
            Enter card details
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
            <Box fontSize="caption.fontSize" color="text.secondary" pt={1}>
              Accepted credit and debit card types
            </Box>
          </Box>
          <Box pb={3}>
            <Typography variant="caption" component="div" gutterBottom>
              Expiry date
            </Typography>
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
                <Box fontSize="24px" fontWeight="400" lineHeight="30px">
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
        </div>
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
const Receipt: React.FC<IReceipt> = ({ fee, paidOn }) => (
  <Box bgcolor="#ddd" px={3} py={4} textAlign="center">
    <Typography variant="h5">Planning fee paid</Typography>
    <Typography variant="h4" gutterBottom>
      <strong>£{fee}</strong>
    </Typography>
    <Box fontSize="caption.fontSize" textAlign="left">
      It was paid on
      <Typography variant="h6">{paidOn.toLocaleDateString()}</Typography>
    </Box>
  </Box>
);

export default {
  fee: <Payment fee={204} />,
  cardDetails: <CardDetails />,
  receipt: (
    <Receipt fee={204} paidOn={new Date(2020, 0, 1)} reference={"0271911328"} />
  )
};
