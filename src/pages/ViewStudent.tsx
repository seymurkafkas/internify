import React from "react";
import LayoutSignedInEmployer from "../components/LayoutSignedInEmployer";
import ViewStudentContainer from "../components/ViewStudentContainer";
import styles from "../components/styles.module.css";

export default function Position() {
  return (
    <LayoutSignedInEmployer>
      <div className={[styles.ViewStudentPage, "flex", "flex-row", "justify-between"].join(" ")}>
        <ViewStudentContainer />
      </div>
    </LayoutSignedInEmployer>
  );
}
