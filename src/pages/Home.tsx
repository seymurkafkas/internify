import React from "react";
import LayoutSignedInStudent from "../components/LayoutSignedInStudent";
import LayoutSignedInEmployer from "../components/LayoutSignedInEmployer";
import { useUser } from "../services/auth/userContext";

export default function Login() {
  const user = useUser();
  let content;
  const typeOfUser = user?.user?.userType ?? null;
  if (typeOfUser === "Student") {
    content = (
      <LayoutSignedInStudent>
        <div />
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
