import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

import HVCenterContainer from "../components/HVCenterContainer";
import { useStore } from "../lib/store";

const useStyles = makeStyles({
  link: {
    color: "currentColor"
  }
});
interface ISignIn {
  fullPage?: boolean;
  topSpacing?: number;
  title?: string;
}
const SignIn: React.FC<ISignIn> = ({ fullPage, topSpacing, title }) => {
  const [email, setEmail] = React.useState("");
  const set = useStore(state => state.set);

  const handleSubmit = e => {
    e.preventDefault();
    set(state => {
      state.data.currentUser = email;
    });
    window.location.href = `/${localStorage.getItem("team")}`;
  };
  const signInComponent = () => {
    return (
      <Box
        py={topSpacing}
        maxWidth={400}
        mx="auto"
        color="primary.contrastText"
      >
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
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Email Address</InputLabel>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.currentTarget.value)}
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Password</InputLabel>
            <Input type="password" fullWidth />
          </FormControl>
          <Box py={2}>
            <Button variant="contained" type="submit">
              Sign in
            </Button>
            <Box pt={2}>
              <a href="#" className={classes.link}>
                Forgot your password?
              </a>
            </Box>
          </Box>
        </form>
      </Box>
    );
  };
  const classes = useStyles();
  return (
    <>
      {fullPage ? (
        <HVCenterContainer verticalCenter>
          {signInComponent()}
        </HVCenterContainer>
      ) : (
        signInComponent()
      )}
    </>
  );
};

export default SignIn;
