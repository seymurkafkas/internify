import React, { useState } from "react";
import {
  Button,
  //Card,
  //Elevation,
  EditableText,
} from "@blueprintjs/core";
// import { ItemRenderer, MultiSelect } from "@blueprintjs/select";
import MultiSelectTag from "./MultiSelectTag";
import styles from "./styles.module.css";

export default function CreatePositionSection() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState([]);

  function submit() {
    console.log(requirements);
    alert("submitted");
  }

  return (
    <div className="flex justify-start flex-col">
      <div className="flex justify-between flex-col mb-16">
        <div className={[styles.mb32, "flex", "justify-between"].join(" ")}>
          <EditableText
            onChange={(text) => setTitle(text)}
            className={styles.titleLarge}
            value={title}
            placeholder="Title goes here"
          />
        </div>
        <h4 className="bp3-heading">Description</h4>
        <EditableText
          onChange={(text) => setDescription(text)}
          multiline={true}
          placeholder="Description goes here"
          value={description}
        />
        <br />
        <h4 className="bp3-heading">Requirements</h4>
        <MultiSelectTag onReqUpdate={(req) => setRequirements(req)} />
      </div>
      <div className="flex justify-end">
        <Button onClick={() => submit()} className={["bp3-outlined"].join(" ")}>
          Create
        </Button>
      </div>
    </div>
  );
}
