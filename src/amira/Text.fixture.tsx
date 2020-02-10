import { Button, TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import * as React from "react";

interface IMinMax {
  min?: number;
  max?: number;
}
interface IText {
  title: string;
  type: string;
  name: string;
  multiline?: boolean;
  label?: string;
  required?: boolean;
  placeholder?: string;
  unit?: string;
  min?: string;
  max?: string;
  maxWords?: number;
  inputProps?: IMinMax;
}

const Text: React.FC<IText> = ({
  title,
  label = false,
  placeholder = "",
  multiline = false,
  required = false,
  name = "",
  type = "",
  unit = "",
  maxWords,
  inputProps = {
    min: 0,
    max: Infinity
  }
}) => {
  const [count, setCount] = React.useState(0);
  let diff = maxWords - count;
  const formik = useFormik({
    initialValues: {
      [name]: ""
    },
    onSubmit: values => {
      if (diff > 0) {
        console.log(JSON.stringify(values, null, 2));
      } else {
        alert("You exceeded the max number of words allowed!");
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h2" gutterBottom>
        {title}
      </Typography>
      <Box mb={3}>
        <TextField
          placeholder={placeholder}
          {...(label && { label })}
          multiline={multiline}
          name={name}
          type={type}
          onChange={e => {
            if (maxWords) {
              setCount(e.target.value.split(" ").length - 1);
            }
            formik.handleChange(e);
          }}
          fullWidth
          rows={multiline ? 10 : 1}
          value={formik.values[name]}
          required={required}
          InputLabelProps={{
            shrink: true
          }}
          {...inputProps}
        />
        {maxWords && (
          <Box fontFamily="body2.fontFamily" pt={1}>
            <span>{diff >= 0 ? `${diff}` : 0} words Remaining</span>
          </Box>
        )}
        {unit && (
          <Box fontFamily="body2.fontFamily" pt={1}>
            <strong>{unit}</strong>
          </Box>
        )}
      </Box>
      <Button variant="contained" color="primary" type="submit">
        Save and Continue
      </Button>
    </form>
  );
};

export default {
  "Short Text": (
    <Text
      title="Short Text Input"
      multiline={false}
      type="text"
      name="textFieldShort"
      label="label"
      placeholder=""
      required={false}
    />
  ),
  "Long Text": (
    <Text
      title="Long Text Input"
      multiline
      type="text"
      name="textFieldLong"
      label="label"
      placeholder=""
      required={false}
      maxWords={5}
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
  ),
  Number: (
    <Text
      title="Number"
      label="Number"
      placeholder="Number Input"
      name="number"
      type="number"
      unit="specified unit"
      required={false}
      inputProps={{ min: 2, max: 10 }}
    />
  )
};
