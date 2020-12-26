import React from "react";
import JobListingItem from "./JobListingItem";
import styles from "./styles.module.css";

function JobList(props: any) {
  const items = props.items;
  const listings = items.map((item, index) => {
    return <JobListingItem key={index} {...item} />;
  });
  return <>{listings}</>;
}

export default function JobListingContainer(props: any) {
  const items = props.items;
  return (
    <div className={styles.JobListingContainer}>
      <p className={[styles.mb16].join(" ")}>Results</p>
      <div className={[styles.ListContainer].join(" ")}>
        <JobList items={items} />
      </div>
    </div>
  );
}
