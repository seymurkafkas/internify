import React from "react";
import {
  //Button,
  Card,
  Elevation,
} from "@blueprintjs/core";
import { stringifyDate } from "../util/date";

interface Props {
  navigateToLink: () => void;
  title: string;
  location: { city: string; country: string };
  deadline: firebase.default.firestore.Timestamp;
  applicationCount: number;
  compensation: number;
}

export default function SmallListingContainer(props: Props) {
  let locationString = "Undeclared";

  if (props.location.city && props.location.country) {
    locationString = `${props.location.city}, ${props.location.country}`;
  } else {
    locationString = `${props.location?.city ?? ""}${props.location?.country ?? ""}`;
  }

  return (
    <Card onClick={props.navigateToLink} className="w-96 mb-8" interactive={true} elevation={Elevation.TWO}>
      <div>
        <div className="flex justify-between">
          <p className="font-bold text-xl mb-2">{props.title}</p>
          <p>{stringifyDate(props.deadline?.toDate() ?? null)}</p>
        </div>
        <p>
          in <b>{locationString}</b>
        </p>
        <div className="flex justify-between">
          <p>
            <b>Applicants: {props.applicationCount}</b>
          </p>
          <div>{props.compensation}</div>
        </div>
      </div>
    </Card>
  );
}
