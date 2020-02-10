const log = (input, type = "info") =>
  process.env.REACT_APP_DEBUG && console[type](input);

export default log;
