import React from "react";
import {
  //Button,
  Card,
  Elevation,
} from "@blueprintjs/core";

interface Props {
  title: string;
  location: string;
  compensation: number;
  deadline: string;
}

export default function SmallListingContainer(props: Props) {
  return (
    <Card className="w-96" interactive={false} elevation={Elevation.TWO}>
      <div>
        <div className="flex justify-between">
          <p className="font-bold text-xl mb-2">{props.title}</p>
          <p>{props.deadline}</p>
        </div>
        <p>
          in <b>{props.location}</b>
        </p>
        <div className="flex justify-between">
          <p></p>
          <div className="font-bold">${props.compensation}</div>
        </div>
      </div>
    </Card>
  );
}
