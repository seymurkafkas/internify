import React from "react";
import styles from "./styles.module.css";
import { Button } from "@blueprintjs/core";

export default function JobsListingDetailContainer(props: any) {
  let item = props.item;
  item = {
    title: "Frontend developer",
    company: "Somesoft company",
    location: "Istanbul, Turkey",
    applicated: 32,
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac tortor id elit rhoncus bibendum ut vel est. Donec sed mi a nulla feugiat sagittis. Donec et luctus velit, in tincidunt sem. Quisque in justo non leo vestibulum accumsan nec ac nulla. Duis elementum nisi at ligula fringilla egestas. Etiam risus velit, sagittis nec nibh a, ullamcorper convallis tellus. Maecenas imperdiet ornare sodales. Pellentesque imperdiet fringilla lobortis. Mauris imperdiet lorem id elit lobortis malesuada vitae id ligula. Vestibulum quis libero augue. Sed tortor urna, pharetra ultrices blandit nec, consectetur nec tellus. ",
    requirements: ["Javascript", "C#", "MVC", "Jenkins"].join(", "),
    dateEnd: "3/7/2020",
    compensation: "6000TL",
  };
  return (
    <div className={styles.JobsListingDetailContainer}>
      <div>
        <div className="flex flex-row justify-between">
          <p className={styles.titleLarge}>{item.title}</p>
          <div className={["flex", "flex-row", "items-center"].join(" ")}>
            <p className={styles.mr32}>{item.compensation}</p>
            <Button className={["bp3-outlined", styles.btnPill].join(" ")}>
              <b>Apply</b>
            </Button>
          </div>
        </div>
        <div>
          <p>{item.company}</p>
          <p>
            in <b>{item.location}</b>
          </p>
          <p>
            <span>
              <b>{item.applicated}</b> applied.
            </span>
          </p>
        </div>
        <div>
          <br />
          <br />
          <br />
          <p className={styles.titleMed}>Description</p>
          <p>{item.description}</p>
          <br />
          <p className={styles.titleMed}>Requirements</p>
          <p>{item.requirements}</p>
          <br />
          <p>
            Apply before <b>{item.dateEnd}</b>
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
}
