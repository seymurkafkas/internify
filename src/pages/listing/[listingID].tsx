import { useRouter } from "next/router";
import React from "react";
import JobsListingDetailContainer from "../../components/JobsListingDetailContainer";
import LayoutSignedInStudent from "../../components/LayoutSignedInStudent";
export default function Post() {
  const router = useRouter();
  const { listingID } = router.query; //Use this to fetch data
  if (!listingID) {
    return null;
  }
  return (
    <LayoutSignedInStudent>
      <p>Listing: {listingID}</p>
      <JobsListingDetailContainer></JobsListingDetailContainer>
    </LayoutSignedInStudent>
  );
}
