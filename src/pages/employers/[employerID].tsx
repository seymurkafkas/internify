import { useRouter } from "next/router";
import React from "react";
import EmployerDataContainer from "../../components/EmployerDataContainer";
import LayoutSignedInStudent from "../../components/LayoutSignedInStudent";
export default function ViewEmployerPage() {
  const router = useRouter();
  const { employerID } = router.query; //Use this to fetch data
  if (!employerID) {
    return null;
  }

  console.log(employerID);

  return (
    <LayoutSignedInStudent>
      <EmployerDataContainer employerUid={employerID as string} />
    </LayoutSignedInStudent>
  );
}
