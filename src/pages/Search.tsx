import React from "react";
import LayoutSignedInStudent from "../components/LayoutSignedInStudent";
import JobListingContainer from "../components/JobListingContainer";
import SearchBar from "../components/SearchBar";
import styles from "../components/styles.module.css";
const items1 = [
  {
    title: "Data Engineer",
    date: "12/13/2020",
    company: "SomeSoft Tech",
    location: "İstanbul, Turkey",
    applicants: 3,
    description:
      "3rd or 4th year student to handle our data ware house operations. Possible tools are Python, numpy, PyTorch etc. lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet ... ",
    compensation: "2000TL",
    url: "withid2",
  },
  {
    title: "Data Manager",
    date: "12/5/2020",
    company: "SomeSoft Tech",
    location: "İstanbul, Turkey",
    applicants: 8,
    description:
      "3rd or 4th year student to handle our data ware house operations. Possible tools are Python, numpy, PyTorch etc. lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet ... ",
    compensation: "1600TL",
    url: "withid4",
  },
];
const items2 = [
  {
    title: "Frontend Engineer",
    date: "14/13/2020",
    company: "Another Tech",
    location: "İstanbul, Turkey",
    applicants: 12,
    description:
      "3rd or 4th year student to handle our data ware house operations. Possible tools are Python, numpy, PyTorch etc. lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet ... ",
    compensation: "4000TL",
    url: "withid2",
  },
  {
    title: "Software Manager",
    date: "12/13/2020",
    company: "Random Tech",
    location: "İstanbul, Turkey",
    applicants: 8,
    description:
      "3rd or 4th year student to handle our data ware house operations. Possible tools are Python, numpy, PyTorch etc. lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet ... ",
    compensation: "5600TL",
    url: "withid4",
  },
];
class Search extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.state = {
      searchText: "",
      listingItems: items1,
    };
  }

  handleSearchClick(text) {
    if (text === "software") {
      this.setState({ listingItems: items2, searchText: text });
    } else {
      this.setState({ listingItems: items1, searchText: text });
    }
  }
  render() {
    return (
      <LayoutSignedInStudent>
        <div className={[styles.SearchPage].join(" ")}>
          <SearchBar onSearchClick={this.handleSearchClick} />
          <JobListingContainer items={this.state.listingItems} />
        </div>
      </LayoutSignedInStudent>
    );
  }
}

export default Search;
