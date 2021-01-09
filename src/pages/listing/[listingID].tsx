import { useRouter } from "next/router";
import React from "react";
import JobsListingDetailContainer from "../../components/JobsListingDetailContainer";
import LayoutSignedInStudent from "../../components/LayoutSignedInStudent";
export default function Listing() {
  const router = useRouter();
  const { listingID, employerID } = router.query; //Use this to fetch data
  if (!listingID || !employerID) {
    return null;
  }

  return (
    <LayoutSignedInStudent>
      <div className="mt-16 ml-96">
        <JobsListingDetailContainer listingId={listingID} employerId={employerID}></JobsListingDetailContainer>
      </div>
    </LayoutSignedInStudent>
  );
}
