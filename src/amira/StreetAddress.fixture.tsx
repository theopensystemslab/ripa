import { Button, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as React from "react";

interface IText {
  title: string;
  name: string;
  type: string;
  options: string[];
}

const StreetAddress: React.FC<IText> = ({ title, type, name, options }) => {
  const formik = useFormik({
    initialValues: {},
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2));
    }
  });
  const renderLabels = el => {
    switch (el) {
      case "building":
        return "Building and street";
      case "street":
        return "";
      case "city":
        return "Town or City";
      case "country":
      case "postcode":
        return el;
      default:
        break;
    }
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <h1>{title}</h1>
      {options.map((el, index) => (
        <div key={`${el}-${index}`}>
          <label style={{ display: "block" }}>{renderLabels(el)}</label>
          <TextField
            required={el === "street" || el === "city"}
            onChange={formik.handleChange}
            placeholder={el.toUpperCase()}
            type={type}
            name={`${name}-${el}`}
          ></TextField>
        </div>
      ))}
      <Button type="submit">Save and Continue</Button>
    </form>
  );
};
export default {
  default: (
    <StreetAddress
      title="Street Address"
      type="text"
      name="address"
      options={["building", "street", "city", "country", "postcode"]}
    />
  )
};
