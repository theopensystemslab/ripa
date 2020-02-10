import * as React from "react";

const Login = () => {
  return (
    <div>
      {/* https://dev.to/dinkydani21/how-we-use-a-popup-for-google-and-outlook-oauth-oci */}
      <a href={`${process.env.REACT_APP_BACKEND_URL}/auth/google`}>
        Login with Google
      </a>
    </div>
  );
};

export default Login;
