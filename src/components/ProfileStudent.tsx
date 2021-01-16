import React from "react";
import { EditableText, Button, Position, Tooltip, Intent } from "@blueprintjs/core";
import EnrolledItem from "./EnrolledItem";
import { DateRange } from "@blueprintjs/datetime";
import * as databaseService from "../services/firestore";
import { useUser } from "../services/auth/userContext";
import { enrolledItemTransformDate } from "../util/date";
import { AppToaster } from "../components/Toaster";
import * as storage from "../services/storage";

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
  const [userData, setUserData] = React.useState({
    name: "",
    location: { city: "", country: "" },
    education: [],
    description: "",
    skills: [],
    languages: [],
    interests: [],
    experience: [],
  });

  const [profilePicUrl, setProfilePicUrl] = React.useState(storage.standardPhoto);
  const { user, loadingUser } = useUser();
  const hiddenFileInput = React.useRef(null);

  const handleUploadClick = () => {
    hiddenFileInput.current.click();
  };

  const handleUploadChange = (event) => {
    const fileUploaded = event.target.files[0];
    if (fileUploaded) {
      (async () => {
        try {
          await storage.uploadProfilePicture(uid, fileUploaded);
          const newProfilePic = await storage.getProfilePictureUrl(uid);
          setProfilePicUrl(newProfilePic);
          showUploadSuccessMessage();
        } catch (err) {
          showUploadFailureMessage(err);
        }
      })();
    }
  };

  const handlePhotoDelete = () => {
    (async () => {
      try {
        await storage.deleteProfilePicture(uid);
        setProfilePicUrl(storage.standardPhoto);
      } catch (err) {
        console.log(err);
      }
    })();
  };
  const uid = user?.uid ?? null;

  React.useEffect(() => {
    (async () => {
      if (user) {
        try {
          const studentProfileData = await databaseService.getStudentProfile(uid);
          console.log(studentProfileData);
          if (studentProfileData) {
            enrolledItemTransformDate(studentProfileData.experience);
            enrolledItemTransformDate(studentProfileData.education);
            setUserData(studentProfileData);
            const newProfilePic = await storage.getProfilePictureUrl(uid);
            if (newProfilePic) {
              setProfilePicUrl(newProfilePic);
            }
          }
          setLoadingData(false);
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [user, uid]);

  function addInterestItem() {
    setUserData((userData) => {
      return { ...userData, interests: [...userData.interests, ""] };
    });
  }

  function removeInterestItem(index: number) {
    return () => {
      setUserData((userData) => {
        const newInterests = [...userData.interests];
        newInterests.splice(index, 1);

        return { ...userData, interests: newInterests };
      });
    };
  }

  function handleInterestsChange(index: number) {
    return function (event: React.ChangeEvent<HTMLInputElement>) {
      setUserData((prevUserData) => {
        const newInterests = [...prevUserData.interests];
        newInterests[index] = event.currentTarget.value;
        return { ...prevUserData, interests: newInterests };
      });
    };
  }
  function addSkillItem() {
    setUserData((prevUserData) => {
      return { ...prevUserData, skills: [...prevUserData.skills, { skill: "", level: "1" }] };
    });
  }

  function removeSkillItem(index: number) {
    return () => {
      setUserData((prevUserData) => {
        const newSkills = [...prevUserData.skills];
        newSkills.splice(index, 1);
        return { ...prevUserData, skills: newSkills };
      });
    };
  }

  function addLanguageItem() {
    setUserData((prevUserData) => {
      return { ...prevUserData, languages: [...prevUserData.languages, { language: "", level: "1" }] };
    });
  }

  function removeLanguageItem(index: number) {
    return () => {
      setUserData((prevUserData) => {
        const newLanguages = [...prevUserData.languages];
        newLanguages.splice(index, 1);

        return { ...prevUserData, languages: newLanguages };
      });
    };
  }

  function handleSkillsChange(index: number) {
    return function (changedItem: string) {
      const subFunction = (event: any) => {
        const newValue = changedItem === "level" ? event.target.value : event.currentTarget.value;

        setUserData((prevUserData) => {
          const newSkills = [...prevUserData.skills];
          newSkills[index] = { ...newSkills[index], [changedItem]: newValue };
          return { ...prevUserData, skills: newSkills };
        });
      };
      return subFunction;
    };
  }

  function handleLanguagesChange(index: number) {
    return function (changedItem: string) {
      const subFunction = (event: any) => {
        const newValue = changedItem === "level" ? event.target.value : event.currentTarget.value;

        setUserData((prevUserData) => {
          const newLanguages = [...prevUserData.languages];
          newLanguages[index] = { ...newLanguages[index], [changedItem]: newValue };
          return { ...prevUserData, languages: newLanguages };
        });
      };
      return subFunction;
    };
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserData((prevUserData) => {
      return { ...prevUserData, name: event.target.value };
    });
  }
  function addEducationItem() {
    setUserData((prevUserData) => {
      return {
        ...prevUserData,
        education: [...prevUserData.education, { institutionName: "", degreeName: "", range: [null, null] }],
      };
    });
  }

  function removeEducationItem(index: number) {
    return () => {
      setUserData((prevUserData) => {
        const newEducation = [...prevUserData.education];
        newEducation.splice(index, 1);
        return { ...prevUserData, education: newEducation };
      });
    };
  }

  function addExperienceItem() {
    setUserData((prevUserData) => {
      return {
        ...prevUserData,
        experience: [...prevUserData.experience, { companyName: "", positionName: "", range: [null, null] }],
      };
    });
  }

  function removeExperienceItem(index: number) {
    return () => {
      setUserData((prevUserData) => {
        const newExperience = [...prevUserData.experience];
        newExperience.splice(index, 1);
        return { ...prevUserData, experience: newExperience };
      });
    };
  }

  function handleEducationItemChange(index: number) {
    return function (updatedPart: string) {
      if (updatedPart === "range") {
        return function (selectedDates: DateRange | undefined) {
          setUserData((prevUserData) => {
            const newEducation = [...prevUserData.education];
            newEducation[index] = { ...newEducation[index], range: selectedDates };
            return { ...prevUserData, education: newEducation };
          });
        };
      } else {
        return function (event: React.ChangeEvent<HTMLInputElement>) {
          setUserData((prevUserData) => {
            const newEducation = [...prevUserData.education];
            newEducation[index] = { ...newEducation[index], [updatedPart]: event.target.value };
            return { ...prevUserData, education: newEducation };
          });
        };
      }
    };
  }

  function handleExperienceItemChange(index: number) {
    return function (updatedPart: string) {
      if (updatedPart === "range") {
        return function (selectedDates: DateRange | undefined) {
          setUserData((prevUserData) => {
            const newExperience = [...prevUserData.experience];
            newExperience[index] = { ...newExperience[index], range: selectedDates };
            return { ...prevUserData, experience: newExperience };
          });
        };
      } else {
        return function (event: React.ChangeEvent<HTMLInputElement>) {
          setUserData((prevUserData) => {
            const newExperience = [...prevUserData.experience];
            newExperience[index] = { ...newExperience[index], [updatedPart]: event.target.value };
            return { ...prevUserData, experience: newExperience };
          });
        };
      }
    };
  }

  function handleLocationChange(updatedPart: string) {
    return function (event: React.ChangeEvent<HTMLInputElement>) {
      const updatedSection = { [updatedPart]: event.target.value };

      setUserData((prevUserData) => {
        return { ...prevUserData, location: { ...prevUserData.location, ...updatedSection } };
      });
    };
  }

  const showSuccessMessage = () => {
    AppToaster.show({
      message: "Profile Saved.",
      icon: "tick-circle",
      intent: Intent.SUCCESS,
    });
  };

  const showFailureMessage = () => {
    AppToaster.show({
      message: "Update failed. Try again later!",
      icon: "warning-sign",
      intent: Intent.DANGER,
    });
  };

  const showUploadFailureMessage = (error: string) => {
    AppToaster.show({
      message: error,
      intent: Intent.DANGER,
    });
  };

  const showUploadSuccessMessage = () => {
    AppToaster.show({
      message: "Upload successful!",
      intent: Intent.SUCCESS,
    });
  };

  function handleSaveProfile() {
    (async () => {
      try {
        await databaseService.saveStudentProfile(userData, uid);
        showSuccessMessage();
        console.log("success");
      } catch (err) {
        showFailureMessage();
      }
    })();
    console.log(userData);
  }

  if (loadingUser || !user) {
    return null;
  } else if (loadingData && user) {
    return <div>Loading ...</div>;
  }
  return (
    <>
      <input type="file" ref={hiddenFileInput} onChange={handleUploadChange} className="hidden" />
      <p className="text-5xl font-light mt-8 ml-48">My Profile</p>

      <div className="flex flex-col items-start justify-start space-y-4 ml-48 mt-8">
        <div className="flex flex-row items-start justify-start">
          <div className="ml-24 flex flex-col justify-start">
            <div className="flex flex-row justify-evenly">
              <Tooltip intent={Intent.NONE} content="Upload Photo" position={Position.TOP}>
                <Button icon="camera" className="bp3-minimal" onClick={handleUploadClick}></Button>
              </Tooltip>
              <Tooltip intent={Intent.NONE} content="Delete Photo" position={Position.TOP}>
                <Button icon="trash" className="bp3-minimal" onClick={handlePhotoDelete}></Button>
              </Tooltip>
            </div>
            <img className=" rounded-full h-36 w-36 max-w-none " src={profilePicUrl}></img>
          </div>
          <div>
            <div className="ml-20">
              <div>
                <b>Name</b>
              </div>
              <input
                className="bp3-input .modifier mt-2"
                type="text"
                dir="auto"
                onChange={handleNameChange}
                value={userData.name}
                placeholder="John Smith"
              />
            </div>
            <div className="ml-20">
              <div className="mt-6">
                <b>Location</b>
              </div>
              <div className="space-x-4 mt-2">
                <input
                  className="bp3-input .modifier"
                  type="text"
                  dir="auto"
                  onChange={handleLocationChange("city")}
                  value={userData.location.city}
                  placeholder="Istanbul"
                />
                <input
                  className="bp3-input .modifier"
                  type="text"
                  dir="auto"
                  onChange={handleLocationChange("country")}
                  value={userData.location.country}
                  placeholder="Turkey"
                />
              </div>
            </div>
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
              disabled={userData.education.length === constants.maxEducationCount}
            />
            <div>
              {userData.education.map((educationItem: EducationItem, index: number) => (
                <div key={index} className="box-border rounded-lg border-gray-300 flex border-4 p-4 mt-2">
                  <EnrolledItem
                    experience={false}
                    institutionName={educationItem.institutionName}
                    degreeName={educationItem.degreeName}
                    range={educationItem.range}
                    educationChangeHandler={handleEducationItemChange(index)}></EnrolledItem>
                  <Button
                    className="ml-8 place-self-center bp3-minimal"
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
              disabled={userData.experience.length === constants.maxExperienceCount}
            />
            {userData.experience.map((experienceItem: ExperienceItem, index: number) => (
              <div key={index} className="box-border rounded-lg border-gray-300 flex border-4 p-4 mt-2">
                <EnrolledItem
                  experience
                  companyName={experienceItem.companyName}
                  positionName={experienceItem.positionName}
                  range={experienceItem.range}
                  experienceChangeHandler={handleExperienceItemChange(index)}></EnrolledItem>
                <Button
                  className="ml-8 place-self-center bp3-minimal"
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
            disabled={userData.skills.length === constants.maxSkillsCount}
          />
          {userData.skills.map((skillElement, index) => {
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
                <div className="bp3-select bp3-minimal">
                  <select value={skillElement.level} onChange={handleSkillsChange(index)("level")}>
                    <option value="1">Beginner</option>
                    <option value="2">Intermediate</option>
                    <option value="3">Advanced</option>
                  </select>
                </div>
                <Button icon="cross" className="bp3-minimal" onClick={removeSkillItem(index)}></Button>
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
            disabled={userData.languages.length === constants.maxLanguagesCount}
          />
          {userData.languages.map((languageElement, index) => {
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
                <div className="bp3-select bp3-minimal">
                  <select value={languageElement.level} onChange={handleLanguagesChange(index)("level")}>
                    <option value="1">Beginner</option>
                    <option value="2">Elementary </option>
                    <option value="3">Intermediate</option>
                    <option value="4">Proficient</option>
                    <option value="5">Native</option>
                  </select>
                </div>
                <Button icon="cross" className="bp3-minimal" onClick={removeLanguageItem(index)}></Button>
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
            disabled={userData.interests.length === constants.maxInterestsCount}
          />
          {userData.interests.map((interestItem, index) => {
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
                <Button icon="cross" className="bp3-minimal" onClick={removeInterestItem(index)}></Button>
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
            setUserData((prevUserData) => {
              return { ...prevUserData, description: newDescription };
            });
          }}
          maxLength={300}
          placeholder="Tell us about yourself"
          value={userData.description}
          selectAllOnFocus={true}
        />
        <Button intent={Intent.PRIMARY} icon="saved" className="bp3-minimal" onClick={handleSaveProfile}>
          Update
        </Button>
      </div>
    </>
  );
}
