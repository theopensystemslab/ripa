import * as React from "react";

const PropertyInformation = ({ streetAddress, information, constraints }) => {
  return (
    <>
      <h1>{streetAddress}</h1>
      <img src="https://i.imgur.com/S16hH4J.png" />
      <p>This is information we have about this property</p>
      <ul>
        {Object.entries(information).map(([key, value]) => (
          <li key={key}>
            <b>{key}</b> {value}
          </li>
        ))}
      </ul>
      <p>These are constraints that apply to this property</p>
      <ul>
        {constraints.map(constraint => (
          <li key={constraint}>{constraint}</li>
        ))}
      </ul>
      <a href="#">Report an inaccuracy</a>
    </>
  );
};

export default PropertyInformation;
