import * as React from "react";

const MyApplication = ({ sections }) => {
  return (
    <>
      <h1>My application</h1>
      <p>Please complete all sections</p>
      <p>12% complete</p>
      <ul>
        {Object.entries(sections).map(([name, status]) => (
          <li key={name}>
            {name} {status}
          </li>
        ))}
      </ul>
    </>
  );
};

export default MyApplication;
