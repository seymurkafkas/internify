import * as React from "react";
import {
  Button, //H5,
  InputGroup,
  TextArea,
  // Switch,
} from "@blueprintjs/core";
import styles from "../components/styles.module.css";

class CompanyDetailContainer extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.state = {
      title: "",
      sector: "",
      numOfEmployees: 12,
      description: "",
      address: "",
    };
  }

  handleClick() {
    alert("updated" + JSON.stringify(this.state));
  }
  inputChange(type, e) {
    const tmpState = {};
    if (!e.target) {
      tmpState[type] = e;
      this.setState(tmpState);
    } else {
      tmpState[type] = e.target.value;
      this.setState(tmpState);
    }
  }

  render() {
    return (
      <div className={styles.CompanyDetailContainer}>
        <h2 className={[styles.titleLarge, styles.mb64].join(" ")}>Company Detail</h2>
        <div className="flex flex-row">
          <p className={styles.label}>
            <b>Title</b>
          </p>
          <InputGroup
            placeholder={"Type to edit"}
            onChange={this.inputChange.bind(this, "title")}
            defaultValue={this.state.title}
            className={["bp3-fill", styles.inputUnderline].join(" ")}
          />
        </div>
        <div className="flex flex-row">
          <p className={styles.label}>
            <b>Sector</b>
          </p>
          <InputGroup
            placeholder={"Type to edit"}
            onChange={this.inputChange.bind(this, "sector")}
            defaultValue={this.state.sector}
            className={["bp3-fill", styles.inputUnderline].join(" ")}
          />
        </div>
        <div className="flex flex-row">
          <p className={styles.label}>
            <b>Number of employees</b>
          </p>
          <InputGroup
            placeholder={"Type to edit"}
            onChange={this.inputChange.bind(this, "numOfEmpolyees")}
            defaultValue={this.state.numOfEmployees}
            className={["bp3-fill", styles.inputUnderline].join(" ")}
          />
        </div>
        <div className="flex flex-row">
          <p className={styles.label}>
            <b>Description</b>
          </p>
          <TextArea
            placeholder={"Type to edit"}
            onChange={this.inputChange.bind(this, "description")}
            defaultValue={this.state.description}
            className={["bp3-fill", styles.inputUnderline].join(" ")}
          />
        </div>
        <div className="flex flex-row">
          <p className={styles.label}>
            <b>Address</b>
          </p>
          <TextArea
            placeholder={"Type to edit"}
            onChange={this.inputChange.bind(this, "address")}
            defaultValue={this.state.address}
            className={["bp3-fill", styles.inputUnderline].join(" ")}
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={this.handleClick} className={["bp3-outlined", "bp3-large"].join(" ")}>
            Update
          </Button>
        </div>
      </div>
    );
  }
}

export default CompanyDetailContainer;
