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
  fullWidth?: boolean;
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
  fullWidth = true,
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
    <Box bgcolor="background.paper" p={4}>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Box mb={3}>
          <TextField
            placeholder={placeholder}
            {...(label && { label })}
            fullWidth={fullWidth}
            multiline={multiline}
            name={name}
            type={type}
            onChange={e => {
              if (maxWords) {
                setCount(e.target.value.split(" ").length - 1);
              }
              formik.handleChange(e);
            }}
            rows={multiline ? 10 : 1}
            value={formik.values[name]}
            required={required}
            InputLabelProps={{
              shrink: true
            }}
            {...inputProps}
          />
          {maxWords && (
            <Box
              fontFamily="body2.fontFamily"
              fontSize="caption.fontSize"
              color="text.secondary"
              pt={1}
              textAlign="right"
            >
              <span>{diff >= 0 ? `${diff}` : 0} words Remaining</span>
            </Box>
          )}
          {unit && (
            <Box
              component="span"
              fontFamily="body2.fontFamily"
              fontSize="caption.fontSize"
              style={{ verticalAlign: "bottom", lineHeight: "30px" }}
              pl={1.5}
            >
              {unit}
            </Box>
          )}
        </Box>
        <Button variant="contained" color="primary" type="submit">
          Save and Continue
        </Button>
      </form>
    </Box>
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
      fullWidth
      type="text"
      name="textFieldLong"
      label="label"
      placeholder="instruction"
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
      fullWidth={false}
      placeholder="Number Input"
      name="number"
      type="number"
      unit="specified unit"
      required={false}
      inputProps={{ min: 2, max: 10 }}
    />
  )
};
