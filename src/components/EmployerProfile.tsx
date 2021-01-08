import React, { useState } from "react";
import {
  Button, //H5,
  InputGroup,
  TextArea,
  // Switch,
} from "@blueprintjs/core";

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
    <>
      <p className="text-5xl font-light mt-8 ml-48">Company Profile</p>
      <img
        className=" rounded-full absolute h-36 w-36 mt-8 ml-48"
        src="https://i1.sndcdn.com/avatars-000564668493-ths2jx-t500x500.jpg"></img>
      <div className="flex flex-col items-start justify-start absolute space-y-4 w-full ml-48 mt-8">
        <div className="flex flex-col space-y-2 ml-44">
          <div>Title</div>
          <InputGroup
            onChange={(text) => inputChange("title", text)}
            defaultValue={state.title}
            placeholder="Title"
            className="w-64"
          />
        </div>
        <div className="flex flex-col space-y-2 ml-44">
          <div>Sector</div>
          <InputGroup
            placeholder={"Type to edit"}
            onChange={(text) => inputChange("sector", text)}
            defaultValue={state.sector}
            className="w-64"
          />
        </div>
        <div className="flex flex-row space-x-4">
          <div className="mt-8">Number of employees</div>
          <InputGroup
            placeholder={"Type to edit"}
            onChange={(text) => inputChange("numOfEmployees", text)}
            defaultValue={state.numOfEmployees}
            className="w-12 mt-6 h-4"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <div>Address</div>
          <TextArea
            placeholder={"Type to edit"}
            onChange={(text) => inputChange("address", text)}
            defaultValue={state.address}
            className="w-128 max-h-32"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <div>Description</div>
          <TextArea
            placeholder={"Type to edit"}
            onChange={(text) => inputChange("description", text)}
            defaultValue={state.description}
            className="w-128 max-h-32"
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleClick} className="bp3-outlined">
            Update
          </Button>
        </div>
      </div>
    </>
  );
}

export default EmployerProfile;
