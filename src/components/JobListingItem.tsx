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
  employerId: string;
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
        Navigation.goToViewListingPage(router, props.employerId, props.listingId);
      }}
      className="listing_item"
      interactive={true}
      elevation={Elevation.TWO}>
      <div>
        <div className="flex justify-between mb-2">
          <p className="text-3xl font-bold">{props.title}</p>
          <p>{props.date}</p>
        </div>
        <p>{props.company}</p>
        <p>
          in <b>{props.location}</b>
        </p>
        <br />
        <p>{props.description}</p>
        <div className="flex justify-between mt-4">
          <p>
            <b>Applicants: {props.applicants}</b>
          </p>
          <p className="font-bold">{props.compensation}</p>
        </div>
      </div>
    </Card>
  );
}
