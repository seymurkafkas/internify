import React, { useState } from "react";
import LayoutSignedInStudent from "../components/LayoutSignedInStudent";
import JobListingContainer from "../components/JobListingContainer";
import SearchBar from "../components/SearchBar";
const items1 = [
  {
    title: "Data Engineer",
    deadline: "12/13/2020",
    company: "SomeSoft Tech",
    location: "İstanbul, Turkey",
    applicants: 3,
    description:
      "3rd or 4th year student to handle our data ware house operations. Possible tools are Python, numpy, PyTorch etc. lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet ... ",
    compensation: "2000TL",
    listingId: "TestListing",
    employerId: "MRxSgzTSdZT2SgPOD56Kbp14VgL2",
  },
  {
    title: "Data Manager",
    deadline: "12/5/2020",
    company: "SomeSoft Tech",
    location: "İstanbul, Turkey",
    applicants: 8,
    description:
      "3rd or 4th year student to handle our data ware house operations. Possible tools are Python, numpy, PyTorch etc. lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet ... ",
    compensation: "1600TL",
    listingId: "withid4",
    employerId: "someid12",
  },
];
const items2 = [
  {
    title: "Frontend Engineer",
    deadline: "14/13/2020",
    company: "Another Tech",
    location: "İstanbul, Turkey",
    applicants: 12,
    description:
      "3rd or 4th year student to handle our data ware house operations. Possible tools are Python, numpy, PyTorch etc. lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet ... ",
    compensation: "4000TL",
    listingId: "withid2",
    employerId: "someid2",
  },
  {
    title: "Software Manager",
    deadline: "12/13/2020",
    company: "Random Tech",
    location: "İstanbul, Turkey",
    applicants: 8,
    description:
      "3rd or 4th year student to handle our data ware house operations. Possible tools are Python, numpy, PyTorch etc. lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet ... ",
    compensation: "5600TL",
    listingId: "withid4",
    employerId: "someid4",
  },
];
const Search = () => {
  const [listingItems, setListingItems] = useState([]);

  function handleSearchClick(text) {
    if (text === "s") {
      setListingItems(items2);
    } else {
      setListingItems(items1);
    }
  }
  return (
    <LayoutSignedInStudent>
      <div className="ml-96 mt-24">
        <SearchBar onSearchClick={handleSearchClick} />
        <JobListingContainer items={listingItems} />
      </div>
    </LayoutSignedInStudent>
  );
};

export default Search;
