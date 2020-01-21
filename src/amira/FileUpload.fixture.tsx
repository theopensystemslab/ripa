import makeStyles from "@material-ui/core/styles/makeStyles";
import * as React from "react";

const styles = theme => ({
  box: {
    width: 200,
    height: 200,
    background: "#EAEAEA",
    padding: 10
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
    <div>
      <h1>{title}</h1>
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
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              alert("todo");
            }}
          >
            choose file
          </a>
        </div>
      </div>
    </div>
  );
};

export default {
  default: <FileUpload title="File upload" />
};
