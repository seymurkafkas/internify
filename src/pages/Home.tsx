import React from "react";
import LayoutSignedInStudent from "../components/LayoutSignedInStudent";
import LayoutSignedInEmployer from "../components/LayoutSignedInEmployer";
import { useUser } from "../services/auth/userContext";
import MyConcludedApplications from "../components/MyConcludedApplications";

export default function Login() {
  const user = useUser();
  let content;
  const typeOfUser = user?.user?.userType ?? null;
  if (typeOfUser === "Student") {
    content = (
      <LayoutSignedInStudent>
        <MyConcludedApplications></MyConcludedApplications>
      </LayoutSignedInStudent>
    );
  } else if (typeOfUser === "Employer") {
    content = (
      <LayoutSignedInEmployer>
        <div />
      </LayoutSignedInEmployer>
    );
  } else {
    content = null;
  }
  return content;
}
