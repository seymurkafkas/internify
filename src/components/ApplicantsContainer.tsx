import React from "react";
import ApplicantItem from "./ApplicantItem";
import styles from "./styles.module.css";

function AplicantList(props: any) {
  const listings = props.items.map((item, index) => {
    return <ApplicantItem key={index} {...item} />;
  });
  return <>{listings}</>;
}

export default function ApplicantsContainer() {
  const items = [
    {
      name: "John Doe",
      dateApplied: "12/13/2020",
      position: "Data Engineer",
      location: "İstanbul, Turkey",
      education: "Istanbul Technical University",
      url: "withid2",
    },
    {
      name: "Mary Jane",
      dateApplied: "3/45/2020",
      position: "Data Manager",
      location: "İstanbul, Turkey",
      education: "Istanbul Technical University",
      url: "withid1",
    },
    {
      name: "Tom Holland",
      dateApplied: "3/2/2020",
      position: "Software Engineer",
      location: "İstanbul, Turkey",
      education: "Koc University",
      url: "withid4",
    },
    {
      name: "Rick Sanchez",
      dateApplied: "3/9/2020",
      position: "Embedded System Engineer",
      location: "İstanbul, Turkey",
      education: "Sabanci University",
      url: "withid5",
    },
  ];

  return (
    <div>
      <h2 className={[styles.titleLarge, styles.mb16].join(" ")}>Applicants</h2>
      <div className={styles.ListContainer}>
        <AplicantList items={items} />
      </div>
    </div>
  );
}
