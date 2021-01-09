import React from "react";
import { stringifyDate } from "../util/date";

interface Props {
  navigateToLink: () => void;
  title: string;
  location: { city: string; country: string };
  deadline: any;
  applicationCount: number;
}

export default function SmallListingContainer(props: Props) {
  let locationString = "Undeclared";

  if (props.location.city && props.location.country) {
    locationString = `${props.location.city}, ${props.location.country}`;
  } else {
    locationString = `${props.location?.city ?? ""}${props.location?.country ?? ""}`;
  }

  return (
    <div onClick={props.navigateToLink} className="flex flex-row justify-start max-w-7xl">
      <div className="bg-red-100 max-w-sm w-72">{props.title}</div>
      <div className="bg-red-100 max-w-sm w-72">{locationString}</div>
      <div className="bg-red-100 max-w-sm w-72">{stringifyDate(props.deadline.toDate)}</div>
      <div className="bg-red-100 max-w-sm w-72">{props.applicationCount}</div>
    </div>
  );
}
