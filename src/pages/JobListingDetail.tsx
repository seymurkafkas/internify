import React from "react";
import LayoutSignedInEmployer from "../components/LayoutSignedInEmployer";
import JobsListingDetailContainer from "../components/JobsListingDetailContainer";

export default function JobsListingDetail() {
  return (
    <LayoutSignedInEmployer>
      <div className="flex flex-row justify-between mt-16 ml-64">
        <JobsListingDetailContainer />
      </div>
    </LayoutSignedInEmployer>
  );
}
