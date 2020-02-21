import Button from "@material-ui/core/Button";
import * as React from "react";

import HVCenterContainer from "../components/HVCenterContainer";

const PropertyInformation = ({
  streetAddress,
  information = {},
  constraints = [],
  map = "https://i.imgur.com/S16hH4J.png",
  handleContinue = undefined
}) => {
  return (
    <HVCenterContainer light>
      <div>
        <h1>{streetAddress}</h1>
        <img src={map} />
        {information && Object.keys(information).length > 0 && (
          <>
            <p>This is information we have about this property</p>
            <ul>
              {Object.entries(information).map(([key, value]) => (
                <li key={key}>
                  <b>{key}</b> {value}
                </li>
              ))}
            </ul>
          </>
        )}
        {constraints && Array.isArray(constraints) && constraints.length > 0 && (
          <>
            <p>These are constraints that apply to this property</p>
            <ul>
              {constraints.map(constraint => (
                <li key={constraint}>{constraint}</li>
              ))}
            </ul>
          </>
        )}
        <a href="#">Report an inaccuracy</a>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </HVCenterContainer>
  );
};

export default PropertyInformation;
