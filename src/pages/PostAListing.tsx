import React from "react";
import LayoutSignedInEmployer from "../components/LayoutSignedInEmployer";
import CreatePositionSection from "../components/CreatePositionSection";
import { employerAuthCheck } from "../services/auth/AuthCheck";
import { useUser } from "../services/auth/userContext";
import { useRouter } from "next/router";

export default function PostAListing() {
  const user = useUser();
  const router = useRouter();

  const isAuthChecked = employerAuthCheck(user, router);

  if (!isAuthChecked) {
    return null;
  }
  return (
    <LayoutSignedInEmployer>
      <div className="ml-64 mt-16 flex flex-row justify-between">
        <CreatePositionSection />
      </div>
    </LayoutSignedInEmployer>
  );
}
