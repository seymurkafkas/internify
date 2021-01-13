import React from "react";
import * as Navigation from "../services/navigation/index";
import { useRouter } from "next/router";
import { Button, Card, Elevation } from "@blueprintjs/core";
import styles from "./styles.module.css";

interface Props {
  studentUid: string;
  listingId: string;
  name: string;
  education: string;
  position: string;
  location: string;
  handleApprove: () => {};
  handleReject: () => {};
}

export default function ApplicantItem(props: Props) {
  const router = useRouter();

  function handleClick() {
    Navigation.goToViewApplicantPage(router, props.studentUid);
  }

  return (
    <Card className="listing_item" interactive={true} elevation={Elevation.TWO}>
      <div>
        <p>{props.name}</p>
        <p>
          Previous Work: <b>{props.position}</b>
        </p>

        <p>{props.location}</p>
        <br />
        <p>Education: {props.education}</p>
        <div className="flex justify-between">
          <Button onClick={props.handleApprove} className={["bp3-outlined", styles.btnPill].join(" ")}>
            Approve
          </Button>
          <Button onClick={props.handleReject} className={["bp3-outlined", styles.btnPillReject].join(" ")}>
            Reject
          </Button>
          <Button onClick={handleClick} className="w-16 bp3-outlined">
            View
          </Button>
        </div>
      </div>
    </Card>
  );
}
