import React, { useState } from "react";
import LayoutSignedInStudent from "../components/LayoutSignedInStudent";
import JobListingContainer from "../components/JobListingContainer";
import SearchBar from "../components/SearchBar";

const Search = () => {
  const [listingItems] = useState([
    {
      title: "Data Engineer",
      deadline: null,
      companyName: "SomeSoft Tech",
      location: { city: "Istanbul", country: "Turkey" },
      applicantCount: 3,
      description:
        "3rd or 4th year student to handle our data ware house operations. Possible tools are Python, numpy, PyTorch etc. lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet ... ",
      compensation: 2000,
      listingId: "TestListing",
      employerId: "MRxSgzTSdZT2SgPOD56Kbp14VgL2",
    },
  ]);

  return (
    <LayoutSignedInStudent>
      <div className="ml-96 mt-24">
        <SearchBar onSearchClick={() => {}} />
        <JobListingContainer items={listingItems} />
      </div>
    </LayoutSignedInStudent>
  );
};

export default Search;
