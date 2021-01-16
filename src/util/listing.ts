export function stringifyListing({ employerUid, listingId }) {
  return `${employerUid}/${listingId}`;
}

export function getListingFromString(stringifiedListing: string) {
  const [employerUid, listingId] = stringifiedListing.split("/");

  return {
    listingId,
    employerUid,
  };
}
