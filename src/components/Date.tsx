import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { useFormik } from "formik";
import * as React from "react";
import FocusWithin from "react-focus-within";

import Question from "./Question";

interface IDate {
  title: string;
  name: string;
  type: string;
  options: string[];
  inputProps: ILimits;
  includeSubmit?: boolean;
}
interface ILimits {
  day: { min: number; max: number };
  month: { min: number; max: number };
  year: { min: number; max: number };
}
export const Date: React.FC<IDate> = ({
  title,
  type,
  name,
  options,
  inputProps,
  includeSubmit = false
}) => {
  const formik = useFormik({
    initialValues: {},
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2));
    }
  });
  return (
    <Box py={4}>
      <FocusWithin>
        {({ isFocused, getFocusProps }) => (
          <form onSubmit={formik.handleSubmit} {...getFocusProps()}>
            <Box pb={1}>
              <Question inFocus={isFocused}>{title}</Question>
            </Box>
            <Grid container spacing={1}>
              {options.map((el, index) => (
                <Grid item key={`${el}-${index}`}>
                  <InputLabel htmlFor={name}>{el}</InputLabel>
                  <Input
                    required
                    id={name}
                    onChange={formik.handleChange}
                    type={type}
                    name={`${name}-${el}`}
                    inputProps={inputProps[el]}
                  />
                </Grid>
              ))}
            </Grid>
            {includeSubmit && (
              <Box pt={3}>
                <Button type="submit" variant="contained" color="primary">
                  Save and Continue
                </Button>
              </Box>
            )}
          </form>
        )}
      </FocusWithin>
    </Box>
  );
};

export default Date;
