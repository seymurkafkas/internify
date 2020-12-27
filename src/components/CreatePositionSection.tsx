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

class CreatePositionSection extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: "",
      description: "",
      requirements: [],
    };
    this.handleReqUpdate = this.handleReqUpdate.bind(this);
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleReqUpdate(reqs) {
    this.setState({ requirements: reqs });
  }

  handleInputUpdate(type, val) {
    const nextState = {};
    nextState[type] = val;
    this.setState(nextState);
  }

  handleSubmit() {
    console.log(this.state);
    alert("submitted");
  }

  public render() {
    return (
      <div className="flex justify-start flex-col">
        <div className="flex justify-between flex-col mb-16">
          <div className={[styles.mb32, "flex", "justify-between"].join(" ")}>
            <EditableText
              onChange={this.handleInputUpdate.bind(this, "title")}
              className={styles.titleLarge}
              value={this.state.title}
              placeholder="Title goes here"
            />
            <Button className={["bp3-outlined"].join()}>Close Position</Button>
          </div>
          <h4 className="bp3-heading">Description</h4>
          <EditableText
            onChange={this.handleInputUpdate.bind(this, "description")}
            multiline={true}
            placeholder="Description goes here"
            value={this.state.description}
          />
          <br />
          <h4 className="bp3-heading">Requirements</h4>
          <MultiSelectTag onReqUpdate={this.handleReqUpdate} />
        </div>
        <div className="flex justify-end">
          <Button onClick={this.handleSubmit} className={["bp3-outlined"].join(" ")}>
            Update
          </Button>
        </div>
      </div>
    );
  }
}

export default CreatePositionSection;
