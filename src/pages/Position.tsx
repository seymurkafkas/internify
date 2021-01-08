import React from "react";
import LayoutSignedInEmployer from "../components/LayoutSignedInEmployer";
import ApplicantsContainer from "../components/ApplicantsContainer";
import UpdatePositionSection from "../components/UpdatePositionSection";

export default function Position() {
  return (
    <LayoutSignedInEmployer>
      <div className="ml-64 mt-16 flex flex-row justify-between">
        <ApplicantsContainer />
        <UpdatePositionSection />
      </div>
    </LayoutSignedInEmployer>
  );
}
