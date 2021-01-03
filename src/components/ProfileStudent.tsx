import React from "react";
import { EditableText, Button } from "@blueprintjs/core";
import EnrolledItem from "./EnrolledItem";
import { DateRange } from "@blueprintjs/datetime";

export default function ProfileStudent() {
  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState({ city: "", country: "" });
  const [education, setEducation] = React.useState([]);
  const [description, setDescription] = React.useState("");
  /*
  const [experience, setExperience] = React.useState([]);
  const [skills, setSkills] = React.useState([]);
  const [interests, setInterests] = React.useState([]);
  const [languages, setLanguages] = React.useState([]);
 */
  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }
  function addEducationItem() {
    setEducation((prevEducation) => {
      return [...prevEducation, { institutionName: "", positionName: "", range: [null, null] }];
    });
  }

  function handleEducationItemChange(index: number) {
    return function (updatedPart: string) {
      if (updatedPart === "range") {
        return function (selectedDates: DateRange | undefined) {
          setEducation((prevEducation) => {
            const newEducation = [...prevEducation];
            newEducation[index] = { ...newEducation[index], range: selectedDates };
            return newEducation;
          });
        };
      } else {
        return function (event: React.ChangeEvent<HTMLInputElement>) {
          setEducation((prevEducation) => {
            const newEducation = [...prevEducation];
            newEducation[index] = { ...newEducation[index], [updatedPart]: event.target.value };
            return newEducation;
          });
        };
      }
    };
  }

  interface EducationItem {
    institutionName: string;
    positionName: string;
    range: DateRange;
  }

  function handleLocationChange(updatedPart: string) {
    return function (event: React.ChangeEvent<HTMLInputElement>) {
      const updatedSection = { [updatedPart]: event.target.value };

      setLocation((prevLocation) => {
        return { ...prevLocation, ...updatedSection };
      });
    };
  }

  return (
    <>
      <img
        className=" rounded-full absolute h-36 w-36 mt-20 ml-24"
        src="https://i1.sndcdn.com/avatars-000564668493-ths2jx-t500x500.jpg"></img>
      <div className="flex flex-col  justify-between absolute w-3/6 h-4/6 ml-96 mt-20">
        <div>
          <div>Name</div>
          <input
            className="bp3-input .modifier"
            type="text"
            dir="auto"
            onChange={handleNameChange}
            value={name}
            placeholder="John Smith"
          />
        </div>
        <div>
          <div>Location</div>
          <input
            className="bp3-input .modifier"
            type="text"
            dir="auto"
            onChange={handleLocationChange("city")}
            value={location.city}
            placeholder="Istanbul"
          />
          <input
            className="bp3-input .modifier"
            type="text"
            dir="auto"
            onChange={handleLocationChange("country")}
            value={location.country}
            placeholder="Turkey"
          />
        </div>
        <div>
          <div>Education</div>
          <div className="flex flex-col items-start">
            <Button icon="add" onClick={addEducationItem} />
            {education.map((educationItem: EducationItem, index: number) => (
              <EnrolledItem
                key={index}
                institutionName={educationItem.institutionName}
                positionName={educationItem.positionName}
                range={educationItem.range}
                educationChangeHandler={handleEducationItemChange(index)}></EnrolledItem>
            ))}
          </div>
        </div>
        <div>Skills</div>
        <div>Interests</div>
        <div>Languages</div>
        <EditableText
          alwaysRenderInput={true}
          onChange={(newDescription: string) => {
            setDescription(newDescription);
          }}
          maxLength={300}
          placeholder="Description"
          value={description}
          selectAllOnFocus={true}
        />
      </div>
    </>
  );
}
