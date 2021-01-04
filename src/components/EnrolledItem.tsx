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
  companyName?: string;
  positionName?: string;
  range: DateRange;
  experienceChangeHandler?: any;
  institutionName?: string;
  degreeName?: string;
  educationChangeHandler?: any;
  experience: boolean;
}

export default function EnrolledItem(props: Props) {
  return (
    <>
      <input
        className="bp3-input .modifier"
        value={props.experience ? props.companyName : props.institutionName}
        type="text"
        placeholder={props.experience ? "Company" : "Institution"}
        onChange={
          props.experience
            ? props.experienceChangeHandler("companyName")
            : props.educationChangeHandler("institutionName")
        }
        dir="auto"
      />
      <input
        className="bp3-input .modifier"
        value={props.experience ? props.positionName : props.degreeName}
        type="text"
        onChange={
          props.experience ? props.experienceChangeHandler("positionName") : props.educationChangeHandler("degreeName")
        }
        placeholder={props.experience ? "Position" : "Degree"}
        dir="auto"
      />
      <DateRangeInput
        formatDate={(date) => monthNames[date.getMonth()] + " " + date.getFullYear()}
        onChange={props.experience ? props.experienceChangeHandler("range") : props.educationChangeHandler("range")}
        parseDate={(str) => new Date(str)}
      />
    </>
  );
}
