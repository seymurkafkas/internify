import React from "react";
import LayoutSignedInStudent from "../components/LayoutSignedInStudent";
import ProfileStudent from "../components/ProfileStudent";
import LayoutSignedInEmployer from "../components/LayoutSignedInEmployer";
import EmployerProfile from "../components/EmployerProfile";
import { useUser } from "../services/auth/userContext";
import * as databaseService from "../services/firestore";

export default function Profile() {
  const { user, loadingUser } = useUser();
  React.useEffect(() => {
    (async () => {
      try {
        // const students = await databaseService.getAllStudents();
        // const listings = await databaseService.getAllListings();
        // console.log(students);
        // console.log(listings);
        const allRecs = await databaseService.setRecommendations();
        console.log(allRecs);
      } catch (err) {
        console.log(err);
      }
    })();
  });

  if (!user || loadingUser) {
    return null;
  } else if (user?.userType === "Student") {
    return (
      <LayoutSignedInStudent>
        <div></div>
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
