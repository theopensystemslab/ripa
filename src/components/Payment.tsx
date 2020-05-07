import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import React, { useState } from "react";
import FocusWithin from "react-focus-within";

import Messages from "../shared/components/submit-messages";
import Question from "./Question";

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
interface ICardDetails {
  cardholderName?: string;
  month?: number;
  year?: number;
  securityCode?: number;
  cardNumber?: number;
  includeSubmit?: boolean;
}
export const CardDetails: React.FC<ICardDetails> = ({
  includeSubmit = false
}) => {
  const [successMessageVisible, setSuccessMessageVisible] = React.useState(
    false
  );

  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      securityCode: "",
      month: "",
      year: "",
      cardholderName: ""
    },
    onSubmit: (values, { resetForm }) => {
      console.log(JSON.stringify(values, null, 2));
      setSuccessMessageVisible(true);
      setTimeout(() => {
        resetForm();
        setSuccessMessageVisible(false);
      }, 1000);
    }
  });
  return (
    <Box bgcolor="background.paper" py={6}>
      <FocusWithin>
        {({ isFocused, getFocusProps }) => (
          <form
            data-testid="cardDetailsForm"
            onSubmit={formik.handleSubmit}
            {...getFocusProps()}
          >
            <Box maxWidth={440}>
              <Box pb={1}>
                <Question inFocus={isFocused}>Enter card details</Question>
              </Box>
              <Box pb={3}>
                <TextField
                  type="number"
                  value={formik.values.cardNumber}
                  name="cardNumber"
                  fullWidth
                  onChange={formik.handleChange}
                  placeholder="Card number"
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
                  <Grid
                    container
                    spacing={1}
                    alignItems="flex-end"
                    wrap="nowrap"
                  >
                    <Grid item>
                      <TextField
                        type="number"
                        value={formik.values.month}
                        name="month"
                        onChange={formik.handleChange}
                        placeholder="Month"
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
                        value={formik.values.year}
                        name="year"
                        onChange={formik.handleChange}
                        placeholder="Year"
                        label="Year"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Box pb={3}>
                <TextField
                  value={formik.values.cardholderName}
                  name="cardholderName"
                  onChange={formik.handleChange}
                  placeholder="Name"
                  label="Name on card"
                  fullWidth
                />
              </Box>
              <Box pb={5}>
                <TextField
                  value={formik.values.securityCode}
                  name="securityCode"
                  onChange={formik.handleChange}
                  placeholder="security code"
                  label="Card security code"
                />
              </Box>
            </Box>
            {includeSubmit && (
              <Button type="submit" variant="contained" color="primary">
                Save and Continue
              </Button>
            )}
            <div>
              {successMessageVisible ? (
                <Messages
                  type="success"
                  message="Form submitted successfully"
                />
              ) : null}
            </div>
          </form>
        )}
      </FocusWithin>
    </Box>
  );
};

interface IReceipt {
  fee: number;
  paidOn: Date;
  reference: string;
}
export const Receipt: React.FC<IReceipt> = ({ fee, paidOn }) => (
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

export default Payment;
