import { Button } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import * as React from "react";
import useForm from "../lib/useForm";

interface ICheckboxes {
  title: string;
  options: object;
}

const Checkboxes: React.FC<ICheckboxes> = ({
  title = "Title",
  options = {}
}) => {
  const defaults = Object.keys(options).reduce((acc, curr) => {
    acc[curr] = "false";
    return acc;
  }, {});

  console.log(defaults);

  const { values, handleChange, handleSubmit } = useForm(defaults, v => {
    const selections = Object.entries(v).reduce((acc, [id, val]) => {
      if (val === "true") acc.push(id);
      return acc;
    }, []);
    console.log({ selections });
  });

  return (
    <form onSubmit={handleSubmit}>
      <h1>{title}</h1>
      <FormControl component="fieldset">
        <FormLabel component="legend">Select all that apply</FormLabel>
        <FormGroup>
          {Object.entries(options).map(([id, label]) => (
            <FormControlLabel
              key={id}
              control={
                <Checkbox
                  onChange={handleChange}
                  checked={JSON.parse(values[id])}
                  value={!JSON.parse(values[id])}
                  name={id}
                />
              }
              label={label}
            />
          ))}
        </FormGroup>
        <Button type="submit">Save and Continue</Button>
      </FormControl>
    </form>
  );
};

export default {
  default: (
    <Checkboxes
      title="What types of street trees will you plant?"
      options={{
        oak: "English Oak",
        plane: "London Plane Tree",
        redwood: "Redwood",
        other: "Other species"
      }}
    />
  )
};
