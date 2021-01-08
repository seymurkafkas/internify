import React from "react";
import ApplicantItem from "./ApplicantItem";
import * as DatabaseService from "../services/firestore";
import { useUser } from "../services/auth/userContext";
function ApplicantList(props: any) {
  const listings = props.items.map((item, index) => {
    return <ApplicantItem key={index} {...item} />;
  });
  return <>{listings}</>;
}

export default function ApplicantsContainer(props: any) {
  const [applicantSmallData, setApplicantSmallData] = React.useState([]);
  const [applicantUIDs, setApplicantUIDs] = React.useState([]);
  const { user, loadingUser } = useUser();
  const listingId = props.listingId;
  const userId = user?.uid;
  React.useEffect(() => {
    (async () => {
      if (!loadingUser) {
        try {
          const applicantUids = await DatabaseService.getApplicantsForListing(userId, listingId);
          setApplicantUIDs(applicantUids);
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [listingId, userId, loadingUser]);

  React.useEffect(() => {
    (async function fetchApplicantData() {
      const result = await applicantUIDs.reduce(async function (currentApplicantList, currentUID: string) {
        try {
          const applicantData = await DatabaseService.getStudentProfile(currentUID);

          let positionString = "Undeclared";
          let locationString = "Undeclared";
          let educationString = "Undeclared";
          if (applicantData.experience.length !== 0) {
            if (applicantData.experience[0].positionName) {
              if (applicantData.experience[0].companyName) {
                positionString = `${applicantData?.experience[0]?.positionName} at ${applicantData.experience[0].companyName}`;
              } else {
                positionString = applicantData.experience[0].positionName;
              }
            } else if (applicantData.experience[0].companyName) {
              positionString = `$Works at ${applicantData.experience[0].companyName}`;
            }
          }

          if (applicantData.education.length !== 0) {
            if (applicantData.education[0].degreeName) {
              if (applicantData.education[0].institutionName) {
                educationString = `${applicantData?.education[0]?.degreeName} at ${applicantData.education[0].institutionName}`;
              } else {
                educationString = applicantData.education[0].institutionName;
              }
            } else if (applicantData.education[0].companyName) {
              educationString = `$Graduated from ${applicantData.education[0].institutionName}`;
            }
          }

          if (applicantData.location.city && applicantData.location.country) {
            locationString = `${applicantData.location.city}, ${applicantData.location.country}`;
          } else {
            locationString = `${applicantData.location?.city ?? ""}${applicantData.location?.country ?? ""}`;
          }

          const applicantShrinkedData = {
            name: applicantData?.name ?? " Undeclared",
            position: positionString,
            location: locationString,
            education: educationString,
            uid: currentUID,
          };
          const currentList = await currentApplicantList;
          currentList.push(applicantShrinkedData);
          return currentList;
        } catch (err) {
          console.log(err);
        }
      }, Promise.resolve([]));
      setApplicantSmallData(result);
    })();
  }, [applicantUIDs]);

  /*   const items = [
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
 */

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Applicants</h2>
      <div className="w-128 space-y-4">
        <ApplicantList items={applicantSmallData} />
      </div>
    </div>
  );
}
