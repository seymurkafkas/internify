import React from "react";

import { DateRangeInput } from "@blueprintjs/datetime";

export default function EnrolledItem() {
  return (
    <>
      <div>School</div>
      <DateRangeInput
        formatDate={(date) => date.toLocaleString()}
        onChange={() => {}}
        parseDate={(str) => new Date(str)}
      />
    </>
  );
}
