import { Button, TextField } from "@material-ui/core";
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
    <form onSubmit={formik.handleSubmit}>
      <h1>{title}</h1>
      <div style={{ display: "flex" }}>
        {options.map((el, index) => (
          <div key={`${el}-${index}`}>
            <p>{el}</p>
            <TextField
              required
              onChange={formik.handleChange}
              placeholder={el.toUpperCase()}
              type={type}
              name={`${name}-${el}`}
              inputProps={inputProps[el]}
            ></TextField>
          </div>
        ))}
      </div>
      <Button type="submit">Save and Continue</Button>
    </form>
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
