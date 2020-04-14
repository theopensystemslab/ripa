import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import * as React from "react";

import ApplicationCard from "./ApplicationCard";

export default {
  "Standard application card": (
    <Box bgcolor="primary.main" p={3}>
      <Grid container spacing={2}>
        <Grid item>
          <ApplicationCard
            thumbnail="https://i.imgur.com/w2txLmM.png"
            description="30 Lake Road"
            updatedAt={3}
            status="In Progress"
          />
        </Grid>
        <Grid item>
          <ApplicationCard
            thumbnail="https://i.imgur.com/S16hH4J.png"
            description="45 River way"
            updatedAt={7}
            status="Submitted"
          />
        </Grid>
      </Grid>
    </Box>
  ),
  "List application card": (
    <Box bgcolor="primary.main" p={3}>
      <List>
        <ApplicationCard
          listView
          thumbnail="https://i.imgur.com/w2txLmM.png"
          description="30 Lake Road"
          updatedAt={3}
          status="In Progress"
        />
        <ApplicationCard
          listView
          thumbnail="https://i.imgur.com/S16hH4J.png"
          description="45 River way"
          updatedAt={7}
          status="Submitted"
        />
      </List>
    </Box>
  )
};
