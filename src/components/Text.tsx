import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import * as React from "react";

import Messages from "../shared/components/submit-messages";

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
  includeSubmit?: boolean;
}

export const Text: React.FC<IText> = ({
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
  },
  includeSubmit = false
}) => {
  const [errorMessageVisible, setErrorMessageVisible] = React.useState(false);
  const [successMessageVisible, setSuccessMessageVisible] = React.useState(
    false
  );
  const [count, setCount] = React.useState(0);
  const diff = maxWords - count;
  const formik = useFormik({
    initialValues: {
      [name]: ""
    },
    onSubmit: values => {
      if (diff > 0) {
        console.log(JSON.stringify(values, null, 2));
        setSuccessMessageVisible(true);
        setErrorMessageVisible(false);
      } else {
        setSuccessMessageVisible(false);
        setErrorMessageVisible(true);
      }
    }
  });

  return (
    <Box pb={4} maxWidth={480}>
      <form data-testid="textForm" onSubmit={formik.handleSubmit}>
        <Typography variant="h4" gutterBottom>
          <strong>{title}</strong>
        </Typography>
        <Box mb={3}>
          {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
          <Input
            placeholder={placeholder}
            fullWidth={fullWidth}
            multiline={multiline}
            name={name}
            id={name}
            type={type}
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
              <span>
                {" "}
                {diff >= 0
                  ? `${diff} words Remaining`
                  : `0 words Remaining`}{" "}
              </span>
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
          <div>
            {errorMessageVisible && formik.touched ? (
              <Messages
                type="error"
                message="You exceeded the max number of words allowed!"
              />
            ) : null}
          </div>
        </Box>
        {includeSubmit && (
          <Button variant="contained" color="primary" type="submit">
            Save and Continue
          </Button>
        )}
        <div>
          {successMessageVisible ? (
            <Messages type="success" message="Form submitted successfully" />
          ) : null}
        </div>
      </form>
    </Box>
  );
};

export default Text;
