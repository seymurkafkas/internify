import React from "react";

import { DateRangeInput } from "@blueprintjs/datetime";

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

export default function EnrolledItem() {
  return (
    <>
      <div>School</div>
      <DateRangeInput
        formatDate={(date) => monthNames[date.getMonth()] + " " + date.getFullYear()}
        onChange={() => {}}
        parseDate={(str) => new Date(str)}
      />
    </>
  );
}
