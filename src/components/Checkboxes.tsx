import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import React, { useState } from "react";
import { FocusWithin } from "react-focus-within";

import Messages from "../shared/components/submit-messages";
import Checkbox from "./Checkbox";
import FocusHandler from "./FocusHandler";
import Question from "./Question";

interface ICheckboxes {
  title: string;
  options: object;
  name: string;
  required?: boolean;
}

const useStyles = makeStyles(theme =>
  createStyles({
    formControlLabelRoot: {
      marginLeft: 0,
      marginBottom: theme.spacing(1.5)
    },
    formControlLabel: {
      fontWeight: 400
    }
  })
);

const Checkboxes: React.FC<ICheckboxes> = ({
  title = "Title",
  options = {},
  name = ""
}) => {
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  const formik = useFormik({
    initialValues: {
      [name]: "",
      selectedOptions: []
    },
    validate: values => {
      if (values.selectedOptions.length === 0) {
        setErrorMessageVisible(true);
        setSubmitButtonDisabled(true);
      } else {
        setErrorMessageVisible(false);
        setSubmitButtonDisabled(false);
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

  const classes = useStyles();
  return (
    <FocusWithin>
      {({ isFocused, getFocusProps }) => (
        <FocusHandler {...getFocusProps()}>
          <Box py={4}>
            <form onSubmit={formik.handleSubmit}>
              <Box pb={1}>
                <Question inFocus={isFocused}>{title}</Question>
              </Box>
              <FormControl component="fieldset">
                <FormLabel
                  component="legend"
                  className={classes.formControlLabelRoot}
                >
                  <Box
                    fontSize="caption.fontSize"
                    color="text.secondary"
                    mb={1}
                  >
                    Select all that apply
                  </Box>
                </FormLabel>

                <Box mb={3}>
                  <FormGroup>
                    {Object.entries(options).map(([id, label]) => (
                      <FormControlLabel
                        classes={{
                          root: classes.formControlLabelRoot,
                          label: classes.formControlLabel
                        }}
                        key={id}
                        control={
                          <Checkbox
                            checked={formik.values.selectedOptions.includes(id)}
                            disableRipple
                            onChange={e => {
                              if (e.target.checked) {
                                formik.setFieldValue("selectedOptions", [
                                  ...formik.values.selectedOptions,
                                  id
                                ]);
                              } else {
                                formik.setFieldValue(
                                  "selectedOptions",
                                  formik.values.selectedOptions.filter(
                                    el => el !== id
                                  )
                                );
                              }
                            }}
                            value={id}
                            name={id}
                          />
                        }
                        label={label}
                      />
                    ))}
                  </FormGroup>
                </Box>
                {errorMessageVisible && formik.touched ? (
                  <Messages
                    type="error"
                    message="Please choose at least one option"
                  />
                ) : null}
                <Button
                  type="submit"
                  disabled={submitButtonDisabled}
                  variant="contained"
                  color="primary"
                >
                  Save and Continue
                </Button>
                {successMessageVisible ? (
                  <Messages
                    type="success"
                    message="Form submitted successfully"
                  />
                ) : null}
              </FormControl>
            </form>
          </Box>
        </FocusHandler>
      )}
    </FocusWithin>
  );
};

export default Checkboxes;
