import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import * as React from "react";
import { HelpCircle } from "react-feather";

import InlineSelect from "../InlineSelect";
import Question from "../Question";
import QuestionImage from "../QuestionImage";
import Response from "../Response";

interface IStatement {
  id;
  text: string;
  textEnd?: string;
  img?: string;
}
interface IResponse {
  id;
  text: string;
  img?: string;
}

interface IButtonCard {
  statement: IStatement;
  responses: IResponse[];
  dropdown?: boolean;
  moreInfo?: string;
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const ButtonCard = ({
  statement,
  responses,
  dropdown,
  moreInfo
}: IButtonCard) => {
  const [selected, setSelected] = React.useState(null);
  if (!dropdown) {
    return (
      <Box pb={4}>
        <Question gutterBottom>
          {statement.text}
          {moreInfo && (
            <>
              {" "}
              <IconButton>
                <HelpCircle />
              </IconButton>
            </>
          )}
        </Question>
        {statement.img && <QuestionImage src={statement.img} />}
        <Grid container spacing={1}>
          {responses.map((response, i) => (
            <Response
              key={i}
              response={response}
              selected={selected === i}
              responseKey={ALPHABET[i]}
              handleClick={() => setSelected(i)}
            />
          ))}
        </Grid>
      </Box>
    );
  }
  return (
    <Box>
      {statement.img && <QuestionImage src={statement.img} />}
      <Question>
        {statement.text}{" "}
        <InlineSelect
          onChange={e => setSelected(e.target.value)}
          value={selected}
        >
          {responses.map(response => (
            <MenuItem key={response.id} value={response.id}>
              {response.text}
            </MenuItem>
          ))}
        </InlineSelect>{" "}
        {statement.textEnd}
      </Question>
    </Box>
  );
};

export default {
  "Standard Question": (
    <Box bgcolor="background.paper" p={3}>
      <ButtonCard
        statement={{
          id: "s1",
          text: "The house has"
        }}
        responses={[
          {
            id: "r1",
            text: "1 storey"
          },
          {
            id: "r2",
            text: "2 or more storeys"
          }
        ]}
      />
    </Box>
  ),
  "Question with image": (
    <Box bgcolor="background.paper" p={3}>
      <ButtonCard
        statement={{
          id: "s1",
          text: "The full width of all extensions will be",
          img:
            "https://planx-infrastructure.s3.amazonaws.com/uploads/88a24749-e678-49e3-98a1-7ee8bd3bdc53_outrigger_1storey_widthmorethanhalf%20copy.svg"
        }}
        responses={[
          {
            id: "r1",
            text: "1/2 the width of the original house, or less"
          },
          {
            id: "r2",
            text: "more than 1/2 the width of the original house"
          }
        ]}
      />
    </Box>
  ),
  "Responses with Images": (
    <Box bgcolor="background.paper" p={3}>
      <ButtonCard
        statement={{
          id: "s1",
          text: "The house has"
        }}
        moreInfo="blah blah"
        responses={[
          {
            id: "r1",
            text: "1 storey",
            img:
              "https://planx-infrastructure.s3.amazonaws.com/uploads/1a72ac9b-e061-4007-b316-7eac494e621d_4.2_side-extensions_SemiD_sideextension_originalhouse_1storey.svg"
          },
          {
            id: "r2",
            text: "2 or more storeys",
            img:
              "https://planx-infrastructure.s3.amazonaws.com/uploads/ac8bd053-a4e8-42a5-90f6-59f56e9bacf5_4.2_side-extensions_SemiD_sideextension_originalhouse_2storeys.svg"
          }
        ]}
      />
    </Box>
  ),
  "Dropdown Question with image": (
    <Box bgcolor="background.paper" p={3}>
      <ButtonCard
        statement={{
          id: "s1",
          text: "The full width of all extensions will be",
          textEnd: "of the original house",
          img:
            "https://planx-infrastructure.s3.amazonaws.com/uploads/88a24749-e678-49e3-98a1-7ee8bd3bdc53_outrigger_1storey_widthmorethanhalf%20copy.svg"
        }}
        dropdown={true}
        responses={[
          {
            id: "r1",
            text: "1/2 the width or less"
          },
          {
            id: "r2",
            text: "more than 1/2 the width"
          }
        ]}
      />
    </Box>
  )
};
