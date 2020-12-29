import React from "react";
import LayoutSignedInEmployer from "../components/LayoutSignedInEmployer";
import JobsListingDetailContainer from "../components/JobsListingDetailContainer";
import styles from "../components/styles.module.css";

export default function JobsListingDetail() {
  return (
    <LayoutSignedInEmployer>
      <div className={[styles.JobListingDetailPage, "flex", "flex-row", "justify-between"].join(" ")}>
        <JobsListingDetailContainer />
      </div>
    </LayoutSignedInEmployer>
  );
}
