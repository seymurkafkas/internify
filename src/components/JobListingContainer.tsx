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
    <div className="w-160">
      <div className={[styles.ListContainer].join(" ")}>
        <JobList items={items} />
      </div>
    </div>
  );
}
