import React from "react";
import { Button } from "@blueprintjs/core";
import * as DatabaseService from "../services/firestore";
import { stringifyDate } from "../util/date";
import { useUser } from "../services/auth/userContext";

interface ListingData {
  title: string;
  company: string;
  location: { city: string; country: string };
  applicationCount: string;
  description: string;
  requirements: string;
  deadline: firebase.default.firestore.Timestamp | null;
  compensation: number;
}

export default function JobsListingDetailContainer(props: any) {
  const listingId = props.listingId;
  const employerId = props.employerId;
  const [isAnApplicant, setIsAnApplicant] = React.useState(true);
  const [loadingData, setLoadingData] = React.useState(true);
  const [noDataAvailable, setNoDataAvailable] = React.useState(true);
  const [listingDetail, setListingDetail] = React.useState<ListingData>({
    title: "",
    company: "",
    location: {
      city: "",
      country: "",
    },
    applicationCount: "0",
    description: "",
    requirements: "",
    deadline: null,
    compensation: 0,
  });
  const { user, loadingUser } = useUser();

  function handleApplyButtonClick() {
    (async () => {
      await DatabaseService.applyForListing(listingId, employerId, user?.uid ?? null);
      setIsAnApplicant(true);
    })();
  }

  function handleWithdrawButtonClick() {
    (async () => {
      await DatabaseService.withdrawApplication(listingId, employerId, user?.uid ?? null);
      setIsAnApplicant(false);
    })();
  }

  React.useEffect(() => {
    (async function () {
      if (user) {
        try {
          const fetchedListingData = (await DatabaseService.getListingData(employerId, listingId)) as ListingData;
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
  }, [employerId, listingId, user]);

  React.useEffect(() => {
    (async function () {
      if (user) {
        try {
          const fetchedIsAnApplicant = await DatabaseService.isStudentAnApplicant(listingId, employerId, user.uid);
          console.log(fetchedIsAnApplicant);
          setIsAnApplicant(fetchedIsAnApplicant);
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [isAnApplicant, employerId, listingId, user]);

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
    <div className="w-160">
      <div>
        <div className="flex flex-row justify-between">
          <p className="text-4xl font-bold">{listingDetail?.title}</p>
          <div className="flex flex-row items-center">
            <p className="mr-4 text-lg">${listingDetail?.compensation}</p>
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
          <p>{listingDetail.company}</p>
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
          <p>{listingDetail.requirements}</p>
        </div>

        <div className="flex flex-col items-center ml-128 mt-8">
          <div>Apply before</div>
          <b>{deadlineString}</b>
        </div>
      </div>
    </div>
  );
}
