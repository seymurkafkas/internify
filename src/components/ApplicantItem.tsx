import React from "react";
import * as Navigation from "../services/navigation/index";
import { useRouter } from "next/router";
import { Button, Card, Elevation } from "@blueprintjs/core";

interface Props {
  uid: string;
  name: string;
  education: string;
  position: string;
  location: string;
}

export default function ApplicantItem(props: Props) {
  const router = useRouter();
  function handleClick() {
    Navigation.goToViewApplicantPage(router, props.uid);
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
          <p>Date applied</p>
          <Button onClick={handleClick} className="w-16 bp3-outlined">
            View
          </Button>
        </div>
      </div>
    </Card>
  );
}
