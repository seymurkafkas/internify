import React from "react";
import LayoutSignedInEmployer from "../components/LayoutSignedInEmployer";
import CreatePositionSection from "../components/CreatePositionSection";
import styles from "../components/styles.module.css";

export default function PostAListing() {
  return (
    <LayoutSignedInEmployer>
      <div className={[styles.ApplicantsPage, "flex", "flex-row", "justify-between"].join(" ")}>
        <CreatePositionSection />
      </div>
    </LayoutSignedInEmployer>
  );
}
