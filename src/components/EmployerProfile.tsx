import * as React from "react";
import {
  Button, //H5,
  InputGroup,
  TextArea,
  // Switch,
} from "@blueprintjs/core";

class EmployerProfile extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.state = {
      title: "",
      sector: "",
      numOfEmployees: 0,
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
      <>
        <p className="text-5xl font-light mt-8 ml-48">Company Profile</p>
        <img
          className=" rounded-full absolute h-36 w-36 mt-8 ml-48"
          src="https://i1.sndcdn.com/avatars-000564668493-ths2jx-t500x500.jpg"></img>
        <div className="flex flex-col items-start justify-start absolute space-y-4 w-full ml-48 mt-8">
          <div className="flex flex-col space-y-2 ml-44">
            <div>Title</div>
            <InputGroup
              placeholder="Title"
              onChange={this.inputChange.bind(this, "title")}
              defaultValue={this.state.title}
              className="w-64"
            />
          </div>
          <div className="flex flex-col space-y-2 ml-44">
            <div>Sector</div>
            <InputGroup
              placeholder={"Sector"}
              onChange={this.inputChange.bind(this, "sector")}
              defaultValue={this.state.sector}
              className="w-64"
            />
          </div>
          <div className="flex flex-row space-x-4">
            <div className="mt-8">Number of employees</div>
            <InputGroup
              placeholder={"n"}
              onChange={this.inputChange.bind(this, "numOfEmployees")}
              defaultValue={this.state.numOfEmployees}
              className="w-12 mt-6 h-4"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div>Address</div>
            <TextArea
              placeholder={"Adress"}
              onChange={this.inputChange.bind(this, "address")}
              defaultValue={this.state.address}
              className="w-128 max-h-32"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div>Description</div>
            <TextArea
              placeholder={"Tell us about the company"}
              onChange={this.inputChange.bind(this, "description")}
              defaultValue={this.state.description}
              className="w-128 max-h-32"
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={this.handleClick} className="">
              Update
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default EmployerProfile;
