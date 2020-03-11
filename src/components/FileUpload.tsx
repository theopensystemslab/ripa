import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import { Close } from "@material-ui/icons";
import classNames from "classnames";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const styles = theme => ({
  box: {
    width: 220,
    height: 220,
    background: "#EAEAEA",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    cursor: "pointer"
  },
  uploaded: {
    background: "#fff",
    border: "1px solid #000",
    cursor: "auto"
  },
  discardButton: {
    borderRadius: 0
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
  accept: string[];
  maxSize: number;
  includeSubmit?: boolean;
}

export const FileUpload: React.FC<IFileUpload> = ({
  title,
  maxSize,
  accept = [],
  includeSubmit = false
}) => {
  const [files, setFiles] = useState([]);
  const [stateText, setStateText] = useState(
    "drag and drop here or choose file"
  );

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      path: ""
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  const onDrop = useCallback(
    acceptedFiles => {
      console.log(acceptedFiles);
      if (acceptedFiles.length > 0) {
        const reader = new FileReader();
        reader.onprogress = () => {
          setStateText("Loading");
        };
        reader.onload = () => {
          setStateText("click to select files");
        };
        setFiles(acceptedFiles);
      } else {
        alert(`Please choose a file with max size ${maxSize} Bytes`);
      }
    },
    [maxSize]
  );

  useEffect(() => {
    if (files.length > 0) {
      formik.setFieldValue("path", files[0].path);
    }
  }, [files, formik]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxSize
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h5" component="h1" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={3}>
        {files.map(file => {
          return (
            <Grid item>
              <div
                key={file.name}
                className={classNames(classes.box, classes.uploaded)}
              >
                <Box
                  flexGrow={1}
                  p={3}
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <Typography variant="body2">{file.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {file.type}
                  </Typography>
                </Box>
                <Box
                  px={1.5}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <IconButton
                    className={classes.discardButton}
                    edge="start"
                    onClick={e => setFiles(files.filter(f => f !== file))}
                  >
                    <Close />
                  </IconButton>
                  {file.size} bytes
                </Box>
              </div>
            </Grid>
          );
        })}
        <Grid item>
          <div
            className={classes.box}
            {...getRootProps({ isDragActive: true })}
          >
            <input {...getInputProps()} />
            <Box p={3}>
              <Typography variant="body2" gutterBottom>
                {stateText}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Max size of file is {maxSize} Bytes
              </Typography>
            </Box>
          </div>
        </Grid>
      </Grid>
      {includeSubmit && (
        <div>
          <Button type="submit" variant="contained" color="primary">
            Save and Continue
          </Button>
        </div>
      )}
    </form>
  );
};

export default FileUpload;
