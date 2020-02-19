import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

const useStyles = makeStyles({
  link: {
    color: "currentColor"
  }
});

const SignIn = () => {
  const classes = useStyles();
  return (
    <Box py={6} bgcolor="primary.main" color="#fff">
      <Container maxWidth="md">
        <Box maxWidth={400}>
          <Typography component="h1" variant="h3" gutterBottom>
            <strong>Sign in</strong>
          </Typography>
          <Box pb={2}>
            Sign in or{" "}
            <a href="#" className={classes.link}>
              create an account
            </a>{" "}
            to get started
          </Box>
          <FormControl fullWidth margin="normal">
            <InputLabel>Email Address</InputLabel>
            <Input name="email" type="email" fullWidth />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Password</InputLabel>
            <Input name="password" type="password" fullWidth />
          </FormControl>
          <Box py={2}>
            <Button variant="contained">Sign in</Button>
            <Box pt={2}>
              <a href="#" className={classes.link}>
                Forgot your password?
              </a>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SignIn;
