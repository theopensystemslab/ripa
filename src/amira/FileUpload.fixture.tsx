import { Button } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

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
  accept: string[];
  maxSize: number;
}
const FileUpload: React.FC<IFileUpload> = ({ title, maxSize, accept = [] }) => {
  const [files, setFiles] = useState([]);
  const [stateText, setStateText] = useState("Click to select files");

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      path: ""
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  const onDrop = useCallback(acceptedFiles => {
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
  }, []);

  useEffect(() => {
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
    <form onSubmit={formik.handleSubmit}>
      <h1>{title}</h1>
      {files.map(file => {
        return (
          <div key={file.name} className={classes.box}>
            <p>
              Name: <strong>{file.name}</strong>
            </p>
            <p>Size: {file.size}</p>
            <p>Type: {file.type}</p>
            <p onClick={e => setFiles(files.filter(f => f !== file))}>x</p>
          </div>
        );
      })}
      <div className={classes.box} {...getRootProps({ isDragActive: true })}>
        <input {...getInputProps()} />
        <p>{stateText}</p>
      </div>
      <small>Max size of file is {maxSize} Bytes</small>
      <div>
        <Button type="submit">Save and Continue</Button>
      </div>
    </form>
  );
};

export default {
  default: <FileUpload maxSize={400} accept={["image/*"]} title="File upload" />
};
