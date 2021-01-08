import React from "react";

interface Props {
  navigateToLink: () => void;
  title: string;
  location: string;
  dateEnd: string;
  applicationCount: number;
}

export default function SmallListingContainer(props: Props) {
  return (
    <div onClick={props.navigateToLink}>
      <div>{props.title}</div>
      <div>{props.location}</div>
      <div>{props.dateEnd}</div>
      <div>{props.applicationCount}</div>
    </div>
  );
}
