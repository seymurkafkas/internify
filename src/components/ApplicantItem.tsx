import React from "react";
import * as Navigation from "../services/navigation/index";
import { useRouter } from "next/router";
import { Button, Card, Position, Tooltip, Intent, Alert } from "@blueprintjs/core";
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
  }, [props.studentUid]);
  return (
    <div className="flex flex-row items-center mt-11">
      <Card className="w-160 border-xl" interactive={true}>
        <div className="flex flex-row space-x-2">
          <img className=" rounded-full h-28 w-28 mr-3" src={profilePicUrl}></img>
          <div>
            <p className="text-xl">
              <b>{props.name}</b>
            </p>
            <br />
            <p>
              Previous Work: <b>{props.position}</b>
            </p>

            <p>
              in <b>{props.location}</b>
            </p>
            <p>
              Education: <b>{props.education}</b>
            </p>
          </div>
        </div>
      </Card>
      <div className="ml-4 flex flex-col space-y-2">
        <Tooltip intent={Intent.SUCCESS} content="Approve" position={Position.RIGHT}>
          <Button
            onClick={() => {
              setIsApproveDialogOpen(true);
            }}
            className="bp3-minimal"
            icon="endorsed"></Button>
        </Tooltip>
        <Tooltip intent={Intent.DANGER} content="Reject" position={Position.RIGHT}>
          <Button
            onClick={() => {
              setIsDialogOpen(true);
            }}
            className="bp3-minimal"
            icon="delete"></Button>
        </Tooltip>
        <Tooltip content="View Profile" position={Position.RIGHT}>
          <Button onClick={handleClick} className="bp3-minimal" icon="eye-open"></Button>
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
