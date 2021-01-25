import React from "react";
import LayoutSignedInEmployer from "../components/LayoutSignedInEmployer";
import SmallListingContainer from "../components/SmallListingContainer";
import { useUser } from "../services/auth/userContext";
import * as DatabaseService from "../services/firestore";
import * as Navigation from "../services/navigation";
import { useRouter } from "next/router";
import Spinner from "../components/Spinner";
import { employerAuthCheck } from "../services/auth/AuthCheck";

export default function MyListingsPage() {
  const [loadingData, setLoadingData] = React.useState(true);
  const [myListings, setMyListings] = React.useState([]);
  const router = useRouter();
  const { user, loadingUser } = useUser();

  const isAuthChecked = employerAuthCheck({ user, loadingUser }, router);

  const userId = user?.uid ?? null;

  React.useEffect(() => {
    (async () => {
      if (userId) {
        try {
          const myListingsData = await DatabaseService.getMyListings(userId);
          setMyListings(myListingsData);
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
      <LayoutSignedInEmployer>
        <Spinner size={200}></Spinner>;
      </LayoutSignedInEmployer>
    );
  }

  function listingClickHandler(listingId: string) {
    return function () {
      Navigation.goToMyPostedListingsPage(router, listingId);
    };
  }

  return (
    <LayoutSignedInEmployer>
      <div className="flex flex-col justify-start mt-16 ml-96">
        {myListings.map((listingElement, index) => {
          return (
            <SmallListingContainer
              key={index}
              navigateToLink={listingClickHandler(listingElement.listingId)}
              applicationCount={listingElement.applicationCount}
              title={listingElement.title}
              location={listingElement.location}
              deadline={listingElement.deadline}
              compensation={listingElement.compensation}></SmallListingContainer>
          );
        })}
      </div>
    </LayoutSignedInEmployer>
  );
}
