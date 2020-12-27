import React from "react";
import LayoutSignedInEmployer from "../components/LayoutSignedInEmployer";
import ApplicantsContainer from "../components/ApplicantsContainer";
import CreatePositionSection from "../components/CreatePositionSection";
import styles from "../components/styles.module.css";

export default function Position() {
  return (
    <LayoutSignedInEmployer>
      <div className={[styles.ApplicantsPage, "flex", "flex-row", "justify-between"].join(" ")}>
        <ApplicantsContainer />
        <CreatePositionSection />
      </div>
    </LayoutSignedInEmployer>
  );
}
