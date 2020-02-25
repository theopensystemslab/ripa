import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { ArrowLeft } from "@material-ui/icons";
import * as React from "react";
import { Link } from "react-navi";

import { Date } from "../amira/Date.fixture";
import { FileUpload } from "../amira/FileUpload.fixture";
import { StreetAddress } from "../amira/StreetAddress.fixture";
import { Text } from "../amira/Text.fixture";
import HVCenterContainer from "../components/HVCenterContainer";
import { useStore } from "../lib/store";

const useStyles = makeStyles({
  backLink: {
    color: "currentColor",
    textDecoration: "none",
    opacity: 0.5,
    display: "inline-flex",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 32,
    fontSize: 16,
    marginLeft: -8,
    "&:hover": {
      opacity: 1
    }
  }
});

const Card = ({ id }) => {
  const flow = useStore(state => state.flow);
  const node = flow.nodes[id];

  if (node.text.toLowerCase().includes(["[location card]"])) return null;

  if (node.text.toLowerCase().includes(["[text]"])) {
    return (
      <Text
        title={node.text.replace(/\[text\]/i, "").trim()}
        name={node.id}
        multiline
        type="text"
        required={false}
      />
    );
  }

  if (node.text.toLowerCase().includes(["[number]"])) {
    return (
      <Text
        title={node.text.replace(/\[number\]/i, "").trim()}
        name={node.id}
        type="number"
        required={false}
      />
    );
  }

  if (node.text.toLowerCase().includes(["[short text field]"])) {
    return (
      <Text
        title={node.text.replace(/\[short text field\]/i, "").trim()}
        name={node.id}
        type="text"
        required={false}
      />
    );
  }

  if (node.text.toLowerCase().includes(["[long text]"])) {
    return (
      <Text
        title={node.text.replace(/\[long text\]/i, "").trim()}
        name={node.id}
        type="text"
        multiline
        required={false}
      />
    );
  }

  if (node.text.toLowerCase().includes(["[address]"])) {
    return (
      <StreetAddress
        title={node.text.replace(/\[address\]/i, "").trim()}
        type="text"
        name="address"
        options={["building", "street", "city", "county", "postcode"]}
      />
    );
  }

  if (node.text.toLowerCase().includes(["[file upload]"])) {
    return (
      <FileUpload
        maxSize={40000}
        accept={["image/*"]}
        title={node.text.replace(/\[file upload\]/i, "").trim()}
      />
    );
  }
  if (node.text.toLowerCase().includes(["[upload]"])) {
    return (
      <FileUpload
        maxSize={40000}
        accept={["image/*"]}
        title={node.text.replace(/\[upload\]/i, "").trim()}
      />
    );
  }

  if (node.text.toLowerCase().includes(["[date]"])) {
    return (
      <Date
        title={node.text.replace(/\[date\]/i, "").trim()}
        name={node.id}
        type="number"
        options={["day", "month", "year"]}
        inputProps={{
          day: {
            min: 1,
            max: 31
          },
          month: {
            min: 1,
            max: 12
          },
          year: {
            min: 1920,
            max: 2020
          }
        }}
      />
    );
  }

  if (node.text.toLowerCase().includes(["[email address]"])) {
    return (
      <Text
        title={node.text.replace(/\[email address\]/i, "").trim()}
        name={node.id}
        placeholder="you@example.com"
        type="email"
        required={false}
      />
    );
  }

  if (node.text.toLowerCase().includes(["[short text]"])) {
    return (
      <Text
        title={node.text.replace(/\[short text\]/i, "").trim()}
        name={node.id}
        type="text"
        required={false}
      />
    );
  }

  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        {node.text}
      </Typography>
      {flow.edges
        .filter(([src]) => src === id)
        .map(([, tgt]) => tgt)
        .map(i => (
          <Card key={i} id={i} />
        ))}
    </div>
  );
};

const Section = ({ id }) => {
  const flow = useStore(state => state.flow);
  const classes = useStyles();

  // console.log(alg.preorder(graph, id).map(i => flow.nodes[i].text));

  return (
    <HVCenterContainer light>
      <Link href="/start" className={classes.backLink}>
        <ArrowLeft /> Back
      </Link>
      <Typography variant="h3" component="h1" gutterBottom>
        <strong>{flow.nodes[id].text}</strong>
      </Typography>
      {flow.edges
        .filter(([src]) => src === id)
        .map(([, tgt]) => tgt)
        .map(i => (
          <Card key={i} id={i} />
        ))}
    </HVCenterContainer>
  );
};

export default Section;
