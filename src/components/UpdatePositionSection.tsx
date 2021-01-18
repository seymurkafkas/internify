import React, { useState } from "react";
import { Button, Position, Intent, NumericInput, EditableText, Tooltip, Alert } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
// import { ItemRenderer, MultiSelect } from "@blueprintjs/select";
import * as DatabaseService from "../services/firestore";
import * as NavigationService from "../services/navigation";
import { useUser } from "../services/auth/userContext";
import { useRouter } from "next/router";
import { AppToaster } from "./Toaster";
import Spinner from "./Spinner";

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

interface ListingData {
  title: string;
  companyName: string;
  location: { city: string; country: string };
  applicationCount: number;
  description: string;
  requirements: { skill: string; level: string }[];
  deadline: firebase.default.firestore.Timestamp | null;
  compensation: number;
}

interface Props {
  listingId: string;
}
function UpdatePositionSection(props: Props) {
  const [title, setTitle] = useState("");
  const [noDataAvailable, setNoDataAvailable] = React.useState(true);
  const [loadingData, setLoadingData] = React.useState(true);
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState([]);
  const [location, setLocation] = React.useState({ city: "", country: "" });
  const [compensation, setCompensation] = useState(0);
  const [deadline, setDeadline] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const { user, loadingUser } = useUser();
  const router = useRouter();
  const userId = user?.uid ?? null;
  const listingId = props.listingId;
  console.log(listingId, userId);

  const showUpdateToaster = () => {
    AppToaster.show({
      message: "Updated.",
      icon: "cloud",
      intent: Intent.PRIMARY,
    });
  };

  const showDeleteToaster = () => {
    AppToaster.show({
      message: "Deleted listing",
      icon: "trash",
      intent: Intent.DANGER,
    });
  };

  React.useEffect(() => {
    (async function () {
      if (user) {
        try {
          const res = (await DatabaseService.getListingData(userId, listingId)) as ListingData;
          console.log(res);
          setTitle(res.title);
          setDescription(res.description);
          setRequirements(res.requirements);
          setLocation(res.location);
          setCompensation(res.compensation);
          setDeadline(res.deadline?.toDate() ?? null);
          setNoDataAvailable(false);
        } catch (err) {
          console.log(err);
          setNoDataAvailable(true);
        }
        setLoadingData(false);
      }
    })();
  }, [user, listingId, userId]);

  function handleDeleteListing() {
    (async function () {
      try {
        await DatabaseService.deleteListing(listingId, userId);
        showDeleteToaster();
        NavigationService.goToMyListingsPage(router);
      } catch (err) {
        console.log(err);
      }
    })();
  }
  function updateListing() {
    (async function () {
      try {
        console.log(userId, listingId);
        await DatabaseService.updateListing(
          { title, description, requirements, compensation, deadline, location },
          userId,
          listingId
        );
        showUpdateToaster();
      } catch (err) {
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
  if (!user || loadingUser) {
    return null;
  }

  if (loadingData) {
    return <Spinner size={150}></Spinner>;
  }

  if (noDataAvailable) {
    return <div>Error!!!! NO DATA</div>;
  }
  return (
    <div className="flex justify-start flex-col mr-96 w-128">
      <div className="flex justify-between flex-col mb-4">
        <div className="flex justify-between mb-8">
          <EditableText
            onChange={(text) => setTitle(text)}
            className="w-96 text-4xl font-bold"
            value={title}
            placeholder="Title of the Listing"
          />
          <Tooltip intent={Intent.DANGER} content="Delete" position={Position.RIGHT}>
            <Button
              icon="trash"
              className="bp3-minimal w-20"
              onClick={() => {
                setIsAlertOpen(true);
              }}></Button>
          </Tooltip>
        </div>
        <div className="text-xl font-bold mb-4">Description</div>
        <EditableText
          className="mb-6"
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
                  className="bp3-input"
                  type="text"
                  dir="auto"
                  onChange={handleRequirementsChange(index)("skill")}
                  value={requirementElement.skill}
                  placeholder="Skill"
                />
                <div className="bp3-select bp3-minimal">
                  <select value={requirementElement.level} onChange={handleRequirementsChange(index)("level")}>
                    <option value="1">Beginner</option>
                    <option value="2">Intermediate</option>
                    <option value="3">Advanced</option>
                  </select>
                </div>
                <Button icon="cross" className="bp3-minimal" onClick={removeRequirementItem(index)}></Button>
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
        className="w-32"
        formatDate={(date) => date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear()}
        onChange={(date) => {
          setDeadline(date);
        }}
        parseDate={(str) => new Date(str)}
        placeholder={"Set a deadline"}
        value={deadline}
      />
      <div className="flex justify-end">
        <Button intent={Intent.PRIMARY} icon="saved" onClick={updateListing} className="bp3-minimal">
          Update
        </Button>
      </div>
      <Alert
        className=""
        cancelButtonText="Cancel"
        confirmButtonText="Delete"
        icon="remove"
        intent={Intent.DANGER}
        isOpen={isAlertOpen}
        onCancel={() => {
          setIsAlertOpen(false);
        }}
        onConfirm={handleDeleteListing}>
        <p>Are you sure you want to delete this listing? This cannot be undone.</p>
      </Alert>
    </div>
  );
}

export default UpdatePositionSection;
