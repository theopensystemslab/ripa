import { Button, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as React from "react";

// Validation with yup needs to get predefined
interface IText {
  title: string;
  type: string;
  name: string;
  multiline?: boolean;
  label?: string;
  required?: boolean;
  placeholder?: string;
}
const Text: React.FC<IText> = ({
  title,
  label = "",
  placeholder = "",
  multiline = false,
  required = true,
  name = "",
  type = ""
}) => {
  const formik = useFormik({
    initialValues: {
      [name]: ""
    },
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2));
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1> {title}</h1>
      <div>
        <TextField
          placeholder={placeholder}
          label={label}
          multiline={multiline}
          name={name}
          type={type}
          onChange={formik.handleChange}
          rows={multiline ? 10 : 1}
          value={formik.values[name]}
          variant="outlined"
          required={required}
        />
      </div>
      <Button type="submit">Save and Continue</Button>
    </form>
  );
};

export default {
  "Short Text": (
    <Text
      title="Short Text Input"
      placeholder="placeholder"
      label="label short"
      type="text"
      name="textFieldShort"
    />
  ),
  "Long Text": (
    <Text
      title="Long Text Input"
      multiline
      type="text"
      name="textFieldLong"
      required={false}
    />
  ),
  Email: (
    <Text
      title="Email"
      label="Email Address"
      placeholder="you@example.com"
      name="email"
      type="email"
      required={false}
    />
  )
};
