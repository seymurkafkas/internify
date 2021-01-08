import React from "react";
import LayoutSignedInEmployer from "../components/LayoutSignedInEmployer";
import ApplicantsContainer from "../components/ApplicantsContainer";
import UpdatePositionSection from "../components/UpdatePositionSection";
import styles from "../components/styles.module.css";

export default function Position() {
  return (
    <LayoutSignedInEmployer>
      <div className={[styles.ApplicantsPage, "flex", "flex-row", "justify-between"].join(" ")}>
        <ApplicantsContainer />
        <UpdatePositionSection />
      </div>
    </LayoutSignedInEmployer>
  );
}
