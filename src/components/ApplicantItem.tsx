import React from "react";
import * as Navigation from "../services/navigation/index";
import { useRouter } from "next/router";
import { Button, Card, Elevation } from "@blueprintjs/core";

interface Props {
  studentUid: string;
  listingId: string;
  name: string;
  education: string;
  position: string;
  location: string;
  handleApprove: () => {};
  handleReject: () => {};
}

export default function ApplicantItem(props: Props) {
  const router = useRouter();

  function handleClick() {
    Navigation.goToViewApplicantPage(router, props.studentUid);
  }

  return (
    <div className="flex flex-row items-center mt-11">
      <img
        className=" rounded-full h-28 w-28"
        src="https://www.nicepng.com/png/detail/60-609253_smile-shapers-men-smile-smiling-man-conditioning-black.png"></img>
      <Card className="w-96" interactive={true} elevation={Elevation.THREE}>
        <div>
          <p>
            <b>{props.name}</b>
          </p>
          <p>
            Previous Work: <b>{props.position}</b>
          </p>

          <p>
            in <b>{props.location}</b>
          </p>
          <br />
          <p>
            Education: <b>{props.education}</b>
          </p>
        </div>
      </Card>
      <div className="ml-4 flex flex-col justify-between ">
        <Button onClick={props.handleApprove} className="mt-4 bp3-minimal" icon="endorsed"></Button>
        <Button onClick={props.handleReject} className="mt-4 bp3-minimal" icon="delete"></Button>
        <Button onClick={handleClick} className=" mt-6 bp3-minimal" icon="eye-open"></Button>
      </div>
    </div>
  );
}
