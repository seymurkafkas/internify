import React from "react";
import LayoutSignedInStudent from "../components/LayoutSignedInStudent";
import SmallListingContainerStudent from "../components/SmallListingContainerStudent";
import { useUser } from "../services/auth/userContext";
import * as DatabaseService from "../services/firestore";
import * as Navigation from "../services/navigation";
import { useRouter } from "next/router";

export default function MyApplications() {
  const [loadingData, setLoadingData] = React.useState(true);
  const [myApplications, setMyApplications] = React.useState([]);
  const router = useRouter();
  const { user, loadingUser } = useUser();
  const userId = user?.uid ?? null;

  React.useEffect(() => {
    (async () => {
      if (userId) {
        try {
          const myListingsData = await DatabaseService.getMyApplications(userId);
          setMyApplications(myListingsData);
        } catch (err) {
          console.log(err);
        }
        setLoadingData(false);
      }
    })();
  }, [userId]);

  if (loadingUser) {
    return null;
  }

  if (loadingData) {
    return (
      <LayoutSignedInStudent>
        <div>loading</div>;
      </LayoutSignedInStudent>
    );
  }

  function listingClickHandler(employerUid, listingID: string) {
    return function () {
      Navigation.goToViewListingPage(router, employerUid, listingID);
    };
  }

  return (
    <LayoutSignedInStudent>
      <div className="flex flex-col justify-start mt-16 ml-96">
        {myApplications.map((applicationItem, index) => {
          return (
            <SmallListingContainerStudent
              key={index}
              navigateToLink={listingClickHandler(applicationItem.employerUid, applicationItem.listingId)}
              applicationCount={applicationItem.applicationCount}
              title={applicationItem.title}
              location={applicationItem.location}
              deadline={applicationItem.deadline}
              compensation={applicationItem.compensation}></SmallListingContainerStudent>
          );
        })}
      </div>
    </LayoutSignedInStudent>
  );
}
