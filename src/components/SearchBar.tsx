import React, { useState } from "react";
import { InputGroup, Button } from "@blueprintjs/core";

function SearchBar(props: any) {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="flex flex-col space-y-2 mb-8">
      <h2 className="text-3xl font-bold">Search</h2>
      <div className="flex space-x-4">
        <InputGroup onChange={(text) => setSearchText(text)} className="rounded-lg w-96" defaultValue={searchText} />
        <Button onClick={(text) => props.onSearchClick(text)}>Find a job</Button>
      </div>
    </div>
  );
}

export default SearchBar;
