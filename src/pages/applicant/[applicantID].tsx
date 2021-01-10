import { useRouter } from "next/router";
import React from "react";
import LayoutSignedInEmployer from "../../components/LayoutSignedInEmployer";
import ViewStudentContainer from "../../components/ViewStudentContainer";
export default function Post() {
  const router = useRouter();
  const { applicantID } = router.query; //Use this to fetch data
  if (!applicantID) {
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
