import React from "react";
import { Button } from "@blueprintjs/core";
import * as DatabaseService from "../services/firestore";
import { stringifyDate } from "../util/date";
import { useUser } from "../services/auth/userContext";
import { useRouter } from "next/router";
import * as Navigation from "../services/navigation";
interface ListingData {
  title: string;
  companyName: string;
  location: { city: string; country: string };
  applicationCount: number;
  description: string;
  requirements: { skill: string; level: string }[];
  deadline: firebase.default.firestore.Timestamp | null;
  compensation: number;
}

export default function JobsListingDetailContainer(props: any) {
  const listingId = props.listingId;
  const employerUid = props.employerUid;
  const [isAnApplicant, setIsAnApplicant] = React.useState(true);
  const [loadingData, setLoadingData] = React.useState(true);
  const [noDataAvailable, setNoDataAvailable] = React.useState(true);
  const [listingDetail, setListingDetail] = React.useState<ListingData>({
    title: "",
    companyName: "",
    location: {
      city: "",
      country: "",
    },
    applicationCount: 0,
    description: "",
    requirements: [],
    deadline: null,
    compensation: 0,
  });
  const { user, loadingUser } = useUser();
  const router = useRouter();
  function handleApplyButtonClick() {
    (async () => {
      await DatabaseService.applyForListing(listingId, employerUid, user?.uid ?? null);
      setIsAnApplicant(true);
    })();
  }

  function handleWithdrawButtonClick() {
    (async () => {
      await DatabaseService.withdrawApplication(listingId, employerUid, user?.uid ?? null);
      setIsAnApplicant(false);
    })();
  }

  function handleClickOnCompany() {
    Navigation.goToViewEmployerPage(router, employerUid);
  }

  React.useEffect(() => {
    (async function () {
      if (user) {
        try {
          const fetchedListingData = (await DatabaseService.getListingData(employerUid, listingId)) as ListingData;
          console.log(fetchedListingData);

          if (fetchedListingData) {
            setListingDetail({ ...fetchedListingData });
            setNoDataAvailable(false);
          }
        } catch (err) {
          console.log(err);
          setNoDataAvailable(true);
        }
        setLoadingData(false);
      }
    })();
  }, [employerUid, listingId, user]);

  React.useEffect(() => {
    (async function () {
      if (user) {
        try {
          const fetchedIsAnApplicant = await DatabaseService.isStudentAnApplicant(listingId, employerUid, user.uid);
          console.log(fetchedIsAnApplicant);
          setIsAnApplicant(fetchedIsAnApplicant);
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [isAnApplicant, employerUid, listingId, user]);

  if (!user || loadingUser) {
    return null;
  }

  if (loadingData) {
    return <div>Loading</div>;
  }

  if (noDataAvailable) {
    return <div>Error!!!! NO DATA</div>;
  }
  console.log(noDataAvailable);
  let locationString = "Undeclared";
  const deadlineString = stringifyDate(listingDetail.deadline?.toDate() ?? null);

  if (listingDetail.location.city && listingDetail.location.country) {
    locationString = `${listingDetail.location.city}, ${listingDetail.location.country}`;
  } else {
    locationString = `${listingDetail.location?.city ?? ""}${listingDetail.location?.country ?? ""}`;
  }

  return (
    <div className="w-192">
      <div>
        <div className="flex flex-row justify-between">
          <p className="text-4xl font-bold">{listingDetail?.title}</p>
          <div className="flex flex-row items-center">
            <p className="mr-4 text-lg">${listingDetail?.compensation}</p>
            <Button className="w-30 bp3-outlined mr-4" onClick={handleClickOnCompany}>
              <b>View Company</b>
            </Button>
            {!isAnApplicant ? (
              <Button className="w-16 bp3-outlined" onClick={handleApplyButtonClick}>
                <b>Apply</b>
              </Button>
            ) : (
              <Button className="w-24 bp3-outlined" onClick={handleWithdrawButtonClick}>
                <b>Withdraw</b>
              </Button>
            )}
          </div>
        </div>
        <div className="mt-4">
          <p>{listingDetail?.companyName ?? "Undeclared"}</p>
          <p>
            in <b>{locationString}</b>
          </p>
          <p>
            <span>
              <b>{listingDetail.applicationCount}</b> people applied.
            </span>
          </p>
        </div>
        <div>
          <p className="text-xl font-bold mb-2 mt-8">Description</p>
          <p>{listingDetail.description}</p>
          <p className="text-xl font-bold mb-2 mt-8">Requirements</p>

          {listingDetail.requirements.map((requirement, index) => {
            if (!requirement.skill && !requirement.level) {
              return null;
            }
            return (
              <div key={index}>
                <div>{requirement.skill}</div>
                <div>{["Beginner", "Intermediate", "Advanced"][Number(requirement.level) - 1]}</div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col items-center ml-160 mt-8">
          <div>Apply before</div>
          <b>{deadlineString}</b>
        </div>
      </div>
    </div>
  );
}
