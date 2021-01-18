import React from "react";
import { Text, Card, Elevation } from "@blueprintjs/core";

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
          <Text className="font-bold text-xl mb-2 w-56" ellipsize={true}>
            {props.title}
          </Text>
          <p>{props.deadline}</p>
        </div>
        <Text className="w-56" ellipsize={true}>
          in <b>{props.location}</b>
        </Text>
        <div className="flex justify-between">
          <p></p>
          <div className="font-bold">${props.compensation}</div>
        </div>
      </div>
    </Card>
  );
}
