import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import * as React from "react";

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
    <Box bgcolor="background.paper" p={4}>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <Grid container spacing={1}>
          {options.map((el, index) => (
            <Grid item key={`${el}-${index}`}>
              <InputLabel>{el}</InputLabel>
              <Input
                required
                onChange={formik.handleChange}
                type={type}
                name={`${name}-${el}`}
                inputProps={inputProps[el]}
              ></Input>
            </Grid>
          ))}
        </Grid>
        <Box pt={3}>
          <Button type="submit" variant="contained" color="primary">
            Save and Continue
          </Button>
        </Box>
      </form>
    </Box>
  );
};
export default {
  default: (
    <Date
      title="Date"
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
