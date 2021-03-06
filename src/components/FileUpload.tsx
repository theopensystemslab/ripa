import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useFormik } from "formik";
import React from "react";
import { useDropzone } from "react-dropzone";
import FocusWithin from "react-focus-within";

import Messages from "../shared/components/submit-messages";
import Question from "./Question";

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
  const [files, setFiles] = React.useState([]);
  const [stateText, setStateText] = React.useState("Click to select files");

  const classes = useStyles();
  const [errorMessageVisible, setErrorMessageVisible] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      path: ""
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  const onDrop = React.useCallback(
    acceptedFiles => {
      setErrorMessageVisible(false);
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
        setErrorMessageVisible(true);
      }
    },
    [maxSize]
  );

  React.useEffect(() => {
    if (files.length > 0) {
      formik.setFieldValue("path", files[0].path);
    }
  }, [files]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxSize
  });
  return (
    <Box py={4}>
      <FocusWithin>
        {({ isFocused, getFocusProps }) => (
          <form onSubmit={formik.handleSubmit} {...getFocusProps()}>
            <Box pb={1}>
              <Question inFocus={isFocused}>{title}</Question>
            </Box>
            {files.map(file => {
              return (
                <div key={file.name} className={classes.box}>
                  <p>
                    Name: <strong>{file.name}</strong>
                  </p>
                  <p>Size: {file.size}</p>
                  <p>Type: {file.type}</p>
                  <p onClick={e => setFiles(files.filter(f => f !== file))}>
                    x
                  </p>
                </div>
              );
            })}
            <div className={classes.box} {...getRootProps()}>
              <input data-testid="fileupload" {...getInputProps()} />
              <p>{stateText}</p>
            </div>
            <small>Max size of file is {maxSize} Bytes</small>
            <div>
              {errorMessageVisible && formik.touched ? (
                <Messages
                  type="error"
                  message={`Please choose a file with max size ${maxSize} Bytes`}
                />
              ) : null}
            </div>
            {includeSubmit && (
              <div>
                <Button type="submit" variant="contained" color="primary">
                  Save and Continue
                </Button>
              </div>
            )}
          </form>
        )}
      </FocusWithin>
    </Box>
  );
};

export default FileUpload;
