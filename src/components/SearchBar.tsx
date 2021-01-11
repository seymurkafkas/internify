import React from "react";
import { InputGroup, Button } from "@blueprintjs/core";

function SearchBar(props: any) {
  return (
    <div className="flex flex-col space-y-2 mb-8">
      <h2 className="text-3xl font-bold">Search</h2>
      <div className="flex space-x-4">
        <InputGroup
          onChange={props.onKeywordChange}
          value={props.keyword}
          className="rounded-lg w-96"
          placeholder={"Enter a keyword"}
        />
        <Button className="bp3-outlined" onClick={props.onSearchClick}>
          Find a job
        </Button>
      </div>
    </div>
  );
}

export default SearchBar;
