import { useRouter } from "next/router";
import React from "react";
import EmployerDataContainer from "../../components/EmployerDataContainer";
import LayoutSignedInStudent from "../../components/LayoutSignedInStudent";
import { useUser } from "../../services/auth/userContext";
import { studentAuthCheck } from "../../services/auth/AuthCheck";

export default function ViewEmployerPage() {
  const router = useRouter();
  const { employerUid } = router.query; //Use this to fetch data
  const user = useUser();

  const isAuthChecked = studentAuthCheck(user, router);

  if (!employerUid || !isAuthChecked) {
    return null;
  }

  console.log(employerUid);

  return (
    <LayoutSignedInStudent>
      <EmployerDataContainer employerUid={employerUid as string} />
    </LayoutSignedInStudent>
  );
}
