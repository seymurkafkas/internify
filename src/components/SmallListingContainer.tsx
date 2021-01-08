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
    <div onClick={props.navigateToLink} className="flex flex-row justify-start max-w-7xl">
      <div className="bg-red-100 max-w-sm w-72">{props.title}</div>
      <div className="bg-red-100 max-w-sm w-72">{props.location}</div>
      <div className="bg-red-100 max-w-sm w-72">{props.dateEnd}</div>
      <div className="bg-red-100 max-w-sm w-72">{props.applicationCount}</div>
    </div>
  );
}
