import React, { useState } from "react";
import LayoutSignedInStudent from "../components/LayoutSignedInStudent";
import JobListingContainer from "../components/JobListingContainer";
import SearchBar from "../components/SearchBar";
import * as Query from "../util/query";

const Search = () => {
  const [keyword, setKeyword] = React.useState("");
  const [listingItems, setListingItems] = useState([]);

  function handleSearch() {
    (async function () {
      const returnedListings = await Query.getSearchResult(keyword);
      setListingItems(returnedListings);
    })();
  }

  function handleKeywordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
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
