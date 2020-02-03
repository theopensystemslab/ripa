import { Button } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { useFormik } from "formik";
import * as React from "react";

interface ICheckboxes {
  title: string;
  options: object;
  name: string;
  required?: boolean;
}

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
  return (
    <form onSubmit={formik.handleSubmit}>
      <h1>{title}</h1>
      <FormControl component="fieldset">
        <FormLabel component="legend">Select all that apply</FormLabel>
        <FormGroup>
          {Object.entries(options).map(([id, label]) => (
            <FormControlLabel
              key={id}
              control={
                <Checkbox
                  checked={formik.values.selectedOptions.includes(id)}
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
        <Button type="submit">Save and Continue</Button>
      </FormControl>
    </form>
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
