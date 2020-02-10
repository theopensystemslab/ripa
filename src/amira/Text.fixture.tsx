import { Button, TextField } from "@material-ui/core";
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
      <h1>{title}</h1>
      <div>
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
          rows={multiline ? 10 : 1}
          value={formik.values[name]}
          variant="outlined"
          required={required}
          {...inputProps}
        />
        {maxWords && (
          <div>
            <span>{diff >= 0 ? `${diff}` : 0} words Remaining</span>
          </div>
        )}
        {unit && (
          <div>
            <strong>{unit}</strong>
          </div>
        )}
      </div>
      <Button type="submit">Save and Continue</Button>
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
      label=""
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
      label=""
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
