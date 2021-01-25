import React, { useState } from "react";
import LayoutSignedInStudent from "../components/LayoutSignedInStudent";
import JobListingContainer from "../components/JobListingContainer";
import SearchBar from "../components/SearchBar";
import * as Query from "../util/query";
import { studentAuthCheck } from "../services/auth/AuthCheck";
import { useUser } from "../services/auth/userContext";
import { useRouter } from "next/router";

const Search = () => {
  const [keyword, setKeyword] = React.useState("");
  const [listingItems, setListingItems] = useState([]);
  const user = useUser();
  const router = useRouter();
  const isAuthChecked = studentAuthCheck(user, router);
  function handleSearch() {
    (async function () {
      const returnedListings = await Query.getSearchResult(keyword);
      setListingItems(returnedListings);
    })();
  }

  function handleKeywordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }
  if (!isAuthChecked) {
    return null;
  }
  return (
    <LayoutSignedInStudent>
      <div className="ml-64 mt-16">
        <SearchBar value={keyword} onKeywordChange={handleKeywordChange} onSearchClick={handleSearch} />
        <JobListingContainer items={listingItems} />
      </div>
    </LayoutSignedInStudent>
  );
};

export default Search;
