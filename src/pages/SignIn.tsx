import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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
      <TextField label="Email" type="email" />
      <TextField label="Password" type="password" />
      <Button type="submit">Sign in</Button>
      <a href="#">Forgot your password?</a>
    </form>
  );
};

export default SignIn;
