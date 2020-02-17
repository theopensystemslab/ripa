import * as marked from "marked";
import * as React from "react";

const MoreInfo = ({ content }) => {
  const html = { __html: marked(content, { sanitize: true }) };
  return (
    <>
      <div dangerouslySetInnerHTML={html} />
    </>
  );
};

export default MoreInfo;
