import React from "react";
import { useRouter } from "next/router";
import LayoutSignedInEmployer from "../../components/LayoutSignedInEmployer";
import ApplicantsContainer from "../../components/ApplicantsContainer";
import UpdatePositionSection from "../../components/UpdatePositionSection";

export default function Position() {
  const router = useRouter();
  const { mylistingid } = router.query; //Use this to fetch data
  if (!mylistingid) {
    return null;
  }
  return (
    <LayoutSignedInEmployer>
      <div className="ml-60 mt-16 flex flex-row justify-between">
        <ApplicantsContainer listingId={mylistingid} />
        <UpdatePositionSection listingId={mylistingid as string} />
      </div>
    </LayoutSignedInEmployer>
  );
}
