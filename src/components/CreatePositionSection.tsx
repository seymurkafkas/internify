import React from "react";
import {
  Button,
  //Card,
  //Elevation,
  EditableText,
} from "@blueprintjs/core";
// import { ItemRenderer, MultiSelect } from "@blueprintjs/select";
import MultiSelectTag from "./MultiSelectTag";
import styles from "./styles.module.css";

class CreatePositionSection extends React.Component {
  public state = {
    title: "Title goes here",
    description: "Description goes here",
    requirements: [],
  };
  public render() {
    return (
      <div className="flex justify-between flex-col">
        <div className="flex justify-between flex-col">
          <div className={[styles.mb32, "flex", "justify-between"].join(" ")}>
            <EditableText className={styles.titleLarge} defaultValue={this.state.title} />
            <Button className={["bp3-outlined"].join()}>Close Position</Button>
          </div>
          <h4 className="bp3-heading">Description</h4>
          <EditableText multiline={true} defaultValue={this.state.description} />
          <br />
          <h4 className="bp3-heading">Requirements</h4>
          <p>{this.state.requirements}</p>
          <MultiSelectTag />
        </div>
        <div className="flex justify-between">
          <Button className={["bp3-outlined", "bp3-fill", styles.btnNoOutline].join()}>Update</Button>
          <Button className={["bp3-outlined", "bp3-fill", styles.btnNoOutline].join()}>Cancel</Button>
        </div>
      </div>
    );
  }
}

export default CreatePositionSection;
