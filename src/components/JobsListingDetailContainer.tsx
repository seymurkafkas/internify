import React from "react";
import { Button } from "@blueprintjs/core";

export default function JobsListingDetailContainer(props: any) {
  let item = props.item;
  item = {
    title: "Frontend developer",
    company: "Somesoft company",
    location: "Istanbul, Turkey",
    applicationCount: 32,
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac tortor id elit rhoncus bibendum ut vel est. Donec sed mi a nulla feugiat sagittis. Donec et luctus velit, in tincidunt sem. Quisque in justo non leo vestibulum accumsan nec ac nulla. Duis elementum nisi at ligula fringilla egestas. Etiam risus velit, sagittis nec nibh a, ullamcorper convallis tellus. Maecenas imperdiet ornare sodales. Pellentesque imperdiet fringilla lobortis. Mauris imperdiet lorem id elit lobortis malesuada vitae id ligula. Vestibulum quis libero augue. Sed tortor urna, pharetra ultrices blandit nec, consectetur nec tellus. ",
    requirements: ["Javascript", "C#", "MVC", "Jenkins"].join(", "),
    dateEnd: "3/7/2020",
    compensation: "6000TL",
  };
  return (
    <div className="w-160">
      <div>
        <div className="flex flex-row justify-between">
          <p className="text-3xl font-bold">{item.title}</p>
          <div className="flex flex-row items-center">
            <p className="mr-4">{item.compensation}</p>
            <Button className="w-16 bp3-outlined">
              <b>Apply</b>
            </Button>
          </div>
        </div>
        <div>
          <p>{item.company}</p>
          <p>
            in <b>{item.location}</b>
          </p>
          <p>
            <span>
              <b>{item.applicationCount}</b> people applied.
            </span>
          </p>
        </div>
        <div>
          <br />
          <br />
          <br />
          <p className="text-xl font-bold mb-2">Description</p>
          <p>{item.description}</p>
          <br />
          <p className="text-xl font-bold mb-2 mt-2">Requirements</p>
          <p>{item.requirements}</p>
          <br />
          <p className="ml-128">
            Apply before <b className="ml-3">{item.dateEnd}</b>
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
}
