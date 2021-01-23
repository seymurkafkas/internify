import { useRouter } from "next/router";
import React from "react";
import LayoutSignedInEmployer from "../../components/LayoutSignedInEmployer";
import ViewStudentContainer from "../../components/ViewStudentContainer";
import { employerAuthCheck } from "../../services/auth/AuthCheck";
import { useUser } from "../../services/auth/userContext";

export default function Post() {
  const router = useRouter();
  const { applicantID } = router.query; //Use this to fetch data
  const user = useUser();
  const isAuthChecked = employerAuthCheck(user, router);

  if (!applicantID || !isAuthChecked) {
    return null;
  }
  return (
    <LayoutSignedInEmployer>
      <div className="ml-96 mt-16 flex flex-row justify-between">
        <ViewStudentContainer applicantUid={applicantID as string} />
      </div>
    </LayoutSignedInEmployer>
  );
}
