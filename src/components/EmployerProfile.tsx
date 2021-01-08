import React, { useState } from "react";
import {
  Button, //H5,
  InputGroup,
  TextArea,
  // Switch,
} from "@blueprintjs/core";
import styles from "../components/styles.module.css";

function EmployerProfile() {
  const [state, setState] = useState({
    title: "",
    address: "",
    numOfEmployees: "",
    description: "",
    sector: "",
  });

  function inputChange(name, val) {
    setState({
      ...state,
      [name]: val,
    });
  }

  function handleClick() {
    alert("updated" + JSON.stringify(state));
  }

  return (
    <div className={styles.CompanyDetailContainer}>
      <h2 className={[styles.titleLarge, styles.mb64].join(" ")}>Company Detail</h2>
      <div className="flex flex-row">
        <p className={styles.label}>
          <b>Title</b>
        </p>
        <InputGroup
          placeholder={"Type to edit"}
          onChange={(text) => inputChange("title", text)}
          defaultValue={state.title}
          className={["bp3-fill", styles.inputUnderline].join(" ")}
        />
      </div>
      <div className="flex flex-row">
        <p className={styles.label}>
          <b>Sector</b>
        </p>
        <InputGroup
          placeholder={"Type to edit"}
          onChange={(text) => inputChange("sector", text)}
          defaultValue={state.sector}
          className={["bp3-fill", styles.inputUnderline].join(" ")}
        />
      </div>
      <div className="flex flex-row">
        <p className={styles.label}>
          <b>Number of employees</b>
        </p>
        <InputGroup
          placeholder={"Type to edit"}
          onChange={(text) => inputChange("numOfEmployees", text)}
          defaultValue={state.numOfEmployees}
          className={["bp3-fill", styles.inputUnderline].join(" ")}
        />
      </div>
      <div className="flex flex-row">
        <p className={styles.label}>
          <b>Description</b>
        </p>
        <TextArea
          placeholder={"Type to edit"}
          onChange={(text) => inputChange("description", text)}
          defaultValue={state.description}
          className={["bp3-fill", styles.inputUnderline].join(" ")}
        />
      </div>
      <div className="flex flex-row">
        <p className={styles.label}>
          <b>Address</b>
        </p>
        <TextArea
          placeholder={"Type to edit"}
          onChange={(text) => inputChange("address", text)}
          defaultValue={state.address}
          className={["bp3-fill", styles.inputUnderline].join(" ")}
        />
      </div>
      <div className="flex justify-end">
        <Button onClick={() => handleClick()} className={["bp3-outlined", "bp3-large"].join(" ")}>
          Update
        </Button>
      </div>
    </div>
  );
}

export default EmployerProfile;
