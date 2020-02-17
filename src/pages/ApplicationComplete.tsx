import * as React from "react";

const ApplicationComplete = ({ reference }) => {
  return (
    <>
      <div>
        <h1>Application complete</h1>
        <p>Reference number</p>
        <p>{reference}</p>
      </div>
      <h2>What happens next?</h2>
      <p>
        Your application will be checked. If there are any issues, or further
        information is required, a case officer will contact you.
      </p>
      <p>
        Once the application has been checked, a planning officer will contact
        you to arrange a site visit.{" "}
        <a href="#">Find out more about the planning process</a>
      </p>
    </>
  );
};

export default ApplicationComplete;
