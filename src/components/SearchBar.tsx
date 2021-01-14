import React from "react";
import { InputGroup, Button } from "@blueprintjs/core";

function SearchBar(props: any) {
  return (
    <div className="flex flex-col space-y-2 mb-8">
      <h2 className="text-3xl font-bold mb-9">Find Listings!</h2>
      <div className="flex space-x-4">
        <InputGroup
          leftIcon="search"
          onChange={props.onKeywordChange}
          value={props.keyword}
          className="rounded-lg w-96"
          placeholder={"Enter a keyword"}
          rightElement={
            <Button icon="arrow-bottom-right" className="bp3-minimal" onClick={props.onSearchClick}>
              Search
            </Button>
          }
        />
      </div>
    </div>
  );
}

export default SearchBar;
