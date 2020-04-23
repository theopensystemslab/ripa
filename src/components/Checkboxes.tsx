import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import findIndex from "lodash/findIndex";
import sortBy from "lodash/sortBy";
import React, { useState } from "react";

import Messages from "../shared/components/submit-messages";
import Checkbox from "./Checkbox";

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
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

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
    <Box py={4}>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <FormControl component="fieldset">
          <FormLabel
            component="legend"
            className={classes.formControlLabelRoot}
          >
            <Box fontSize="caption.fontSize" color="text.secondary" mb={1}>
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
                      checked={formik.values.selectedOptions.includes(optionId)}
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
            <Messages type="success" message="Form submitted successfully" />
          ) : null}
        </FormControl>
      </form>
    </Box>
  );
};

export default Checkboxes;
