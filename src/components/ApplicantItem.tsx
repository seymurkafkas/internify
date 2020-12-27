import React from "react";
import {
  //Button,
  Card,
  Elevation,
} from "@blueprintjs/core";

interface Props {
  url: string;
  name: string;
  education: string;
  position: string;
  dateApplied: string;
  location: string;
}

export default function ApplicantItem(props: Props) {
  return (
    <Card className="listing_item" interactive={true} elevation={Elevation.TWO}>
      <div>
        <p>{props.name}</p>
        <p>
          for <b>{props.position}</b>
        </p>
        <p>{props.location}</p>
        <br />
        <p>Education: {props.education}</p>
        <div className="flex justify-between">
          <p>Date applied: {props.dateApplied}</p>
          <a href={props.url}>
            <b>View</b>
          </a>
        </div>
      </div>
    </Card>
  );
}
