import { Button } from "@material-ui/core";
import * as React from "react";

const SignIn = () => {
  const handleSubmit = () => {
    localStorage.setItem("token", "1");
    window.location.href = "/";
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign in</h1>
      <p>
        Sign in or <a href="#">create an account</a> to get started
      </p>
      <input name="email" type="email" />
      <input name="password" type="password" />
      <Button type="submit">Sign in</Button>
      <a href="#">Forgot your password?</a>
    </form>
  );
};

export default SignIn;
