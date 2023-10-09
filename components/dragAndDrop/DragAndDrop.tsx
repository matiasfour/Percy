"use client";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

import styles from "./styles.module.css";

const fileTypes = ["XML"];

export default function DragAndDrop() {
  const [file, setFile] = useState(null);
  const handleChange = (file: any) => {
    setFile(file);
  };
  return (
    <div className={styles.upload_container}>
      <div className={styles.drag_area_title}>
        <span className="font-xl">
          Do you have to look for multiple people?
        </span>
        <span className="font-xs">
          upload a ccv file and generate your list of personas
        </span>
      </div>
      <FileUploader
        label="Drag your file here"
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        classes={`${styles.drop_area}`}
      >
        <p className="font-s">Drag your files here</p>
      </FileUploader>
      <span className={`font-xs ${styles.or_tag}`}>or</span>
      <label className={styles.upload_button}>
        <input type="file" accept=".xml" id="input" />
        Select your file
      </label>
    </div>
  );
}
