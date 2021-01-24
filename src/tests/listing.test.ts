import * as Listing from "../util/listing";

describe("stringifyListing", () => {
  const testCases = [
    {
      input: { employerUid: "employerUid", listingId: "listingId" },
      output: "employerUid/listingId",
    },
  ];

  testCases.forEach((testCase) => {
    test(`Should return the stringified from of ${testCase.input}, which is ${testCase.output}`, () => {
      const result = Listing.stringifyListing(testCase.input);
      expect(result).toEqual(testCase.output);
    });
  });
});

describe("getListingFromString", () => {
  const testCases = [
    {
      input: "employerUid/listingId",
      output: { employerUid: "employerUid", listingId: "listingId" },
    },
  ];

  testCases.forEach((testCase) => {
    test(`Should return the listing from the string: ${testCase.input} `, () => {
      const result = Listing.getListingFromString(testCase.input);
      expect(result).toEqual(testCase.output);
    });
  });
});
