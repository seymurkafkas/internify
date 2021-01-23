import { useRouter } from "next/router";
import React from "react";
import JobsListingDetailContainer from "../../../components/JobsListingDetailContainer";
import LayoutSignedInStudent from "../../../components/LayoutSignedInStudent";
import { useUser } from "../../../services/auth/userContext";
import { studentAuthCheck } from "../../../services/auth/AuthCheck";

export default function Listing() {
  const router = useRouter();
  const { listingId, employerUid } = router.query; //Use this to fetch data
  const user = useUser();

  const isAuthChecked = studentAuthCheck(user, router);

  if (!listingId || !employerUid || !isAuthChecked) {
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
