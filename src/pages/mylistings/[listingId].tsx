import React from "react";
import { useRouter } from "next/router";
import LayoutSignedInEmployer from "../../components/LayoutSignedInEmployer";
import ApplicantsContainer from "../../components/ApplicantsContainer";
import UpdatePositionSection from "../../components/UpdatePositionSection";

export default function Position() {
  const router = useRouter();
  const { listingId } = router.query; //Use this to fetch data
  if (!listingId) {
    return null;
  }
  return (
    <LayoutSignedInEmployer>
      <div className="ml-64 mt-16 flex flex-row justify-between">
        <ApplicantsContainer listingId={listingId} />
        <UpdatePositionSection listingId={listingId as string} />
      </div>
    </LayoutSignedInEmployer>
  );
}
