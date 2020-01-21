import { Button } from "@material-ui/core";
import * as React from "react";
import useForm from "../lib/useForm";

interface IPayment {
  fee: number;
}
const Payment: React.FC<IPayment> = ({ fee }) => {
  return <div>The planning fee for this project is £{fee}</div>;
};

const CardDetails: React.FC = () => {
  const defaults = {
    cardholderName: "",
    month: "",
    year: "",
    securityCode: ""
  };

  const { values, handleChange, handleSubmit } = useForm(defaults, v => {
    console.log(v);
  });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Enter card details</h1>
        <input
          type="number"
          value={values.month}
          name="month"
          onChange={handleChange}
          placeholder="month"
        />
        <input
          type="number"
          value={values.year}
          name="year"
          onChange={handleChange}
          placeholder="year"
        />
        <br />
        <input
          value={values.cardholderName}
          name="cardholderName"
          onChange={handleChange}
          placeholder="name"
        />
        <br />
        <input
          value={values.securityCode}
          name="securityCode"
          onChange={handleChange}
          placeholder="security code"
        />
      </div>
      <Button type="submit">Save and Continue</Button>
    </form>
  );
};

interface IReceipt {
  fee: number;
  paidOn: Date;
  reference: string;
}
const Receipt: React.FC<IReceipt> = ({ fee, paidOn }) => (
  <div>
    <h1>Planning fee paid £{fee}</h1>
    {paidOn.toLocaleDateString()}
  </div>
);

export default {
  fee: <Payment fee={204} />,
  cardDetails: <CardDetails />,
  receipt: (
    <Receipt fee={204} paidOn={new Date(2020, 0, 1)} reference={"0271911328"} />
  )
};
