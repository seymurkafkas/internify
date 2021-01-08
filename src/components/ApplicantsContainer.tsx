import React from "react";
import ApplicantItem from "./ApplicantItem";

function AplicantList(props: any) {
  const listings = props.items.map((item, index) => {
    return <ApplicantItem key={index} {...item} />;
  });
  return <>{listings}</>;
}

export default function ApplicantsContainer() {
  const items = [
    {
      name: "John Doe",
      dateApplied: "12/13/2020",
      position: "Data Engineer",
      location: "İstanbul, Turkey",
      education: "Istanbul Technical University",
      uid: "withid2",
    },
    {
      name: "Mary Jane",
      dateApplied: "3/45/2020",
      position: "Data Manager",
      location: "İstanbul, Turkey",
      education: "Istanbul Technical University",
      uid: "withid1",
    },
    {
      name: "Tom Holland",
      dateApplied: "3/2/2020",
      position: "Software Engineer",
      location: "İstanbul, Turkey",
      education: "Koc University",
      uid: "withid4",
    },
    {
      name: "Rick Sanchez",
      dateApplied: "3/9/2020",
      position: "Embedded System Engineer",
      location: "İstanbul, Turkey",
      education: "Sabanci University",
      uid: "withid5",
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Applicants</h2>
      <div className="w-128 space-y-4">
        <AplicantList items={items} />
      </div>
    </div>
  );
}
