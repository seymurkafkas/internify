import React, { useState } from "react";
import {
  Button,
  //Card,
  Intent,
  NumericInput,
  EditableText,
} from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
// import { ItemRenderer, MultiSelect } from "@blueprintjs/select";
import * as DatabaseService from "../services/firestore";
import { useUser } from "../services/auth/userContext";
import { AppToaster } from "./Toaster";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const constants = {
  maxRequirementsCount: 6,
};

export default function CreatePositionSection() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState([]);
  const [location, setLocation] = React.useState({ city: "", country: "" });
  const [compensation, setCompensation] = useState(0);
  const [deadline, setDeadline] = useState(null);
  const { user } = useUser();
  const userId = user?.uid;

  const showSuccessMessage = () => {
    AppToaster.show({
      message: "Successfully created your listing.",
      icon: "tick-circle",
      intent: Intent.SUCCESS,
    });
  };

  const showFailureMessage = () => {
    AppToaster.show({
      message: "Listing could not be created",
      icon: "warning-sign",
      intent: Intent.DANGER,
    });
  };

  function createAListing() {
    (async function () {
      try {
        await DatabaseService.createAListing(
          { title, description, requirements, compensation, deadline, location },
          userId
        );
        showSuccessMessage();
        setTitle("");
        setDescription("");
        setRequirements([]);
        setLocation({ city: "", country: "" });
        setCompensation(0);
        setDeadline(null);
      } catch (err) {
        showFailureMessage();
        console.log(err);
      }
    })();
  }

  function handleLocationChange(updatedPart: string) {
    return function (event: React.ChangeEvent<HTMLInputElement>) {
      const updatedSection = { [updatedPart]: event.target.value };

      setLocation((prevLocation) => {
        return { ...prevLocation, ...updatedSection };
      });
    };
  }

  function addRequirementItem() {
    setRequirements((prevRequirements) => {
      return [...prevRequirements, { skill: "", level: "1" }];
    });
  }

  function removeRequirementItem(index: number) {
    return () => {
      setRequirements((prevRequirements) => {
        const newRequirements = [...prevRequirements];
        newRequirements.splice(index, 1);
        return newRequirements;
      });
    };
  }

  function handleRequirementsChange(index: number) {
    return function (changedItem: string) {
      const subFunction = (event: any) => {
        const newValue = changedItem === "level" ? event.target.value : event.currentTarget.value;
        setRequirements((prevRequirements) => {
          const newRequirements = [...prevRequirements];
          newRequirements[index] = { ...newRequirements[index], [changedItem]: newValue };
          return newRequirements;
        });
      };
      return subFunction;
    };
  }

  return (
    <div className="flex justify-start flex-col mr-96 w-160">
      <div className="flex justify-between flex-col mb-4">
        <div className="flex justify-between mb-8">
          <EditableText
            onChange={(text) => setTitle(text)}
            className="w-96 text-4xl font-bold"
            value={title}
            placeholder="Title of the Listing"
          />
        </div>
        <div className="text-xl font-bold mb-4">Description</div>
        <EditableText
          className="mb-6 w-96"
          onChange={(text) => setDescription(text)}
          multiline={true}
          placeholder="Description"
          value={description}
        />
        <div className="text-xl font-bold mb-2 mt-4">Location</div>
        <div className="space-x-4 mt-2">
          <input
            className="bp3-input .modifier"
            type="text"
            dir="auto"
            onChange={handleLocationChange("city")}
            value={location.city}
            placeholder="City"
          />
          <input
            className="bp3-input .modifier"
            type="text"
            dir="auto"
            onChange={handleLocationChange("country")}
            value={location.country}
            placeholder="Country"
          />
        </div>
        <div className="text-xl font-bold mb-4 mt-8">Requirements</div>

        <div className="flex flex-col items-start">
          <Button
            icon="add"
            className="bp3-outlined"
            onClick={addRequirementItem}
            disabled={requirements.length === constants.maxRequirementsCount}
          />
          {requirements.map((requirementElement, index) => {
            return (
              <div key={index} className="flex mt-2 space-x-2">
                <input
                  className="bp3-input .modifier"
                  type="text"
                  dir="auto"
                  onChange={handleRequirementsChange(index)("skill")}
                  value={requirementElement.skill}
                  placeholder="Skill"
                />
                <div className="bp3-select .modifier">
                  <select value={requirementElement.level} onChange={handleRequirementsChange(index)("level")}>
                    <option value="1">Beginner</option>
                    <option value="2">Intermediate</option>
                    <option value="3">Advanced</option>
                  </select>
                </div>
                <Button icon="cross" className="bp3-outlined" onClick={removeRequirementItem(index)}></Button>
              </div>
            );
          })}
        </div>

        <div className="text-xl font-bold mt-8">Compensation</div>
      </div>
      <NumericInput
        allowNumericCharactersOnly={true}
        min={0}
        value={compensation}
        onValueChange={(number) => {
          setCompensation(number);
        }}></NumericInput>
      <div className="text-xl font-bold mb-4 mt-8">Deadline</div>

      <DateInput
        formatDate={(date) => date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear()}
        onChange={(date) => {
          setDeadline(date);
        }}
        parseDate={(str) => new Date(str)}
        placeholder={"Set a deadline"}
        value={deadline}
      />
      <div className="flex justify-end">
        <div
          className="cursor-pointer flex place-items-center rounded justify-center text-white bg-green-700 hover:bg-green-500 w-36 h-10"
          onClick={createAListing}>
          <div className="text-lg">Create</div>
        </div>
      </div>
    </div>
  );
}
