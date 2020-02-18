import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

const SignIn = () => {
  return (
    <Box p={4}>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <p>
        Sign in or <a href="#">create an account</a> to get started
      </p>
      <FormControl fullWidth margin="normal">
        <InputLabel>Email Address</InputLabel>
        <Input name="email" type="email" fullWidth />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Password</InputLabel>
        <Input name="password" type="password" fullWidth />
      </FormControl>
      <Button variant="contained" color="primary">
        Sign in
      </Button>
      <Box py={1} color="text.secondary">
        <a href="#">Forgot your password?</a>
      </Box>
    </Box>
  );
};

export default SignIn;
