import React from "react";
import {
  Button, //H5,
  InputGroup,
  NumericInput,
  Tooltip,
  Position,
  TextArea,
  Intent,
} from "@blueprintjs/core";
import * as databaseService from "../services/firestore";
import { useUser } from "../services/auth/userContext";
import { AppToaster } from "../components/Toaster";
import * as storage from "../services/storage";
import Spinner from "../components/Spinner";

export default function EmployerProfile() {
  const [profileDataState, setProfileDataState] = React.useState({
    companyName: "",
    address: "",
    numOfEmployees: 0,
    description: "",
    sector: "",
  });
  const [loadingData, setLoadingData] = React.useState(true);
  const { user, loadingUser } = useUser();
  const [profilePicUrl, setProfilePicUrl] = React.useState(storage.standardPhoto);
  const uid = user?.uid ?? null;
  const hiddenFileInput = React.useRef(null);

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

  const showUpdateToaster = () => {
    AppToaster.show({
      message: "Profile Saved.",
      icon: "tick-circle",
      intent: Intent.SUCCESS,
    });
  };

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
  React.useEffect(() => {
    (async () => {
      if (user) {
        try {
          const employerProfileData = await databaseService.getEmployerProfile(uid);

          if (employerProfileData) {
            const { companyName, address, numOfEmployees, description, sector } = employerProfileData;
            setProfileDataState({ companyName, address, numOfEmployees, description, sector });

            const newProfilePic = await storage.getProfilePictureUrl(uid);
            if (newProfilePic) {
              setProfilePicUrl(newProfilePic);
            }
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
        await databaseService.saveEmployerProfile(profileDataState, uid)();
        showUpdateToaster();
      } catch (err) {
        console.log(err);
      }
    })();
  };
  if (loadingUser || !user) {
    return null;
  } else if (loadingData && user) {
    return <Spinner size={250}></Spinner>;
  }

  return (
    <>
      <input type="file" ref={hiddenFileInput} onChange={handleUploadChange} className="hidden" />
      <p className="text-5xl font-light mt-8 ml-48">Company Profile</p>
      <div className="flex flex-col items-start justify-start space-y-4 ml-40 mt-8">
        <div className="flex flex-row items-center justify-start">
          <div className="ml-24 flex flex-col justify-start ">
            <div className="flex flex-row justify-center">
              <Tooltip intent={Intent.NONE} content="Upload Photo" position={Position.TOP}>
                <Button icon="camera" className="bp3-minimal" onClick={handleUploadClick}></Button>
              </Tooltip>
              <Tooltip intent={Intent.NONE} content="Delete Photo" position={Position.TOP}>
                <Button icon="trash" className="bp3-minimal" onClick={handlePhotoDelete}></Button>
              </Tooltip>
            </div>
            <img className=" rounded-full h-36 w-36 max-w-none" src={profilePicUrl}></img>
          </div>

          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 ml-20">
              <div>
                <b>Company</b>
              </div>
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
                className=""
              />
            </div>

            <div className="flex flex-col space-y-2 ml-20">
              <div>
                <b>Industry</b>
              </div>
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
                className=""
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4 ml-40">
          <div className="flex flex-col space-y-2">
            <div className="mt-8">
              <b>Number of Employees</b>
            </div>
            <NumericInput
              allowNumericCharactersOnly={true}
              min={0}
              value={profileDataState.numOfEmployees}
              onValueChange={(number) => {
                setProfileDataState((prevState) => {
                  const newState = { ...prevState };
                  newState.numOfEmployees = number;
                  return newState;
                });
              }}></NumericInput>
          </div>
          <div className="flex flex-col space-y-2">
            <div>
              <b>Address</b>
            </div>
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
              className=""
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div>
              <b>Description</b>
            </div>
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
              className=""
            />
          </div>
          <div className="flex justify-center">
            <div
              className="cursor-pointer flex place-items-center rounded justify-center text-white bg-green-700 hover:bg-green-500 w-36 h-10"
              onClick={handleProfileUpdate}>
              <div className="text-lg">Update</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
