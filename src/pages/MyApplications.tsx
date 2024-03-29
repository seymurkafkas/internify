import React from "react";
import LayoutSignedInStudent from "../components/LayoutSignedInStudent";
import SmallListingContainerStudent from "../components/SmallListingContainerStudent";
import { useUser } from "../services/auth/userContext";
import * as DatabaseService from "../services/firestore";
import * as Navigation from "../services/navigation";
import { useRouter } from "next/router";
import Spinner from "../components/Spinner";
import { studentAuthCheck } from "../services/auth/AuthCheck";

export default function MyApplications() {
  const [loadingData, setLoadingData] = React.useState(true);
  const [myApplications, setMyApplications] = React.useState([]);
  const router = useRouter();
  const { user, loadingUser } = useUser();
  const userId = user?.uid ?? null;

  const isAuthChecked = studentAuthCheck({ user, loadingUser }, router);

  React.useEffect(() => {
    (async () => {
      if (userId) {
        try {
          const myListingsData = await DatabaseService.getMyApplications(userId);
          if (myListingsData) {
            setMyApplications(myListingsData);
          }
        } catch (err) {
          console.log(err);
        }
        setLoadingData(false);
      }
    })();
  }, [userId]);

  if (!isAuthChecked) {
    return null;
  }

  if (loadingData) {
    return (
      <LayoutSignedInStudent>
        <Spinner size={200}></Spinner>
      </LayoutSignedInStudent>
    );
  }

  function listingClickHandler(employerUid, listingId: string) {
    return function () {
      Navigation.goToViewListingPage(router, employerUid, listingId);
    };
  }

  return (
    <LayoutSignedInStudent>
      <div className="flex flex-col justify-start mt-16 ml-96">
        {myApplications.map((applicationItem, index) => {
          return (
            <SmallListingContainerStudent
              key={index}
              companyName={applicationItem.companyName}
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
