import React from "react";
import * as databaseService from "../services/firestore";
import { useUser } from "../services/auth/userContext";
import SmallListingContainerStudent from "./SmallListingContainerStudent";
import * as Navigation from "../services/navigation";
import { useRouter } from "next/router";
import * as Storage from "../services/storage";

interface Props {
  employerUid: string;
}

export default function EmployerDataContainer(props: Props) {
  const [profileDataState, setProfileDataState] = React.useState({
    companyName: "",
    address: "",
    numOfEmployees: "",
    description: "",
    sector: "",
  });
  const [loadingData, setLoadingData] = React.useState(true);
  const [picUrl, setPicUrl] = React.useState(Storage.standardPhoto);
  const [loadingListingData, setLoadingListingData] = React.useState(true);
  const [noDataAvailable, setNoDataAvailable] = React.useState(true);
  const [listings, setListings] = React.useState([]);
  const { user, loadingUser } = useUser();
  const employerUid = props.employerUid;
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      if (user && employerUid) {
        try {
          const employerProfileData = await databaseService.getEmployerProfile(employerUid);

          if (employerProfileData) {
            const { companyName, address, numOfEmployees, description, sector } = employerProfileData;
            setProfileDataState({ companyName, address, numOfEmployees, description, sector });
            setNoDataAvailable(false);
          } else {
            setNoDataAvailable(true);
          }
        } catch (err) {
          console.log(err);
        }
        setLoadingData(false);
      }
    })();
  }, [user, employerUid]);

  React.useEffect(() => {
    (async () => {
      if (user && employerUid && !noDataAvailable) {
        try {
          const listingData = await databaseService.getEmployerListings(employerUid);

          setListings(listingData);
          const profilePicUrl = await Storage.getProfilePictureUrl(employerUid);
          if (profilePicUrl) {
            setPicUrl(profilePicUrl);
          }
        } catch (err) {
          console.log(err);
        }
        setLoadingListingData(false);
      }
    })();
  }, [user, employerUid, noDataAvailable]);

  function listingClickHandler(employerUid: string, listingId: string) {
    return function () {
      Navigation.goToViewListingPage(router, employerUid, listingId);
    };
  }

  if (loadingUser || !user) {
    return null;
  } else if (loadingData && user) {
    return <div>Loading ...</div>;
  } else if (noDataAvailable) {
    return <div>ERROR! No Data</div>;
  }

  return (
    <div className="flex flex-row justify-between mr-128 mt-16 ml-64">
      <div>
        <div className="flex content-center space-x-8">
          <img className="rounded-full h-36 w-36" src={picUrl}></img>
          <div className="flex flex-col mt-8">
            <p className="text-xl">{profileDataState.sector} Sector of</p>
            <p className="text-5xl font-bold">{profileDataState.companyName}</p>
          </div>
        </div>
        <div className="flex flex-col mt-8 space-y-4 w-128">
          <div className="font-bold text-lg">Number of Employees: {profileDataState.numOfEmployees}</div>
          <div className="flex items-center text-lg space-x-2">
            <div className="font-bold">Address:</div>
            <div>{profileDataState.address}</div>
          </div>
          <div>
            <div className="font-bold text-lg">Description:</div>
            <div>{profileDataState.description}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        {loadingListingData ? (
          <div>loading</div>
        ) : (
          <div>
            <div className="text-3xl font-bold mt-8 mb-6">Posted Listings</div>
            {listings.map((applicationItem, index) => {
              return (
                <SmallListingContainerStudent
                  key={index}
                  companyName={profileDataState.companyName}
                  navigateToLink={listingClickHandler(employerUid, applicationItem.listingId)}
                  applicationCount={applicationItem.applicationCount}
                  title={applicationItem.title}
                  location={applicationItem.location}
                  deadline={applicationItem.deadline}
                  compensation={applicationItem.compensation}></SmallListingContainerStudent>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
