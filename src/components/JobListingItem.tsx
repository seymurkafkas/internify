import React from "react";
import { Text, Card, Elevation } from "@blueprintjs/core";
import * as Navigation from "../services/navigation";
import { useRouter } from "next/router";
import { stringifyDate } from "../util/date";

interface Props {
  listingId: string;
  employerUid: string;
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
        Navigation.goToViewListingPage(router, props.employerUid, props.listingId);
      }}
      className="listing_item"
      interactive={true}
      elevation={Elevation.TWO}>
      <div>
        <div className="flex justify-between mb-2">
          <Text className="text-3xl font-bold w-96" ellipsize={true}>
            {props?.title}
          </Text>
          <p>{stringifyDate(props?.deadline?.toDate() ?? null)}</p>
        </div>
        <Text className="w-96" ellipsize={true}>
          {props?.companyName}
        </Text>
        <Text className="w-96" ellipsize={true}>
          in <b>{locationString}</b>
        </Text>
        <br />
        <Text className="w-96" ellipsize={true}>
          {props.description}
        </Text>
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
