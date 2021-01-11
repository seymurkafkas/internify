import { useRouter } from "next/router";
import React from "react";
import EmployerDataContainer from "../../components/EmployerDataContainer";
import LayoutSignedInStudent from "../../components/LayoutSignedInStudent";
export default function ViewEmployerPage() {
  const router = useRouter();
  const { employerUid } = router.query; //Use this to fetch data
  if (!employerUid) {
    return null;
  }

  console.log(employerUid);

  return (
    <LayoutSignedInStudent>
      <EmployerDataContainer employerUid={employerUid as string} />
    </LayoutSignedInStudent>
  );
}
