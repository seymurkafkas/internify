import React from "react";
import JobListingItem from "./JobListingItem";
import styles from "./styles.module.css";

function JobList(props: any) {
  const items = props.items;
  const listings = items.map((item, index) => {
    item.type = "recommended";
    return <JobListingItem key={index} {...item} />;
  });
  return <>{listings}</>;
}

export default function RecommendedListingContainer(props: any) {
  const items = props.items;
  return (
    <div className="w-160">
      <h2 className={[styles.titleLarge, styles.mb16].join(" ")}>Recommendations for you</h2>
      <p className={[styles.mb32].join(" ")}>
        These are collected for you! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, doloribus nemo ipsa
        quisquam voluptas, commodi non enim nulla quis?
      </p>
      <div className={[styles.ListContainer].join(" ")}>
        <JobList items={items} />
      </div>
    </div>
  );
}
