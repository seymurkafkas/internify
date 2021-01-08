import React from "react";
import LayoutSignedInEmployer from "../components/LayoutSignedInEmployer";
import CreatePositionSection from "../components/CreatePositionSection";

export default function PostAListing() {
  return (
    <LayoutSignedInEmployer>
      <div className="ml-64 mt-16 flex flex-row justify-between">
        <CreatePositionSection />
      </div>
    </LayoutSignedInEmployer>
  );
}
