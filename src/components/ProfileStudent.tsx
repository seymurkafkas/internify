import React from "react";
import { EditableText, Button } from "@blueprintjs/core";
import EnrolledItem from "./EnrolledItem";
import { DateRange } from "@blueprintjs/datetime";

interface EducationItem {
  institutionName: string;
  degreeName: string;
  range: DateRange;
}

interface ExperienceItem {
  companyName: string;
  positionName: string;
  range: DateRange;
}

const constants = {
  maxInterestsCount: 10,
  maxEducationCount: 6,
  maxExperienceCount: 4,
  maxLanguagesCount: 7,
  maxSkillsCount: 10,
};

export default function ProfileStudent() {
  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState({ city: "", country: "" });
  const [education, setEducation] = React.useState([]);
  const [description, setDescription] = React.useState("");
  const [skills, setSkills] = React.useState([]);
  const [languages, setLanguages] = React.useState([]);
  const [interests, setInterests] = React.useState([]);
  const [experience, setExperience] = React.useState([]);

  function addInterestItem() {
    setInterests((prevInterests) => {
      return [...prevInterests, ""];
    });
  }

  function handleInterestsChange(index: number) {
    return function (event: React.ChangeEvent<HTMLInputElement>) {
      setInterests((prevInterests) => {
        const newInterests = [...prevInterests];
        newInterests[index] = event.currentTarget.value;
        return newInterests;
      });
    };
  }
  function addSkillItem() {
    setSkills((prevSkills) => {
      return [...prevSkills, { skill: "", level: "Beginner" }];
    });
  }

  function addLanguageItem() {
    setLanguages((prevLanguages) => {
      return [...prevLanguages, { language: "", level: "Beginner" }];
    });
  }

  function handleSkillsChange(index: number) {
    return function (changedItem: string) {
      const subFunction = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSkills((prevSkills) => {
          const newSkills = [...prevSkills];
          newSkills[index] = { ...newSkills[index], [changedItem]: event.currentTarget.value };
          return newSkills;
        });
      };
      return subFunction;
    };
  }

  function handleLanguagesChange(index: number) {
    return function (changedItem: string) {
      const subFunction = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLanguages((prevLanguages) => {
          const newLanguages = [...prevLanguages];
          newLanguages[index] = { ...newLanguages[index], [changedItem]: event.currentTarget.value };
          return newLanguages;
        });
      };
      return subFunction;
    };
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }
  function addEducationItem() {
    setEducation((prevEducation) => {
      return [...prevEducation, { institutionName: "", positionName: "", range: [null, null] }];
    });
  }

  function addExperienceItem() {
    setExperience((prevExperience) => {
      return [...prevExperience, { institutionName: "", positionName: "", range: [null, null] }];
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

  function handleExperienceItemChange(index: number) {
    return function (updatedPart: string) {
      if (updatedPart === "range") {
        return function (selectedDates: DateRange | undefined) {
          setExperience((prevExperience) => {
            const newExperience = [...prevExperience];
            newExperience[index] = { ...newExperience[index], range: selectedDates };
            return newExperience;
          });
        };
      } else {
        return function (event: React.ChangeEvent<HTMLInputElement>) {
          setExperience((prevExperience) => {
            const newExperience = [...prevExperience];
            newExperience[index] = { ...newExperience[index], [updatedPart]: event.target.value };
            return newExperience;
          });
        };
      }
    };
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
            <Button icon="add" onClick={addEducationItem} disabled={education.length === constants.maxEducationCount} />
            {education.map((educationItem: EducationItem, index: number) => (
              <EnrolledItem
                experience={false}
                key={index}
                institutionName={educationItem.institutionName}
                positionName={educationItem.degreeName}
                range={educationItem.range}
                educationChangeHandler={handleEducationItemChange(index)}></EnrolledItem>
            ))}
          </div>
        </div>
        <div>
          <div>Experience</div>
          <div className="flex flex-col items-start">
            <Button
              icon="add"
              onClick={addExperienceItem}
              disabled={experience.length === constants.maxExperienceCount}
            />
            {experience.map((experienceItem: ExperienceItem, index: number) => (
              <EnrolledItem
                experience
                key={index}
                companyName={experienceItem.companyName}
                positionName={experienceItem.positionName}
                range={experienceItem.range}
                experienceChangeHandler={handleExperienceItemChange(index)}></EnrolledItem>
            ))}
          </div>
        </div>

        <div>Skills</div>
        <div className="flex flex-col items-start">
          <Button icon="add" onClick={addSkillItem} disabled={skills.length === constants.maxSkillsCount} />
          {skills.map((skillElement, index) => {
            return (
              <>
                <input
                  className="bp3-input .modifier"
                  type="text"
                  dir="auto"
                  onChange={handleSkillsChange(index)("skill")}
                  value={skillElement.skill}
                  placeholder="Skill"
                />
                <div className="bp3-select .modifier" onChange={handleSkillsChange(index)("level")}>
                  <select value={skillElement.level}>
                    <option value="1">Beginner</option>
                    <option value="2">Intermediate</option>
                    <option value="3">Advanced</option>
                  </select>
                </div>
              </>
            );
          })}
        </div>
        <div>Languages</div>
        <div className="flex flex-col items-start">
          <Button icon="add" onClick={addLanguageItem} disabled={languages.length === constants.maxLanguagesCount} />
          {languages.map((languageElement, index) => {
            return (
              <>
                <input
                  className="bp3-input .modifier"
                  type="text"
                  dir="auto"
                  onChange={handleLanguagesChange(index)("language")}
                  value={languageElement.language}
                  placeholder="Language"
                />
                <div className="bp3-select .modifier" onChange={handleLanguagesChange(index)("level")}>
                  <select value={languageElement.level}>
                    <option value="1">Beginner</option>
                    <option value="2">Elementary </option>
                    <option value="3">Intermediate</option>
                    <option value="2">Proficient</option>
                    <option value="3">Native</option>
                  </select>
                </div>
              </>
            );
          })}
        </div>
        <div>Interests</div>
        <div className="flex flex-col items-start">
          <Button icon="add" onClick={addInterestItem} disabled={interests.length === constants.maxInterestsCount} />
          {interests.map((interestItem, index) => {
            return (
              <input
                key={index}
                className="bp3-input .modifier"
                type="text"
                dir="auto"
                onChange={handleInterestsChange(index)}
                value={interestItem}
                placeholder="Interest"
              />
            );
          })}
        </div>
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
