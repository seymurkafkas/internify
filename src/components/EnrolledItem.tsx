import React from "react";

import { DateRange, DateRangeInput } from "@blueprintjs/datetime";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
interface Props {
  institutionName: string;
  positionName: string;
  range: DateRange;
  educationChangeHandler: any;
  key: number;
}

export default function EnrolledItem(props: Props) {
  return (
    <>
      <input
        className="bp3-input .modifier"
        value={props.institutionName}
        type="text"
        placeholder="Institution"
        onChange={props.educationChangeHandler("institutionName")}
        dir="auto"
      />
      <input
        className="bp3-input .modifier"
        value={props.positionName}
        type="text"
        onChange={props.educationChangeHandler("positionName")}
        placeholder="Position"
        dir="auto"
      />
      <DateRangeInput
        formatDate={(date) => monthNames[date.getMonth()] + " " + date.getFullYear()}
        onChange={props.educationChangeHandler("range")}
        parseDate={(str) => new Date(str)}
      />
    </>
  );
}
