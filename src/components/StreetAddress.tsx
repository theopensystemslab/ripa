import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import React, { useState } from "react";

import Messages from "../shared/components/submit-messages";
import Question from "./Question";

interface IStreetAddress {
  title: string;
  type: string;
  options: string[];
  includeLookup?: boolean;
}

export const StreetAddress: React.FC<IStreetAddress> = ({
  title,
  type,
  options,
  includeLookup = false
}) => {
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
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
      case "county":
      case "postcode":
        return el;
      default:
        break;
    }
  };
  return (
    <Box py={4} maxWidth={480}>
      <form onSubmit={formik.handleSubmit}>
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

          {includeLookup && (
            <Button
              type="submit"
              disabled={submitButtonDisabled}
              variant="contained"
              color="primary"
            >
              Look up address
            </Button>
          )}

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
