import React from "react";
import { Button, Card, Elevation } from "@blueprintjs/core";

export default function ApplicantItem(props) {
  return (
    <Card className="listing_item" interactive={true} elevation={Elevation.TWO}>
      <a href={props.url}>
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
      </a>
    </Card>
  );
}
