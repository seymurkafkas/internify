import React, { useState } from "react";
import {
  Button,
  //Card,
  //Elevation,
  EditableText,
} from "@blueprintjs/core";
// import { ItemRenderer, MultiSelect } from "@blueprintjs/select";
import MultiSelectTag from "./MultiSelectTag";

export default function CreatePositionSection() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState([]);

  function submit() {
    console.log(requirements);
    alert("submitted");
  }

  return (
    <div className="flex justify-start flex-col mr-96 w-96">
      <div className="flex justify-between flex-col mb-4">
        <div className="flex justify-between mb-8">
          <EditableText
            onChange={(text) => setTitle(text)}
            className="w-96 text-4xl font-bold"
            value={title}
            placeholder="Edit Title"
          />
        </div>
        <div className="text-xl font-bold mb-4">Description</div>
        <EditableText
          className="mb-6"
          onChange={(text) => setDescription(text)}
          multiline={true}
          placeholder="Description"
          value={description}
        />
        <div className="text-xl font-bold mb-4">Requirements</div>
        <MultiSelectTag onReqUpdate={(req) => setRequirements(req)} />
      </div>
      <div className="flex justify-end">
        <Button onClick={() => submit()} className="bp3-outlined">
          Update
        </Button>
      </div>
    </div>
  );
}
