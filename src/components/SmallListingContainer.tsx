import React from "react";
/* 
interface Props {
  navigateToLink: () => void;
} */

export default function SmallListingContainer(props: any) {
  return (
    <div onClick={props.navigateToLink}>
      <div>props.title</div>
      <div>props.location</div>
      <div>props.dateEnd</div>
      <div>props.applicationCount</div>
    </div>
  );
}
