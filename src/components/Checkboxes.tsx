import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import * as React from "react";

import Checkbox from "./Checkbox";

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
  name = "",
  required = false
}) => {
  const formik = useFormik({
    initialValues: {
      [name]: "",
      selectedOptions: ["redwood"]
    },
    onSubmit: values => {
      if (required && values.selectedOptions.length === 0) {
        alert("Please choose at least one option");
      } else {
        console.log(JSON.stringify(values, null, 2));
      }
    }
  });
  const classes = useStyles();
  return (
    <Box p={4} bgcolor="background.paper">
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

          <Button type="submit" variant="contained" color="primary">
            Save and Continue
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default Checkboxes;
