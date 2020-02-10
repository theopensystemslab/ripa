import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { useFormik } from "formik";
import * as React from "react";

// styles from planx theme
import theme from "./defaultTheme";

interface ICheckboxes {
  title: string;
  options: object;
  name: string;
  required?: boolean;
}

const useStyles = makeStyles({
  formGroupRoot: {},
  formControlLabelRoot: {
    marginLeft: 0,
    marginBottom: 12
  },
  checkBoxRoot: {
    borderRadius: 0,
    padding: 0,
    marginRight: 12,
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  icon: {
    height: 32,
    width: 32,
    border: "1px solid #000",
    display: "block",
    position: "relative"
  },
  checkedIcon: {
    "&::before": {
      content: "''",
      display: "block",
      position: "absolute",
      height: 15,
      width: 7,
      borderBottom: "3px solid #000",
      borderRight: "3px solid #000",
      left: "50%",
      top: "45%",
      transform: "translate(-50%, -50%) rotate(45deg)"
    }
  }
});

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
    <ThemeProvider theme={theme}>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h2" gutterBottom>
          {title}
        </Typography>
        <FormControl component="fieldset">
          <FormLabel
            component="legend"
            className={classes.formControlLabelRoot}
          >
            Select all that apply
          </FormLabel>
          <FormGroup>
            {Object.entries(options).map(([id, label]) => (
              <FormControlLabel
                className={classes.formControlLabelRoot}
                key={id}
                control={
                  <Checkbox
                    className={classes.checkBoxRoot}
                    checked={formik.values.selectedOptions.includes(id)}
                    icon={<span className={classes.icon} />}
                    checkedIcon={
                      <span
                        className={classNames(
                          classes.icon,
                          classes.checkedIcon
                        )}
                      />
                    }
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
                          formik.values.selectedOptions.filter(el => el !== id)
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

          <Button type="submit" variant="contained" color="primary">
            Save and Continue
          </Button>
        </FormControl>
      </form>
    </ThemeProvider>
  );
};

export default {
  default: (
    <Checkboxes
      title="What types of street trees will you plant?"
      name="default_boxes"
      required
      options={{
        oak: "English Oak",
        plane: "London Plane Tree",
        redwood: "Redwood",
        other: "Other species"
      }}
    />
  )
};
