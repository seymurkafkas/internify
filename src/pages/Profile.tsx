import React from "react";
import LayoutSignedInStudent from "../components/LayoutSignedInStudent";
import ProfileStudent from "../components/ProfileStudent";
export default function Profile() {
  return (
    <LayoutSignedInStudent>
      <ProfileStudent></ProfileStudent>
    </LayoutSignedInStudent>
  );
}
