import React from "react";
import { useUser } from "../services/auth/userContext";
import * as DatabaseService from "../services/firestore";
import * as Navigation from "../services/navigation";
import { useRouter } from "next/router";
import SmallConcludedApplicationContainer from "./SmallConcludedApplicationContainer";
import Spinner from "./Spinner";

export default function MyConcludedApplications() {
  const [loadingData, setLoadingData] = React.useState(true);
  const [myApplications, setMyApplications] = React.useState({ approved: [], rejected: [] });
  const router = useRouter();
  const { user, loadingUser } = useUser();
  const userId = user?.uid ?? null;
  console.log(myApplications);
  React.useEffect(() => {
    (async () => {
      if (userId) {
        try {
          const myApprovedListingsData = await DatabaseService.getMyApprovedApplications(userId);
          console.log(myApprovedListingsData);
          if (myApprovedListingsData) {
            setMyApplications((myPrevApplications) => {
              const newApplications = { ...myPrevApplications };
              newApplications.approved = myApprovedListingsData;
              return newApplications;
            });
          }

          const myRejectedListingsData = await DatabaseService.getMyRejectedApplications(userId);
          if (myRejectedListingsData) {
            setMyApplications((myPrevApplications) => {
              const newApplications = { ...myPrevApplications };
              newApplications.rejected = myRejectedListingsData;
              return newApplications;
            });
          }
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
    return <Spinner size={200}></Spinner>;
  }

  function listingClickHandler(employerUid) {
    return function () {
      Navigation.goToViewEmployerPage(router, employerUid);
    };
  }

  return (
    <div className="flex flex-col justify-start mt-16 ml-96">
      <div>
        {" "}
        <div>Approved</div>
        {myApplications.approved.length > 0 &&
          myApplications.approved.map((applicationItem, index) => {
            return (
              <SmallConcludedApplicationContainer
                approved={true}
                key={index}
                companyName={applicationItem.companyName}
                navigateToLink={listingClickHandler(applicationItem.employerUid)}
                applicationCount={applicationItem.applicationCount}
                title={applicationItem.title}
                location={applicationItem.location}
                deadline={applicationItem.deadline}
                compensation={applicationItem.compensation}></SmallConcludedApplicationContainer>
            );
          })}
      </div>
      <div>
        <div>Rejected</div>
        {myApplications.rejected.length > 0 &&
          myApplications.rejected.map((applicationItem, index) => {
            return (
              <SmallConcludedApplicationContainer
                approved={false}
                key={index}
                companyName={applicationItem.companyName}
                navigateToLink={listingClickHandler(applicationItem.employerUid)}
                applicationCount={applicationItem.applicationCount}
                title={applicationItem.title}
                location={applicationItem.location}
                deadline={applicationItem.deadline}
                compensation={applicationItem.compensation}></SmallConcludedApplicationContainer>
            );
          })}
      </div>
    </div>
  );
}
