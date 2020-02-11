import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

const styles = theme => ({
  box: {
    width: 200,
    height: 200,
    background: "#EAEAEA",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  button: {
    textDecoration: "underline",
    display: "inline",
    fontFamily: "inherit",
    border: 0,
    paddingLeft: 0,
    background: "none",
    cursor: "pointer",
    textAlign: "left"
  }
});
const useStyles = makeStyles(styles as any) as any;

interface IFileUpload {
  title: string;
}
const FileUpload: React.FC<IFileUpload> = ({ title }) => {
  const [files, setFiles] = React.useState([]);
  const classes = useStyles();

  const handleDrop = e => {
    e.preventDefault();
    let fileName;
    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach(file => {
        if (file.kind === "file") {
          fileName = file.getAsFile().name;
        }
      });
    } else {
      [...e.dataTransfer.files].forEach(file => {
        fileName = file.name;
      });
    }

    if (fileName) setFiles([...files, fileName]);
  };

  const handleDragOver = e => {
    e.preventDefault();
    // console.log(e);
  };

  return (
    <Box bgcolor="background.paper" p={4}>
      <Typography variant="h5" component="h1" gutterBottom>
        {title}
      </Typography>
      <div>
        {files.map(file => (
          <div key={file} className={classes.box}>
            {file}
            <p onClick={e => setFiles(files.filter(f => f !== file))}>x</p>
          </div>
        ))}
        <div
          className={classes.box}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          drag and drop here or{" "}
          <button
            className={classes.button}
            onClick={e => {
              e.preventDefault();
              alert("todo");
            }}
          >
            choose file
          </button>
        </div>
      </div>
    </Box>
  );
};

export default {
  default: <FileUpload title="File upload" />
};
