import React from "react";
import LayoutSignedInStudent from "../components/LayoutSignedInStudent";
import ProfileStudent from "../components/ProfileStudent";
import LayoutSignedInEmployer from "../components/LayoutSignedInEmployer";
import EmployerProfile from "../components/EmployerProfile";
import { useUser } from "../services/auth/userContext";
import styles from "../components/styles.module.css";

export default function Profile() {
  const { user, loadingUser } = useUser();
  if (!user || loadingUser) {
    return null;
  } else if (user?.userType === "Student") {
    return (
      <LayoutSignedInStudent>
        <ProfileStudent></ProfileStudent>
      </LayoutSignedInStudent>
    );
  } else if (user?.userType === "Employer") {
    return (
      <LayoutSignedInEmployer>
        <div>
          <EmployerProfile />
        </div>
      </LayoutSignedInEmployer>
    );
  }
}
