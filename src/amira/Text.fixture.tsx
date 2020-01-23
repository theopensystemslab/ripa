import { Button, TextField } from "@material-ui/core";
import * as React from "react";

import useForm from "../lib/useForm";

interface IText {
  title: string;
  text?: string;
  long?: boolean;
}
const Text: React.FC<IText> = ({ title, text = "", long = false }) => {
  const { values, handleChange, handleSubmit } = useForm({ text }, v => {
    console.log({ text: v.text });
  });

  return (
    <form onSubmit={handleSubmit}>
      <h1>{title}</h1>
      <div>
        <TextField
          label="Instruction"
          multiline={long}
          name="text"
          onChange={handleChange}
          rows={long ? 8 : 1}
          value={values.text}
          variant="outlined"
          required
        />
      </div>
      <Button type="submit">Save and Continue</Button>
    </form>
  );
};

export default {
  shortText: <Text title="Short Text Input" text="blah blah blah" />,
  longText: <Text title="Long Text Input" long />
};
