import { useRouter } from "next/router";
import React from "react";
import JobsListingDetailContainer from "../../../components/JobsListingDetailContainer";
import LayoutSignedInStudent from "../../../components/LayoutSignedInStudent";
export default function Listing() {
  const router = useRouter();
  const { listingId, employerUid } = router.query; //Use this to fetch data
  if (!listingId || !employerUid) {
    return null;
  }

  return (
    <LayoutSignedInStudent>
      <div className="mt-16 ml-64">
        <JobsListingDetailContainer listingId={listingId} employerUid={employerUid}></JobsListingDetailContainer>
      </div>
    </LayoutSignedInStudent>
  );
}
