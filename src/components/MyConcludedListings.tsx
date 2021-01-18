import React from "react";
import { useUser } from "../services/auth/userContext";
import * as DatabaseService from "../services/firestore";
import ApplicantConcludedItem from "./ApplicantConcludedItem";
import SmallConcludedListingContainer from "./SmallConcludedListingContainer";
import * as Formatter from "../util/string";

export default function MyConcludedListings() {
  const [loadingData, setLoadingData] = React.useState(true);
  const [myConcludedListingAndApplicants, setMyConcludedListingAndApplicants] = React.useState([]);

  const { user, loadingUser } = useUser();
  const userId = user?.uid ?? null;
  console.log(myConcludedListingAndApplicants);
  React.useEffect(() => {
    (async () => {
      if (userId) {
        try {
          const fetchedConcludedListings = await DatabaseService.getMyConcludedListings(userId);

          if (fetchedConcludedListings?.length > 0) {
            const listingAndApplicantDataPromises = fetchedConcludedListings.map(async (listingItem) => {
              try {
                const studentUid = listingItem.approvedApplicant;
                const approvedApplicantDetails = await DatabaseService.getStudentProfile(studentUid);
                return { listing: listingItem, applicant: { ...approvedApplicantDetails, studentUid } };
              } catch (err) {
                console.log(err);
              }
            });

            const listingAndApplicantData = await Promise.all(listingAndApplicantDataPromises);
            setMyConcludedListingAndApplicants(listingAndApplicantData);
          }
          setLoadingData(false);
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [userId]);

  if (loadingUser) {
    return null;
  }

  if (user && loadingData) {
    return <div>loading</div>;
  }

  return (
    <>
      <p className="text-5xl font-light mt-16 ml-64">My Matches</p>
      <div className="text-xl mt-8 flex flex-row space-x-96 ml-64">
        <p>Listings:</p>
        <p>Students:</p>
      </div>
      <div className="flex flex-col justify-start mt-6 ml-64">
        {myConcludedListingAndApplicants.map((applicantListingObject, index) => {
          const { listing, applicant } = applicantListingObject;

          const applicantContainerProps = {
            studentUid: applicant.studentUid,
            name: Formatter.formatName(applicant.name),
            education: Formatter.formatEducation(applicant.education),
            position: Formatter.formatPosition(applicant.experience),
            location: Formatter.formatLocation(applicant.location),
          };
          const listingContainerProps = {
            title: Formatter.formatTitle(listing.title),
            location: Formatter.formatLocation(listing.location),
            compensation: listing.compensation,
            deadline: Formatter.formatDeadline(listing.deadline),
          };

          return (
            <div className="mb-4 flex flex-col justify-start items-start " key={index}>
              <div className="flex flex-row space-x-20 items-center">
                <SmallConcludedListingContainer {...listingContainerProps}></SmallConcludedListingContainer>
                <ApplicantConcludedItem {...applicantContainerProps}></ApplicantConcludedItem>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
