const TYPES = {
  Statement: 100,
  Response: 200,
  Portal: 300
};

const flow = {
  id: "default",
  name: null,
  nodes: {
    whatdoyouthink: {
      $t: TYPES.Statement,
      text: "What do you think of XYZ??",
      extraInfo: "This is info in the original"
    },
    "whatdoyouthink-yes": {
      $t: TYPES.Response,
      text: "Yes"
    },
    "whatdoyouthink-no": {
      $t: TYPES.Response,
      text: "No"
    }
    // whaddyathink: {
    //   $t: TYPES.Statement,
    //   text: "Whaddya think?"
    // }
  },
  edges: [
    [null, "whatdoyouthink"],
    ["whatdoyouthink", "whatdoyouthink-yes"],
    ["whatdoyouthink", "whatdoyouthink-no"]
    // ["whatdoyouthink", "whaddyathink"]
  ]
};

export default flow;
