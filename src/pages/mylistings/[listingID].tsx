import React from "react";
import { useRouter } from "next/router";
import LayoutSignedInEmployer from "../../components/LayoutSignedInEmployer";
import ApplicantsContainer from "../../components/ApplicantsContainer";
import UpdatePositionSection from "../../components/UpdatePositionSection";

export default function Position() {
  const router = useRouter();
  const { listingID } = router.query; //Use this to fetch data
  if (!listingID) {
    return null;
  }
  return (
    <LayoutSignedInEmployer>
      <div className="ml-64 mt-16 flex flex-row justify-between">
        <ApplicantsContainer listingId={listingID} />
        <UpdatePositionSection listingId={listingID as string} />
      </div>
    </LayoutSignedInEmployer>
  );
}
