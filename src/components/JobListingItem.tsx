import React from "react";
import {
  //Button,
  Card,
  Elevation,
} from "@blueprintjs/core";
import * as Navigation from "../services/navigation";
import { useRouter } from "next/router";

interface Props {
  listingId: string;
  title: string;
  date: string;
  company: string;
  location: string;
  description: string;
  applicants: string;
  compensation: string;
}

export default function JobListingItem(props: Props) {
  const router = useRouter();
  return (
    <Card
      onClick={() => {
        Navigation.goToViewListingPage(router, props.listingId);
      }}
      className="listing_item"
      interactive={true}
      elevation={Elevation.TWO}>
      <div>
        <div className="flex justify-between">
          <p>{props.title}</p>
          <p>{props.date}</p>
        </div>
        <p>{props.company}</p>
        <p>
          in <b>{props.location}</b>
        </p>
        <br />
        <p>{props.description}</p>
        <div className="flex justify-between">
          <p>
            <b>Applicants: {props.applicants}</b>
          </p>
          <p>{props.compensation}</p>
        </div>
      </div>
    </Card>
  );
}
