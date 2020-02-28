import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
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
  inputMode?: string;
  pattern?: string;
  unit?: string;
  min?: string;
  max?: string;
  maxWords?: number;
  inputProps?: IMinMax;
  includeSubmit?: boolean;
}

export const Text: React.FC<IText> = ({
  title,
  label = false,
  fullWidth = true,
  placeholder = "",
  multiline = false,
  inputMode = "",
  pattern = "",
  required = false,
  name = "",
  type = "",
  unit = "",
  maxWords,
  inputProps = {
    min: 0,
    max: Infinity
  },
  includeSubmit = false
}) => {
  const [count, setCount] = React.useState(0);
  const diff = maxWords - count;
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
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Box mb={3} maxWidth={600}>
        {label && <InputLabel>{label}</InputLabel>}
        <Input
          placeholder={placeholder}
          fullWidth={fullWidth}
          multiline={multiline}
          name={name}
          type={type}
          inputProps={{
            inputmode: inputMode,
            pattern: pattern
          }}
          onChange={e => {
            if (maxWords) {
              setCount(e.target.value.split(" ").length - 1);
            }
            formik.handleChange(e);
          }}
          rows={multiline ? 5 : 1}
          value={formik.values[name]}
          required={required}
          {...inputProps}
        />
        {maxWords && (
          <Box
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
            fontSize="caption.fontSize"
            style={{ verticalAlign: "bottom", lineHeight: "40px" }}
            pl={1.5}
          >
            {unit}
          </Box>
        )}
      </Box>
      {includeSubmit && (
        <Button variant="contained" color="primary" type="submit">
          Save and Continue
        </Button>
      )}
    </form>
  );
};

export default {
  "Short Text": (
    <Box p={4} bgcolor="background.paper">
      <Text
        title="Short Text Input"
        multiline={false}
        type="text"
        name="textFieldShort"
        label="label"
        placeholder=""
        required={false}
      />
    </Box>
  ),
  "Long Text": (
    <Box p={4} bgcolor="background.paper">
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
    </Box>
  ),
  Email: (
    <Box p={4} bgcolor="background.paper">
      <Text
        title="Email"
        label="Email Address"
        placeholder="you@example.com"
        inputMode="email"
        name="email"
        type="email"
        required={false}
      />
    </Box>
  ),
  Number: (
    <Box p={4} bgcolor="background.paper">
      <Text
        title="Number"
        label="Number"
        fullWidth={false}
        placeholder="Number Input"
        name="number"
        inputMode="numeric"
        pattern="[0-9]*"
        type="text"
        unit="specified unit"
        required={false}
        inputProps={{ min: 2, max: 10 }}
      />
    </Box>
  )
};
