import React from "react";
import LayoutSignedInEmployer from "../components/LayoutSignedInEmployer";
import SmallListingContainer from "../components/SmallListingContainer";
//import { useUser } from "../services/auth/userContext";
// import * as db from "../services/firestore";

export default function MyListingsPage() {
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

  React.useEffect(() => {});

  return (
    <LayoutSignedInEmployer>
      <div className="flex flex-row justify-start">
        {myListings.map((listingElement, index) => {
          return (
            <SmallListingContainer
              key={index}
              navigateToLink={() => {}}
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
