import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import * as React from "react";
import { HelpCircle } from "react-feather";

import Question from "../Question";
import QuestionImage from "../QuestionImage";
import Response from "../Response";

interface IStatement {
  id;
  text: string;
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
  moreInfo?: string;
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const ButtonCard = ({ statement, responses, moreInfo }: IButtonCard) => {
  const [selected, setSelected] = React.useState(null);
  return (
    <Box>
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
      {statement.img && <QuestionImage src={statement.img}></QuestionImage>}
      <Grid container spacing={1}>
        {responses.map((response, i) => (
          <Response
            response={response}
            selected={selected === i}
            responseKey={ALPHABET[i]}
            handleClick={() => setSelected(i)}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default {
  "Standard Question": (
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
  ),
  "Question with image": (
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
  ),
  "Responses with Images": (
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
  )
};