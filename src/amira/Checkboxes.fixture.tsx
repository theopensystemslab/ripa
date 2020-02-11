import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { useFormik } from "formik";
import * as React from "react";

interface ICheckboxes {
  title: string;
  options: object;
  name: string;
  required?: boolean;
}

const useStyles = makeStyles({
  formControlLabelRoot: {
    marginLeft: 0,
    marginBottom: 12
  },
  formControlLabel: {
    fontWeight: 400,
    fontSize: 12
  },
  checkBoxRoot: {
    borderRadius: 0,
    padding: 0,
    marginRight: 12,
    height: 32,
    width: 32,
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
      height: 18,
      width: 10,
      borderBottom: "2.5px solid #000",
      borderRight: "2.5px solid #000",
      left: "50%",
      top: "42%",
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
