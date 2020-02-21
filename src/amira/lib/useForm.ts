import set from "lodash/set";
import { useState } from "react";

export default (initialState: object, callback: Function) => {
  const [values, setValues] = useState(initialState);

  const handleSubmit = (event?: any) => {
    if (event) event.preventDefault();
    // console.log({ values });
    callback(values);
  };

  const handleChange = (event?: any) => {
    event.persist();

    setValues(values =>
      set({ ...values }, event.target.name, event.target.value)
    );
  };

  const setFieldValue = (field: string, value: any) => {
    setValues(values => set({ ...values }, field, value));
  };

  return {
    setFieldValue,
    handleChange,
    handleSubmit,
    setValues,
    values: values as any
  };
};
