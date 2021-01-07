import React from "react";

interface Props {
  navigateToLink: () => void;
}

export default function SmallListingContainer(props: Props) {
  return (
    <div onClick={props.navigateToLink}>
      <div>props.title</div>
      <div>props.location</div>
      <div>props.dateEnd</div>
      <div>props.applicated</div>
    </div>
  );
}
