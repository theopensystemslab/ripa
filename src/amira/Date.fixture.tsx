import { Button, TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import * as React from "react";

import theme from "./defaultTheme";

interface IText {
  title: string;
  name: string;
  type: string;
  options: string[];
  inputProps: ILimits;
}
interface ILimits {
  day: { min: number; max: number };
  month: { min: number; max: number };
  year: { min: number; max: number };
}
const Date: React.FC<IText> = ({ title, type, name, options, inputProps }) => {
  const formik = useFormik({
    initialValues: {},
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2));
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h2" component="div" gutterBottom>
          {title}
        </Typography>
        <Grid container spacing={1}>
          {options.map((el, index) => (
            <Grid item key={`${el}-${index}`}>
              <TextField
                label={el}
                required
                onChange={formik.handleChange}
                type={type}
                name={`${name}-${el}`}
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={inputProps[el]}
              ></TextField>
            </Grid>
          ))}
        </Grid>
        <Box pt={3}>
          <Button type="submit" variant="contained" color="primary">
            Save and Continue
          </Button>
        </Box>
      </form>
    </ThemeProvider>
  );
};
export default {
  default: (
    <Date
      title="Long Text Input"
      type="number"
      name="date"
      options={["day", "month", "year"]}
      inputProps={{
        day: {
          min: 1,
          max: 31
        },
        month: {
          min: 1,
          max: 12
        },
        year: {
          min: 1920,
          max: 2020
        }
      }}
    />
  )
};
