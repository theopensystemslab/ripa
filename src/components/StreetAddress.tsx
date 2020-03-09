import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import * as React from "react";

interface IText {
  title: string;
  name: string;
  type: string;
  options: string[];
}

export const StreetAddress: React.FC<IText> = ({
  title,
  type,
  name,
  options
}) => {
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
      case "county":
      case "postcode":
        return el;
      default:
        break;
    }
  };
  return (
    <Container maxWidth="md">
      <Box bgcolor="background.paper" p={4} maxWidth={500}>
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="h4" gutterBottom>
            <strong>{title}</strong>
          </Typography>
          {options.map((el, index) => (
            <div key={`${el}-${index}`}>
              <Box mb={2.5}>
                <TextField
                  required={el === "street" || el === "city"}
                  onChange={formik.handleChange}
                  placeholder={el}
                  label={renderLabels(el)}
                  fullWidth
                  type={type}
                  name={`${name}-${el}`}
                />
              </Box>
            </div>
          ))}
          <Box textAlign="right">
            <Button type="submit" variant="contained" color="primary">
              Look up address
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default StreetAddress;
