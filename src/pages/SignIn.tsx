import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import * as React from "react";

import HVCenterContainer from "../components/HVCenterContainer";

const SignIn = () => {
  const [email, setEmail] = React.useState("");

  const handleSubmit = () => {
    localStorage.setItem("token", email);
    window.location.href = "/";
  };

  return (
    <HVCenterContainer>
      <div>
        <h1>Sign in</h1>
        <p>
          Sign in or <a href="#">create an account</a> to get started
        </p>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email address"
            type="email"
            value={email}
            onChange={e => setEmail(e.currentTarget.value)}
          />
          <br />
          <TextField label="Password" type="password" />
          <br />
          <br />
          <Button type="submit" variant="contained" color="primary">
            Sign in
          </Button>
        </form>
        <br />
        <a href="#">Forgot your password?</a>
      </div>
    </HVCenterContainer>
  );
};

export default SignIn;
