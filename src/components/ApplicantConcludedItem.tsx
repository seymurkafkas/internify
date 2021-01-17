import React from "react";
import * as Navigation from "../services/navigation/index";
import { useRouter } from "next/router";
import { Button, Card, Position, Tooltip, Elevation } from "@blueprintjs/core";
import * as Storage from "../services/storage";

interface Props {
  studentUid: string;
  name: string;
  education: string;
  position: string;
  location: string;
}

export default function ApplicantConcludedItem(props: Props) {
  const router = useRouter();
  const [profilePicUrl, setProfilePicUrl] = React.useState(Storage.standardPhoto);
  function handleClick() {
    Navigation.goToViewApplicantPage(router, props.studentUid);
  }
  React.useEffect(() => {
    (async () => {
      try {
        const newProfilePic = await Storage.getProfilePictureUrl(props.studentUid);
        if (newProfilePic) {
          setProfilePicUrl(newProfilePic);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [props.studentUid]);
  return (
    <div className="flex flex-row items-center">
      <Card className="w-128" interactive={false} elevation={Elevation.TWO}>
        <div className="flex flex-row space-x-2">
          <img className=" rounded-full h-28 w-28 mr-3 max-w-none" src={profilePicUrl}></img>
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
        <Tooltip content="View Profile" position={Position.RIGHT}>
          <Button onClick={handleClick} className="bp3-minimal" icon="eye-open"></Button>
        </Tooltip>
      </div>
    </div>
  );
}
