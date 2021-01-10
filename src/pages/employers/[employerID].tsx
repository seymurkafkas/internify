import { useRouter } from "next/router";
import React from "react";
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
      <div className="mt-16 ml-96">this is the employer View page</div>
    </LayoutSignedInStudent>
  );
}
