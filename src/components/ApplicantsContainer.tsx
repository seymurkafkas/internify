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
      title: "Data Engineer",
      date: "12/13/2020",
      company: "SomeSoft Tech",
      location: "İstanbul, Turkey",
      applicants: 3,
      description:
        "3rd or 4th year student to handle our data ware house operations. Possible tools are Python, numpy, PyTorch etc. lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet ... ",
      compensation: "2000TL",
      url: "withid2",
    },
    {
      title: "Data Manager",
      date: "12/23/2020",
      company: "SomeSoft Tech",
      location: "İstanbul, Turkey",
      applicants: 8,
      description:
        "3rd or 4th year student to handle our data ware house operations. Possible tools are Python, numpy, PyTorch etc. lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet ... ",
      compensation: "1600TL",
      url: "withid4",
    },
  ];

  return (
    <div>
      <h2 className={[styles.titleLarge, styles.mb16].join(" ")}>Applicants</h2>
      <div className={styles.ApplicantsContainer}>
        <AplicantList items={items} />
      </div>
    </div>
  );
}
