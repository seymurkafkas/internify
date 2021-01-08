import React from "react";
import LayoutSignedInEmployer from "../components/LayoutSignedInEmployer";
import SmallListingContainer from "../components/SmallListingContainer";
//import { useUser } from "../services/auth/userContext";
// import * as db from "../services/firestore";

export default function MyListingsPage() {
  const [myListings] = React.useState([]);

  React.useEffect(() => {});
  return (
    <LayoutSignedInEmployer>
      <div className="flex flex-row justify-start">
        {myListings.map(() => {
          <SmallListingContainer navigateToLink={() => {}}></SmallListingContainer>;
        })}
      </div>
    </LayoutSignedInEmployer>
  );
}
