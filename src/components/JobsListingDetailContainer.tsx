import React from "react";
import { Button } from "@blueprintjs/core";
import * as DatabaseService from "../services/firestore";
import { stringifyDate } from "../util/date";
import { useUser } from "../services/auth/userContext";

interface listingData {
  title: string;
  company: string;
  location: string;
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
  const [listingDetail, setListingDetail] = React.useState({
    title: "",
    company: "",
    location: "",
    applicationCount: "0",
    description: "",
    requirements: "",
    deadline: "",
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
          const fetchedListingData = (await DatabaseService.getListingData(employerId, listingId)) as listingData;
          console.log(fetchedListingData);
          const deadlineString = stringifyDate(fetchedListingData.deadline?.toDate() ?? null);
          setListingDetail({ ...fetchedListingData, deadline: deadlineString });
          setNoDataAvailable(false);
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
  return (
    <div className="w-160">
      <div>
        <div className="flex flex-row justify-between">
          <p className="text-3xl font-bold">{listingDetail?.title}</p>
          <div className="flex flex-row items-center">
            <p className="mr-4">{listingDetail?.compensation}</p>
            {!isAnApplicant ? (
              <Button className="w-16 bp3-outlined" onClick={handleApplyButtonClick}>
                <b>Apply</b>
              </Button>
            ) : (
              <Button className="w-16 bp3-outlined" onClick={handleWithdrawButtonClick}>
                <b>Withdraw</b>
              </Button>
            )}
          </div>
        </div>
        <div>
          <p>{listingDetail.company}</p>
          <p>
            in <b>{listingDetail.location}</b>
          </p>
          <p>
            <span>
              <b>{listingDetail.applicationCount}</b> people applied.
            </span>
          </p>
        </div>
        <div>
          <br />
          <br />
          <br />
          <p className="text-xl font-bold mb-2">Description</p>
          <p>{listingDetail.description}</p>
          <br />
          <p className="text-xl font-bold mb-2 mt-2">Requirements</p>
          <p>{listingDetail.requirements}</p>
          <br />
          <p className="ml-128">
            Apply before <b className="ml-3">{listingDetail.deadline}</b>
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
}
