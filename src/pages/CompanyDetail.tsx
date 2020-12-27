import React from "react";
import LayoutSignedInEmployer from "../components/LayoutSignedInEmployer";
import CompanyDetailContainer from "../components/CompanyDetailContainer";
import styles from "../components/styles.module.css";

export default function CompanyDetail() {
  return (
    <LayoutSignedInEmployer>
      <div className={[styles.CompanyDetailPage].join(" ")}>
        <CompanyDetailContainer />
      </div>
    </LayoutSignedInEmployer>
  );
}
