import React from "react";
import {
  //Button,
  Card,
  Elevation,
} from "@blueprintjs/core";
import * as Navigation from "../services/navigation";
import { useRouter } from "next/router";
import { stringifyDate } from "../util/date";

interface Props {
  listingId: string;
  employerId: string;
  title: string;
  deadline: firebase.default.firestore.Timestamp | null;
  companyName: string;
  location: { city: string; country: string };
  description: string;
  applicationCount: number;
  compensation: number;
}

export default function JobListingItem(props: Props) {
  const router = useRouter();

  let locationString = "Undeclared";

  if (props.location.city && props.location.country) {
    locationString = `${props.location.city}, ${props.location.country}`;
  } else {
    locationString = `${props.location?.city ?? ""}${props.location?.country ?? ""}`;
  }

  return (
    <Card
      onClick={() => {
        Navigation.goToViewListingPage(router, props.employerId, props.listingId);
      }}
      className="listing_item"
      interactive={true}
      elevation={Elevation.TWO}>
      <div>
        <div className="flex justify-between mb-2">
          <p className="text-3xl font-bold">{props?.title}</p>
          <p>{stringifyDate(props?.deadline?.toDate() ?? null)}</p>
        </div>
        <p>{props?.companyName}</p>
        <p>
          in <b>{locationString}</b>
        </p>
        <br />
        <p>{props.description}</p>
        <div className="flex justify-between mt-4">
          <p>
            <b>Applicants: {props.applicationCount}</b>
          </p>
          <p className="font-bold">${props.compensation}</p>
        </div>
      </div>
    </Card>
  );
}
