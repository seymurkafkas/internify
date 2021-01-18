import React from "react";
import { Intent, Text } from "@blueprintjs/core";
import * as DatabaseService from "../services/firestore";
import { stringifyDate } from "../util/date";
import { useUser } from "../services/auth/userContext";
import { useRouter } from "next/router";
import * as Navigation from "../services/navigation";
import { AppToaster } from "../components/Toaster";
import Spinner from "../components/Spinner";

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

  const showApplyToaster = () => {
    AppToaster.show({
      message: "Applied successfully",
      icon: "confirm",
      intent: Intent.NONE,
    });
  };

  const showWithdrawToaster = () => {
    AppToaster.show({
      message: "Application Withdrawn",
      icon: "confirm",
      intent: Intent.NONE,
    });
  };

  function handleApplyButtonClick() {
    (async () => {
      await DatabaseService.applyForListing(listingId, employerUid, user?.uid ?? null);
      setListingDetail((prevDetails) => {
        const newDetails = { ...prevDetails };
        newDetails.applicationCount += 1;
        return newDetails;
      });
      showApplyToaster();
      setIsAnApplicant(true);
    })();
  }

  function handleWithdrawButtonClick() {
    (async () => {
      await DatabaseService.withdrawApplication(listingId, employerUid, user?.uid ?? null);
      setListingDetail((prevDetails) => {
        const newDetails = { ...prevDetails };
        newDetails.applicationCount -= 1;
        return newDetails;
      });
      showWithdrawToaster();
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
    return <Spinner size={200}></Spinner>;
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
    <div className="w-999">
      <div>
        <div className="flex flex-row justify-between">
          <Text className="w-192 text-4xl font-bold" ellipsize={true}>
            {listingDetail?.title}
          </Text>
          <div className="flex flex-row items-center">
            <p className="mr-4 text-lg">${listingDetail?.compensation}</p>
            <div
              className="mr-4 cursor-pointer flex place-items-center rounded justify-center text-white bg-green-700 hover:bg-green-500 w-36 h-8"
              onClick={handleClickOnCompany}>
              <div className="text-md">View Company</div>
            </div>
            {!isAnApplicant ? (
              <div
                className="cursor-pointer flex place-items-center rounded justify-center text-white bg-green-700 hover:bg-green-500 w-16 h-8"
                onClick={handleApplyButtonClick}>
                <div className="text-md">Apply</div>
              </div>
            ) : (
              <div
                className="cursor-pointer flex place-items-center rounded justify-center text-white bg-green-700 hover:bg-green-500 w-24 h-8"
                onClick={handleWithdrawButtonClick}>
                <div className="text-md">Withdraw</div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4">
          <p>{listingDetail?.companyName ?? "Undeclared"}</p>
          <Text className="w-96" ellipsize={true}>
            in <b>{locationString}</b>
          </Text>
          <p>
            <span>
              <b>{listingDetail.applicationCount}</b> people applied.
            </span>
          </p>
        </div>
        <div>
          <p className="text-xl font-bold mb-2 mt-8">Description</p>
          <Text className="w-96">{listingDetail.description}</Text>
          <p className="text-xl font-bold mb-2 mt-8">Requirements</p>

          {listingDetail.requirements.map((requirement, index) => {
            if (!requirement.skill && !requirement.level) {
              return null;
            }
            return (
              <div className="flex flex-row " key={index}>
                <Text className="w-40" ellipsize={true}>
                  {requirement.skill}:
                </Text>
                <div>{["Beginner", "Intermediate", "Advanced"][Number(requirement.level) - 1]}</div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col items-center ml-192 mt-8">
          <div>Apply before</div>
          <b>{deadlineString}</b>
        </div>
      </div>
    </div>
  );
}
