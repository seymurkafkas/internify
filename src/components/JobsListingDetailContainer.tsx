import React from "react";
import { Button } from "@blueprintjs/core";
import * as DatabaseService from "../services/firestore";

interface listingData {
  title: string;
  company: string;
  location: string;
  applicationCount: string;
  description: string;
  requirements: string;
  dateEnd: string;
  compensation: string;
}

export default function JobsListingDetailContainer(props: any) {
  const listingId = props.listingId;
  const employerId = props.employerId;
  const [loadingData, setLoadingData] = React.useState(true);
  const [noDataAvailable, setNoDataAvailable] = React.useState(false);
  const [listingDetail, setListingDetail] = React.useState({
    title: "",
    company: "",
    location: "",
    applicationCount: "0",
    description: "",
    requirements: "",
    dateEnd: "",
    compensation: "",
  });

  React.useEffect(() => {
    (async function () {
      try {
        const fetchedListingData = (await DatabaseService.getListingData(employerId, listingId)) as listingData;
        setListingDetail(fetchedListingData);
      } catch (err) {
        console.log(err);
        setNoDataAvailable(true);
      }
      setLoadingData(false);
    })();
  }, [employerId, listingId]);

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
            <Button className="w-16 bp3-outlined">
              <b>Apply</b>
            </Button>
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
            Apply before <b className="ml-3">{listingDetail.dateEnd}</b>
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
}
