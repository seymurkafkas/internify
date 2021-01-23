import React from "react";
import { useRouter } from "next/router";
import LayoutSignedInEmployer from "../../components/LayoutSignedInEmployer";
import ApplicantsContainer from "../../components/ApplicantsContainer";
import UpdatePositionSection from "../../components/UpdatePositionSection";
import { useUser } from "../../services/auth/userContext";
import { employerAuthCheck } from "../../services/auth/AuthCheck";

export default function Position() {
  const router = useRouter();
  const { mylistingid } = router.query; //Use this to fetch data
  const user = useUser();

  const isAuthChecked = employerAuthCheck(user, router);

  if (!mylistingid || !isAuthChecked) {
    return null;
  }
  return (
    <LayoutSignedInEmployer>
      <div className="ml-60 mt-16 flex flex-row justify-start">
        <ApplicantsContainer listingId={mylistingid} />
        <UpdatePositionSection listingId={mylistingid as string} />
      </div>
    </LayoutSignedInEmployer>
  );
}
