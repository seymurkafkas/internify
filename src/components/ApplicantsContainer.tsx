import React from "react";
import ApplicantItem from "./ApplicantItem";
import * as DatabaseService from "../services/firestore";
import { useUser } from "../services/auth/userContext";

export default function ApplicantsContainer(props: any) {
  const [applicantSmallData, setApplicantSmallData] = React.useState([]);
  const { user, loadingUser } = useUser();
  const listingId = props.listingId;
  const userId = user?.uid;

  function handleApprove(studentUid: string) {
    return () => {
      (async () => {
        await DatabaseService.approveApplicant(userId, studentUid, listingId);
      })();
    };
  }

  function handleReject(studentUid: string, index: number) {
    return () => {
      (async () => {
        await DatabaseService.rejectApplicant(userId, studentUid, listingId);
        setApplicantSmallData((prevApplicantData) => {
          const newApplicantData = [...prevApplicantData];
          newApplicantData.splice(index, 1);
          return newApplicantData;
        });
      })();
    };
  }
  React.useEffect(() => {
    !loadingUser &&
      user &&
      (async function fetchApplicantData() {
        let applicantUids = [];
        try {
          applicantUids = await DatabaseService.getApplicantsForListing(userId, listingId);
        } catch (err) {
          console.log(err);
        }

        const result = await applicantUids.reduce(async function (currentApplicantList, currentUID) {
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
              } else if (applicantData.education[0].institutionName) {
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
              studentUid: currentUID,
              listingId: listingId,
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
  }, [listingId, loadingUser, userId, user]);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Applicants</h2>
      <div>
        {applicantSmallData.map((item, index) => {
          return (
            <ApplicantItem
              key={index}
              handleApprove={handleApprove(item.studentUid)}
              handleReject={handleReject(item.studentUid, index)}
              {...item}
            />
          );
        })}
      </div>
    </div>
  );
}
