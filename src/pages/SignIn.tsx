import { Button } from "@material-ui/core";
import * as React from "react";

const SignIn = () => {
  return (
    <>
      <h1>Sign in</h1>
      <p>
        Sign in or <a href="#">create an account</a> to get started
      </p>
      <input name="email" type="email" />
      <input name="password" type="password" />
      <Button>Sign in</Button>
      <a href="#">Forgot your password?</a>
    </>
  );
};

export default SignIn;
