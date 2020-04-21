import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import React from "react";

import Messages from "../shared/components/submit-messages";
import Question from "./Question";

interface IText {
  title: string;
  type: string;
  options: string[];
}

export const StreetAddress: React.FC<IText> = ({ title, type, options }) => {
  const [errorMessageVisible, setErrorMessageVisible] = React.useState(false);
  const [successMessageVisible, setSuccessMessageVisible] = React.useState(
    false
  );
  const [submitButtonDisabled, setSubmitButtonDisabled] = React.useState(true);
  const formik = useFormik({
    initialValues: {},
    validate: values => {
      if (
        values["building"] &&
        values["building"] !== "" &&
        values["street"] &&
        values["street"] !== "" &&
        values["city"] &&
        values["city"] !== ""
      ) {
        setErrorMessageVisible(false);
        setSubmitButtonDisabled(false);
      } else {
        setErrorMessageVisible(true);
        setSubmitButtonDisabled(true);
      }
    },
    onSubmit: (values, { resetForm }) => {
      console.log(JSON.stringify(values, null, 2));
      setSuccessMessageVisible(true);
      setTimeout(() => {
        resetForm();
        setSuccessMessageVisible(false);
        setSubmitButtonDisabled(true);
      }, 1000);
    }
  });
  const renderLabels = el => {
    switch (el) {
      case "building":
        return "Building and street";
      case "street":
        return "";
      case "city":
        return "Town or City";
      case "country":
      case "postcode":
        return el;
      default:
        break;
    }
  };
  return (
    <Box py={4} maxWidth={480}>
      <form data-testid="streetAddressForm" onSubmit={formik.handleSubmit}>
        <Box mb={1.5}>
          <Question>
            <strong>{title}</strong>
          </Question>
        </Box>
        {options.map((el, index) => (
          <div key={`${el}-${index}`}>
            <Box mb={2.5}>
              <TextField
                onChange={formik.handleChange}
                placeholder={el}
                label={renderLabels(el)}
                fullWidth
                value={formik.values[el] || ""}
                type={type}
                name={el}
              />
            </Box>
          </div>
        ))}
        <Box textAlign="right">
          <div>
            {errorMessageVisible && formik.touched ? (
              <Messages
                type="error"
                message="Please Fill the Building, Street and Town fields"
              />
            ) : null}
          </div>

          <Button
            type="submit"
            disabled={submitButtonDisabled}
            variant="contained"
            color="primary"
          >
            Look up address
          </Button>
          <div>
            {successMessageVisible ? (
              <Messages type="success" message="Form submitted successfully" />
            ) : null}
          </div>
        </Box>
      </form>
    </Box>
  );
};

export default StreetAddress;
