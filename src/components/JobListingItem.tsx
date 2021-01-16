import React from "react";
import {
  //Button,
  Card,
  Elevation,
} from "@blueprintjs/core";
import * as Navigation from "../services/navigation";
import { useRouter } from "next/router";
import { stringifyDate } from "../util/date";
import styles from "./styles.module.css";

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
  type: string;
  score: number;
}

function Stars(props: any) {
  const starCount = Math.abs(props.score / 26 + 1);
  const starItems = [];
  for (let i = 0; i < starCount; i++) {
    starItems.push(<span>★</span>);
  }
  return <span className={styles.star}>{starItems}</span>;
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
          <p className="text-xl font-bold">
            {props?.title} {props.type === "recommended" && <Stars score={props.score} />}
          </p>

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
