import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import findIndex from "lodash/findIndex";
import sortBy from "lodash/sortBy";
import React, { useState } from "react";
import { FocusWithin } from "react-focus-within";

import Messages from "../shared/components/submit-messages";
import Checkbox from "./Checkbox";
import FocusHandler from "./FocusHandler";
import Question from "./Question";

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

interface ICheckboxes {
  title: string;
  options: object;
  name: string;
  required?: boolean;
  includeSubmit?: boolean;
  handleChange?;
}

const Checkboxes: React.FC<ICheckboxes> = ({
  title = "Title",
  options = {},
  name = "",
  includeSubmit = false,
  handleChange
}) => {
  const [errorMessageVisible, setErrorMessageVisible] = React.useState(false);
  const [successMessageVisible, setSuccessMessageVisible] = React.useState(
    false
  );
  const [submitButtonDisabled, setSubmitButtonDisabled] = React.useState(true);

  const changeHandler = (e, optionId) => {
    let selected = [];

    if (e.target.checked) {
      selected = [...formik.values.selectedOptions, optionId];
    } else {
      selected = formik.values.selectedOptions.filter(el => el !== optionId);
    }

    // sort selected values to match the order of the original options
    selected = sortBy(selected, x =>
      findIndex(Object.keys(options), y => x === y)
    );

    formik.setFieldValue("selectedOptions", selected);

    if (handleChange) handleChange(selected);
  };

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
      setSuccessMessageVisible(true);
      setTimeout(() => {
        resetForm();
        setSuccessMessageVisible(false);
        setSubmitButtonDisabled(true);
      }, 10000);
    }
  });

  const classes = useStyles();
  return (
    <FocusWithin>
      {({ isFocused, getFocusProps }) => (
        <FocusHandler {...getFocusProps()}>
          <Box py={4}>
            <form
              data-testid="checkboxesComponent"
              onSubmit={formik.handleSubmit}
            >
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
                    {Object.entries(options).map(([optionId, label]) => (
                      <FormControlLabel
                        classes={{
                          root: classes.formControlLabelRoot,
                          label: classes.formControlLabel
                        }}
                        key={optionId}
                        control={
                          <Checkbox
                            checked={formik.values.selectedOptions.includes(
                              optionId
                            )}
                            disableRipple
                            onChange={e => {
                              changeHandler(e, optionId);
                            }}
                            value={optionId}
                            name={optionId}
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
                {includeSubmit && (
                  <Button
                    type="submit"
                    disabled={submitButtonDisabled}
                    variant="contained"
                    color="primary"
                  >
                    Save and Continue
                  </Button>
                )}
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
