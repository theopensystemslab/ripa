import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { ArrowLeft } from "@material-ui/icons";
import * as React from "react";
import { Link } from "react-navi";

import { ButtonCard } from "../components/Cards/ButtonCard.fixture";
import Checkboxes from "../components/Checkboxes";
import Date from "../components/Date";
import FileUpload from "../components/FileUpload";
import HVCenterContainer from "../components/HVCenterContainer";
import StreetAddress from "../components/StreetAddress";
import Text from "../components/Text";
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
  const set = useStore(state => state.set);
  const node = { id, ...flow.nodes[id] };

  if (node.$t === 105) {
    const options = flow.edges
      .filter(([src]) => src === id)
      .map(([, tgt]) => ({
        id: tgt,
        ...flow.nodes[tgt]
      }))
      .reduce((acc, curr) => {
        acc[curr.id] = curr.text;
        return acc;
      }, {});

    return (
      <Checkboxes
        title={node.text}
        name={node.id}
        options={options}
        handleChange={selected => {
          set(state => {
            state.data.responsesGiven = state.data.responsesGiven || {};
            // console.log(Object.keys(state.data.responsesGiven));

            let found = false;

            state.data.responsesGiven = Object.keys(
              state.data.responsesGiven
            ).reduce((acc, curr) => {
              if (curr === node.id) found = true;

              if (!found) {
                acc[curr] = state.data.responsesGiven[curr];
              }

              return acc;
            }, {});
            state.data.responsesGiven[node.id] = selected;
          });
        }}
      />
    );
  }

  if (node.$t === 110 || node.text.toLowerCase().includes(["[text]"])) {
    return (
      <Text
        title={node.text.replace(/\[text\]/i, "").trim()}
        name={node.id}
        type="text"
        required={false}
      />
    );
  }

  if (node.$t === 150 || node.text.toLowerCase().includes(["[number]"])) {
    return (
      <Text
        title={node.text.replace(/\[number\]/i, "").trim()}
        name={node.id}
        type="number"
        required={false}
      />
    );
  }

  if (
    node.$t === 110 ||
    node.text.toLowerCase().includes(["[short text field]"])
  ) {
    return (
      <Text
        title={node.text.replace(/\[short text field\]/i, "").trim()}
        name={node.id}
        type="text"
        required={false}
      />
    );
  }

  if (node.$t === 110 || node.text.toLowerCase().includes(["[long text]"])) {
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

  if (node.text.toLowerCase().includes(["[location card]"])) return null;

  if (node.$t === 130 || node.text.toLowerCase().includes(["[address]"])) {
    return (
      <StreetAddress
        title={node.text.replace(/\[address\]/i, "").trim()}
        type="text"
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

  if (node.$t === 120 || node.text.toLowerCase().includes(["[date]"])) {
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

  if (node.$t === 100) {
    const responses = flow.edges
      .filter(([src]) => src === id)
      .map(([, tgt]) => ({
        id: tgt,
        ...flow.nodes[tgt]
      }));

    return (
      <Box py={4}>
        <ButtonCard
          statement={node}
          responses={responses}
          handleClick={responseId => {
            set(state => {
              state.data.responsesGiven = state.data.responsesGiven || {};
              // console.log(Object.keys(state.data.responsesGiven));

              let found = false;

              state.data.responsesGiven = Object.keys(
                state.data.responsesGiven
              ).reduce((acc, curr) => {
                if (curr === node.id) found = true;

                if (!found) {
                  acc[curr] = state.data.responsesGiven[curr];
                }

                return acc;
              }, {});
              state.data.responsesGiven[node.id] = [responseId];
            });
          }}
        />
      </Box>
    );
  }

  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        {JSON.stringify(node)}
      </Typography>
    </div>
  );
};

const Section = ({ id }) => {
  const flow = useStore(state => state.flow);
  const responsesGiven = useStore(state => state.data.responsesGiven || {});

  const classes = useStyles();

  let statements = [];

  const getStatements = id => {
    flow.edges
      .filter(([src]) => src === id)
      .map(([, tgt]) => tgt)
      .filter(tgt => {
        const isStatement = flow.nodes[tgt].$t === 100;

        const hasResponses =
          flow.edges.filter(([src]) => src === tgt).length > 0;

        if ((isStatement && hasResponses) || !isStatement) {
          statements = statements.concat(tgt);
        }

        if (Object.keys(responsesGiven).includes(tgt)) {
          responsesGiven[tgt].forEach(t => getStatements(t));
        }
      });
  };

  getStatements(id);

  // Object.values(responsesGiven).map((responseIds: string[]) => {
  //   responseIds.forEach((rId) => {
  //     getStatements(rId)
  //     roots = roots.concat();
  //   });
  // });

  const roots = Array.from(new Set(statements));

  return (
    <HVCenterContainer light disableScroll>
      <Link
        href={`${localStorage.getItem("team")}/start`}
        className={classes.backLink}
      >
        <ArrowLeft /> Back
      </Link>
      <Typography variant="h3" component="h1" gutterBottom>
        <strong>{flow.nodes[id].text}</strong>
      </Typography>

      {roots.map(i => (
        <Card key={i} id={i} />
      ))}
    </HVCenterContainer>
  );
};

export default Section;
