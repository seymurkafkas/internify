import React from "react";
import { Text, Card, Elevation } from "@blueprintjs/core";
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
          <Text className="font-bold text-xl mb-2 w-56" ellipsize={true}>
            {props.title}
          </Text>
          <p>{stringifyDate(props.deadline?.toDate() ?? null)}</p>
        </div>
        <Text className="w-56" ellipsize={true}>
          in <b>{locationString}</b>
        </Text>
        <div className="flex justify-between">
          <p>
            <b>Applicants: {props.applicationCount}</b>
          </p>
          <div className="font-bold">${props.compensation}</div>
        </div>
      </div>
    </Card>
  );
}
