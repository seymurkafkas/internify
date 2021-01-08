import React from "react";
import LayoutSignedInEmployer from "../components/LayoutSignedInEmployer";
import SmallListingContainer from "../components/SmallListingContainer";
// import { useUser } from "../services/auth/userContext";
// import * as db from "../services/firestore";
import * as Navigation from "../services/navigation";
import { useRouter } from "next/router";

export default function MyListingsPage() {
  //  const { user, loadingUser } = useUser();
  const [myListings] = React.useState([
    {
      title: "Frontend developer",
      location: "Istanbul, Turkey",
      applicationCount: 32,
      dateEnd: "3/7/2020",
    },
    {
      title: "Backend Developer ",
      location: "Istanbul, Turkey",
      applicationCount: 32,
      dateEnd: "3/7/2020",
    },
    {
      title: "Perdeci",
      location: "Istanbul, Turkey",
      applicationCount: 32,
      dateEnd: "3/7/2020",
    },
  ]);
  const router = useRouter();
  function listingClickHandler(listingID: string) {
    return function () {
      Navigation.goToMyPostedListingsPage(router, listingID);
    };
  }
  const myListingIDs = ["123", "2312", "413"];
  React.useEffect(() => {});

  return (
    <LayoutSignedInEmployer>
      <div className="flex flex-col justify-start">
        {myListings.map((listingElement, index) => {
          return (
            <SmallListingContainer
              key={index}
              navigateToLink={listingClickHandler(myListingIDs[index])}
              applicationCount={listingElement.applicationCount}
              title={listingElement.title}
              location={listingElement.location}
              dateEnd={listingElement.dateEnd}></SmallListingContainer>
          );
        })}
      </div>
    </LayoutSignedInEmployer>
  );
}
