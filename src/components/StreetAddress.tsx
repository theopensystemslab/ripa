import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import FocusWithin from "react-focus-within";

import Messages from "../shared/components/submit-messages";
import Question from "./Question";

interface IStreetAddress {
  title?: string;
  type: string;
  options: string[];
  includeLookup?: boolean;
}
const nations: string[] = [
  "nation1",
  "nation2",
  "nation3",
  "nation4",
  "nation5"
];
export const StreetAddress: React.FC<IStreetAddress> = ({
  title,
  type,
  options,
  includeLookup = false
}) => {
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
      case "nation":
        return "nation";
      case "country":
      case "postcode":
        return el;
      default:
        break;
    }
  };

  return (
    <FocusWithin>
      {({ isFocused, getFocusProps }) => (
        <div {...getFocusProps()}>
          <Box py={4} maxWidth={480}>
            <form
              data-testid="streetAddressForm"
              onSubmit={formik.handleSubmit}
            >
              {title && (
                <Box mb={1.5}>
                  <Question inFocus={isFocused}>
                    <strong>{title}</strong>
                  </Question>
                </Box>
              )}
              {options.map((el, index) => (
                <div key={`${el}-${index}`}>
                  <Box mb={2.5}>
                    {el === "nation" ? (
                      <>
                        <InputLabel id="nation-label">
                          {renderLabels(el)}
                        </InputLabel>
                        <Select
                          name={el}
                          fullWidth
                          onChange={formik.handleChange}
                          value={formik.values[el] || nations[0]}
                          labelId="nation-label"
                        >
                          {nations.map((x, i) => (
                            <MenuItem key={i} value={x}>
                              {x}
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    ) : (
                      <TextField
                        onChange={formik.handleChange}
                        placeholder={el}
                        label={renderLabels(el)}
                        fullWidth
                        value={formik.values[el] || ""}
                        type={type}
                        name={el}
                      />
                    )}
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
                    <Messages
                      type="success"
                      message="Form submitted successfully"
                    />
                  ) : null}
                </div>
              </Box>
            </form>
          </Box>
        </div>
      )}
    </FocusWithin>
  );
};

export default StreetAddress;
