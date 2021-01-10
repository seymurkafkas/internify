import React from "react";
import {
  Button, //H5,
  InputGroup,
  TextArea,
  // Switch,
} from "@blueprintjs/core";
import * as databaseService from "../services/firestore";
import { useUser } from "../services/auth/userContext";

export default function EmployerProfile() {
  const [profileDataState, setProfileDataState] = React.useState({
    companyName: "",
    address: "",
    numOfEmployees: "",
    description: "",
    sector: "",
  });
  const [loadingData, setLoadingData] = React.useState(true);
  const { user, loadingUser } = useUser();
  const uid = user?.uid ?? null;

  React.useEffect(() => {
    (async () => {
      if (user) {
        try {
          const employerProfileData = await databaseService.getEmployerProfile(uid);

          if (employerProfileData) {
            const { companyName, address, numOfEmployees, description, sector } = employerProfileData;
            setProfileDataState({ companyName, address, numOfEmployees, description, sector });
          }
        } catch (err) {
          console.log(err);
        }
        setLoadingData(false);
      }
    })();
  }, [user, uid]);

  const handleProfileUpdate = () => {
    (async () => {
      try {
        console.log(profileDataState, uid);
        await databaseService.saveEmployerProfile(profileDataState, uid)();
      } catch (err) {
        console.log(err);
      }
    })();
  };
  if (loadingUser || !user) {
    return null;
  } else if (loadingData && user) {
    return <div>Loading ...</div>;
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
            onChange={(event) => {
              setProfileDataState((prevState) => {
                return {
                  ...prevState,
                  companyName: event.target.value,
                };
              });
            }}
            defaultValue={profileDataState.companyName}
            placeholder="Title"
            className="w-64"
          />
        </div>
        <div className="flex flex-col space-y-2 ml-44">
          <div>Sector</div>
          <InputGroup
            placeholder={"Type to edit"}
            onChange={(event) => {
              setProfileDataState((prevState) => {
                return {
                  ...prevState,
                  sector: event.target.value,
                };
              });
            }}
            defaultValue={profileDataState.sector}
            className="w-64"
          />
        </div>
        <div className="flex flex-row space-x-4">
          <div className="mt-8">Number of employees</div>
          <InputGroup
            placeholder={"Type to edit"}
            onChange={(event) => {
              setProfileDataState((prevState) => {
                return {
                  ...prevState,
                  numOfEmployees: event.target.value,
                };
              });
            }}
            defaultValue={profileDataState.numOfEmployees}
            className="w-12 mt-6 h-4"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <div>Address</div>
          <TextArea
            placeholder={"Type to edit"}
            onChange={(event) => {
              setProfileDataState((prevState) => {
                return {
                  ...prevState,
                  address: event.target.value,
                };
              });
            }}
            defaultValue={profileDataState.address}
            className="w-128 max-h-32"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <div>Description</div>
          <TextArea
            placeholder={"Type to edit"}
            onChange={(event) => {
              setProfileDataState((prevState) => {
                return {
                  ...prevState,
                  description: event.target.value,
                };
              });
            }}
            defaultValue={profileDataState.description}
            className="w-128 max-h-32"
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleProfileUpdate} className="bp3-outlined">
            Update
          </Button>
        </div>
      </div>
    </>
  );
}
