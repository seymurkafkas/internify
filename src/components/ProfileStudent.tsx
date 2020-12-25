import React from "react";
import { EditableText } from "@blueprintjs/core";
import EnrolledItem from "./EnrolledItem";
export default function ProfileStudent() {
  const [name, setName] = React.useState("");
  /*   const [location, setLocation] = React.useState({ city: "", country: "" });
  const [education, setEducation] = React.useState([]);
  const [experience, setExperience] = React.useState([]);
  const [skills, setSkills] = React.useState([]);
  const [interests, setInterests] = React.useState([]);
  const [languages, setLanguages] = React.useState([]);
 */
  function handleNameChange(newName: string) {
    setName(newName);
  }

  return (
    <>
      <img
        className=" rounded-full absolute h-36 w-36 mt-20 ml-24"
        src="https://i1.sndcdn.com/avatars-000564668493-ths2jx-t500x500.jpg"></img>
      <div className="flex flex-col  justify-between absolute w-3/6 h-4/6 ml-96 mt-20">
        <div>
          <div>Name</div>
          <EditableText
            alwaysRenderInput={true}
            onChange={handleNameChange}
            maxLength={50}
            value={name}
            placeholder="John Smith"
            selectAllOnFocus={true}
          />
        </div>
        <div>
          <div>Location</div>
          <EditableText
            alwaysRenderInput={true}
            onChange={() => {}}
            maxLength={50}
            placeholder="John Smith"
            selectAllOnFocus={true}
          />
        </div>
        <div>
          <div>Education</div>
          <EnrolledItem></EnrolledItem>
        </div>
        <div>Skills</div>
        <div>Interests</div>
        <div>Languages</div>
        <EditableText
          alwaysRenderInput={true}
          onChange={() => {}}
          maxLength={300}
          placeholder="Description"
          selectAllOnFocus={true}
        />
      </div>
    </>
  );
}
