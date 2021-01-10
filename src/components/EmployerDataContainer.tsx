import React from "react";
import * as databaseService from "../services/firestore";
import { useUser } from "../services/auth/userContext";
import SmallListingContainerStudent from "./SmallListingContainerStudent";
import * as Navigation from "../services/navigation";
import { useRouter } from "next/router";

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
  const [loadingListingData, setLoadingListingData] = React.useState(true);
  const [noDataAvailable, setNoDataAvailable] = React.useState(true);
  const [listings, setListings] = React.useState([]);
  const { user, loadingUser } = useUser();
  const employerId = props.employerUid;
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      if (user && employerId) {
        try {
          const employerProfileData = await databaseService.getEmployerProfile(employerId);

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
  }, [user, employerId]);

  React.useEffect(() => {
    (async () => {
      if (user && employerId && !noDataAvailable) {
        try {
          const listingData = await databaseService.getEmployerListings(employerId);

          setListings(listingData);
        } catch (err) {
          console.log(err);
        }
        setLoadingListingData(false);
      }
    })();
  }, [user, employerId, noDataAvailable]);

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
    <div>
      <div>
        <div>Company Name: {profileDataState.companyName}</div>
        <div>Number of Employees {profileDataState.numOfEmployees}</div>
        <div>Sector: {profileDataState.sector}</div>
        <p>Description:{profileDataState.description}</p>
        <p>Address:{profileDataState.address}</p>
      </div>
      <div className="flex flex-col justify-start mt-16 ml-96">
        {loadingListingData ? (
          <div>loading</div>
        ) : (
          <div>
            {listings.map((applicationItem, index) => {
              return (
                <SmallListingContainerStudent
                  key={index}
                  companyName={profileDataState.companyName}
                  navigateToLink={listingClickHandler(employerId, applicationItem.listingId)}
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
