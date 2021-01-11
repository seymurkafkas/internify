import React from "react";
import { EditableText, Button } from "@blueprintjs/core";
import EnrolledItem from "./EnrolledItem";
import { DateRange } from "@blueprintjs/datetime";
import * as databaseService from "../services/firestore";
import { useUser } from "../services/auth/userContext";
import { enrolledItemTransformDate } from "../util/date";

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
  const [loadingData, setLoadingData] = React.useState(true);
  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState({ city: "", country: "" });
  const [education, setEducation] = React.useState([]);
  const [description, setDescription] = React.useState("");
  const [skills, setSkills] = React.useState([]);
  const [languages, setLanguages] = React.useState([]);
  const [interests, setInterests] = React.useState([]);
  const [experience, setExperience] = React.useState([]);
  const { user, loadingUser } = useUser();
  const uid = user?.uid ?? null;

  React.useEffect(() => {
    (async () => {
      if (user) {
        try {
          const studentProfileData = await databaseService.getStudentProfile(uid);
          if (studentProfileData) {
            const {
              name: newName,
              location: newLocation,
              education: newEducation,
              description: newDescription,
              skills: newSkills,
              languages: newLanguages,
              interests: newInterests,
              experience: newExperience,
            } = studentProfileData;
            enrolledItemTransformDate(newEducation);
            enrolledItemTransformDate(newExperience);
            setName(newName);
            setLocation(newLocation);
            setEducation(newEducation);
            setDescription(newDescription);
            setSkills(newSkills);
            setLanguages(newLanguages);
            setInterests(newInterests);
            setExperience(newExperience);
          }
          setLoadingData(false);
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [user, uid]);

  function addInterestItem() {
    setInterests((prevInterests) => {
      return [...prevInterests, ""];
    });
  }

  function removeInterestItem(index: number) {
    return () => {
      setInterests((prevInterests) => {
        const newInterests = [...prevInterests];
        newInterests.splice(index, 1);
        return newInterests;
      });
    };
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
      return [...prevSkills, { skill: "", level: "1" }];
    });
  }

  function removeSkillItem(index: number) {
    return () => {
      setSkills((prevSkills) => {
        const newSkills = [...prevSkills];
        newSkills.splice(index, 1);
        return newSkills;
      });
    };
  }

  function addLanguageItem() {
    setLanguages((prevLanguages) => {
      return [...prevLanguages, { language: "", level: "1" }];
    });
  }

  function removeLanguageItem(index: number) {
    return () => {
      setLanguages((prevLanguages) => {
        const newLanguages = [...prevLanguages];
        newLanguages.splice(index, 1);
        return newLanguages;
      });
    };
  }

  function handleSkillsChange(index: number) {
    return function (changedItem: string) {
      const subFunction = (event: any) => {
        const newValue = changedItem === "level" ? event.target.value : event.currentTarget.value;
        setSkills((prevSkills) => {
          const newSkills = [...prevSkills];
          newSkills[index] = { ...newSkills[index], [changedItem]: newValue };
          return newSkills;
        });
      };
      return subFunction;
    };
  }

  function handleLanguagesChange(index: number) {
    return function (changedItem: string) {
      const subFunction = (event: any) => {
        const newValue = changedItem === "level" ? event.target.value : event.currentTarget.value;
        setLanguages((prevLanguages) => {
          const newLanguages = [...prevLanguages];
          newLanguages[index] = { ...newLanguages[index], [changedItem]: newValue };
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
      return [...prevEducation, { institutionName: "", degreeName: "", range: [null, null] }];
    });
  }

  function removeEducationItem(index: number) {
    return () => {
      setEducation((prevEducation) => {
        const newEducation = [...prevEducation];
        newEducation.splice(index, 1);
        return newEducation;
      });
    };
  }

  function addExperienceItem() {
    setExperience((prevExperience) => {
      return [...prevExperience, { companyName: "", positionName: "", range: [null, null] }];
    });
  }

  function removeExperienceItem(index: number) {
    return () => {
      setExperience((prevExperience) => {
        const newExperience = [...prevExperience];
        newExperience.splice(index, 1);
        return newExperience;
      });
    };
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

  if (loadingUser || !user) {
    return null;
  } else if (loadingData && user) {
    return <div>Loading ...</div>;
  }
  return (
    <>
      <p className="text-5xl font-light mt-8 ml-48">My Profile</p>
      <img
        className=" rounded-full absolute h-36 w-36 mt-8 ml-48"
        src="https://i1.sndcdn.com/avatars-000564668493-ths2jx-t500x500.jpg"></img>
      <div className="flex flex-col items-start justify-start absolute space-y-4 ml-48 mt-8">
        <div className="ml-44">
          <div>
            <b>Name</b>
          </div>
          <input
            className="bp3-input .modifier mt-2"
            type="text"
            dir="auto"
            onChange={handleNameChange}
            value={name}
            placeholder="John Smith"
          />
        </div>
        <div className="ml-44">
          <div>
            <b>Location</b>
          </div>
          <div className="space-x-4 mt-2">
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
        </div>
        <div>
          <div className="mt-8">
            <b>Education</b>
          </div>
          <div>
            <Button
              icon="add"
              className="mt-4 bp3-outlined"
              onClick={addEducationItem}
              disabled={education.length === constants.maxEducationCount}
            />
            <div>
              {education.map((educationItem: EducationItem, index: number) => (
                <div key={index} className="box-border rounded-lg border-gray-300 flex border-4 p-4 mt-2">
                  <EnrolledItem
                    experience={false}
                    institutionName={educationItem.institutionName}
                    degreeName={educationItem.degreeName}
                    range={educationItem.range}
                    educationChangeHandler={handleEducationItemChange(index)}></EnrolledItem>
                  <Button
                    className="ml-8 place-self-center bp3-outlined"
                    icon="cross"
                    onClick={removeEducationItem(index)}></Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div>
            <b>Experience</b>
          </div>
          <div className="flex flex-col items-start">
            <Button
              className="mt-4 bp3-outlined"
              icon="add"
              onClick={addExperienceItem}
              disabled={experience.length === constants.maxExperienceCount}
            />
            {experience.map((experienceItem: ExperienceItem, index: number) => (
              <div key={index} className="box-border rounded-lg border-gray-300 flex border-4 p-4 mt-2">
                <EnrolledItem
                  experience
                  companyName={experienceItem.companyName}
                  positionName={experienceItem.positionName}
                  range={experienceItem.range}
                  experienceChangeHandler={handleExperienceItemChange(index)}></EnrolledItem>
                <Button
                  className="ml-8 place-self-center bp3-outlined"
                  icon="cross"
                  onClick={removeExperienceItem(index)}></Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <b>Skills</b>
        </div>
        <div className="flex flex-col items-start">
          <Button
            icon="add"
            className="bp3-outlined"
            onClick={addSkillItem}
            disabled={skills.length === constants.maxSkillsCount}
          />
          {skills.map((skillElement, index) => {
            return (
              <div key={index} className="flex mt-2 space-x-2">
                <input
                  className="bp3-input .modifier"
                  type="text"
                  dir="auto"
                  onChange={handleSkillsChange(index)("skill")}
                  value={skillElement.skill}
                  placeholder="Skill"
                />
                <div className="bp3-select .modifier">
                  <select value={skillElement.level} onChange={handleSkillsChange(index)("level")}>
                    <option value="1">Beginner</option>
                    <option value="2">Intermediate</option>
                    <option value="3">Advanced</option>
                  </select>
                </div>
                <Button icon="cross" className="bp3-outlined" onClick={removeSkillItem(index)}></Button>
              </div>
            );
          })}
        </div>
        <div>
          <b>Languages</b>
        </div>
        <div className="flex flex-col items-start">
          <Button
            icon="add"
            className="bp3-outlined"
            onClick={addLanguageItem}
            disabled={languages.length === constants.maxLanguagesCount}
          />
          {languages.map((languageElement, index) => {
            return (
              <div key={index} className="flex mt-2 space-x-2">
                <input
                  className="bp3-input .modifier"
                  type="text"
                  dir="auto"
                  onChange={handleLanguagesChange(index)("language")}
                  value={languageElement.language}
                  placeholder="Language"
                />
                <div className="bp3-select .modifier">
                  <select value={languageElement.level} onChange={handleLanguagesChange(index)("level")}>
                    <option value="1">Beginner</option>
                    <option value="2">Elementary </option>
                    <option value="3">Intermediate</option>
                    <option value="4">Proficient</option>
                    <option value="5">Native</option>
                  </select>
                </div>
                <Button icon="cross" className="bp3-outlined" onClick={removeLanguageItem(index)}></Button>
              </div>
            );
          })}
        </div>
        <div>
          <b>Interests</b>
        </div>
        <div className="flex flex-col items-start">
          <Button
            icon="add"
            className="bp3-outlined"
            onClick={addInterestItem}
            disabled={interests.length === constants.maxInterestsCount}
          />
          {interests.map((interestItem, index) => {
            return (
              <div key={index} className="flex mt-2 space-x-2">
                <input
                  className="bp3-input .modifier"
                  type="text"
                  dir="auto"
                  onChange={handleInterestsChange(index)}
                  value={interestItem}
                  placeholder="Interest"
                />
                <Button icon="cross" className="bp3-outlined" onClick={removeInterestItem(index)}></Button>
              </div>
            );
          })}
        </div>
        <div>
          <b>Description</b>
        </div>
        <EditableText
          className="ml-1 w-128 h-32"
          alwaysRenderInput={true}
          onChange={(newDescription: string) => {
            setDescription(newDescription);
          }}
          maxLength={300}
          placeholder="Tell us about yourself"
          value={description}
          selectAllOnFocus={true}
        />
        <Button
          className="bp3-outlined"
          onClick={databaseService.saveStudentProfile(
            { name, location, education, description, skills, languages, interests, experience },
            uid
          )}>
          Update
        </Button>
      </div>
    </>
  );
}
