import React from "react";
import * as Navigation from "../services/navigation/index";
import { useRouter } from "next/router";
import { Button, Card, Elevation, Position, Tooltip, Intent, Alert } from "@blueprintjs/core";
import * as Storage from "../services/storage";

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
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [profilePicUrl, setProfilePicUrl] = React.useState(Storage.standardPhoto);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = React.useState(false);
  function handleClick() {
    Navigation.goToViewApplicantPage(router, props.studentUid);
  }
  React.useEffect(() => {
    (async () => {
      const newProfilePic = await Storage.getProfilePictureUrl(props.studentUid);
      if (newProfilePic) {
        setProfilePicUrl(newProfilePic);
      }
    })();
  });
  return (
    <div className="flex flex-row items-center mt-11">
      <img className=" rounded-full h-28 w-28 mr-3" src={profilePicUrl}></img>
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
        <Tooltip intent={Intent.SUCCESS} content="Approve" position={Position.RIGHT}>
          <Button
            onClick={() => {
              setIsApproveDialogOpen(true);
            }}
            className="mt-4 bp3-minimal"
            icon="endorsed"></Button>
        </Tooltip>
        <Tooltip intent={Intent.DANGER} content="Reject" position={Position.RIGHT}>
          <Button
            onClick={() => {
              setIsDialogOpen(true);
            }}
            className="mt-4 bp3-minimal"
            icon="delete"></Button>
        </Tooltip>
        <Tooltip content="View Profile" position={Position.RIGHT}>
          <Button onClick={handleClick} className=" mt-6 bp3-minimal" icon="eye-open"></Button>
        </Tooltip>
      </div>

      <Alert
        className=""
        cancelButtonText="Cancel"
        confirmButtonText="Delete"
        icon="remove"
        intent={Intent.DANGER}
        isOpen={isDialogOpen}
        onCancel={() => {
          setIsDialogOpen(false);
        }}
        onConfirm={props.handleReject}>
        <p>
          Are you sure you want to reject <b>{props.name}</b> ?
        </p>
      </Alert>

      <Alert
        className=""
        cancelButtonText="Cancel"
        confirmButtonText="Approve"
        icon="confirm"
        intent={Intent.SUCCESS}
        isOpen={isApproveDialogOpen}
        onCancel={() => {
          setIsApproveDialogOpen(false);
        }}
        onConfirm={props.handleApprove}>
        <p>
          If you approve <b>{props.name}</b>, the listing will be closed. Do you wish to continue?
        </p>
      </Alert>
    </div>
  );
}
