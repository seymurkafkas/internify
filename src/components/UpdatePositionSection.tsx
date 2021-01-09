import React, { useState } from "react";
import {
  Button,
  //Card,
  //Elevation,
  NumericInput,
  EditableText,
} from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
// import { ItemRenderer, MultiSelect } from "@blueprintjs/select";
import MultiSelectTag from "./MultiSelectTag";
import * as DatabaseService from "../services/firestore";
import { useUser } from "../services/auth/userContext";

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
  const { user, loadingUser } = useUser();
  const userId = user?.uid ?? null;
  const listingId = props.listingId;
  console.log(listingId, userId);
  React.useEffect(() => {
    (async function () {
      if (user) {
        try {
          const res = await DatabaseService.getListingData(userId, listingId);
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

  function updateListing() {
    (async function () {
      try {
        console.log(userId, listingId);
        await DatabaseService.updateListing(
          { title, description, requirements, compensation, deadline, location },
          userId,
          listingId
        );
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
  if (!user || loadingUser) {
    return null;
  }

  if (loadingData) {
    return <div>Loading</div>;
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
          <Button className="bp3-outlined w-32">Close Position</Button>
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
        <MultiSelectTag onReqUpdate={(req) => setRequirements(req)} />
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
        <Button onClick={updateListing} className="bp3-outlined">
          Update
        </Button>
      </div>
    </div>
  );
}

export default UpdatePositionSection;
