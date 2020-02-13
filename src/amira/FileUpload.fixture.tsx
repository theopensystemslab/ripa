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
  const classes = useStyles();

  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles);
  }, []);

  useEffect(() => {
    if (files.length > 0) {
      formik.setFieldValue("path", files[0].path);
    }
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize
  });

  const formik = useFormik({
    initialValues: {
      path: ""
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
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
      <div className={classes.box} {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <small>Max size of file is {maxSize} Bytes</small>
      <div>
        <Button type="submit">Save and Continue</Button>
      </div>
    </form>
  );
};

export default {
  default: (
    <FileUpload
      maxSize={4000}
      accept={["image/jpeg", "image/png"]}
      title="File upload"
    />
  )
};
