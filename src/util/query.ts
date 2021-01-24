import * as db from "../services/firestore/index";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* istanbul ignore next */
export async function getSearchResult(searchKeyWord: string) {
  const results = await db.getAllListings();
  console.log(results);
  const filteredResults = results.filter((listingData) => {
    return keywordMatchesListing(searchKeyWord, listingData as any);
  });
  return filteredResults;
}

interface ListingData {
  title: string;
  companyName: string;
  location: { city: string; country: string };
  applicationCount: number;
  description: string;
  requirements: { skill: string; level: string }[];
  deadline: firebase.default.firestore.Timestamp | null;
  compensation: number;
}

export function keywordMatchesListing(searchKeyWord: string, listingData: ListingData) {
  if (!searchKeyWord) {
    return true;
  }

  let keyword = searchKeyWord.replace(/\s+/g, "");
  keyword = keyword.toLowerCase();

  if (listingData.title?.toLowerCase().includes(keyword) ?? false) {
    return true;
  }
  if (listingData.companyName?.toLowerCase().includes(keyword) ?? false) {
    return true;
  }
  if (listingData.description?.toLowerCase().includes(keyword) ?? false) {
    return true;
  }

  if (
    (listingData.location?.city.toLowerCase().includes(keyword) ?? false) ||
    (listingData.location?.country.toLowerCase().includes(keyword) ?? false)
  ) {
    return true;
  }

  for (let i = 0; i < listingData.requirements.length; i++) {
    if (listingData.requirements[i]?.skill.toLowerCase().includes(keyword) ?? false) {
      return true;
    }
  }

  return false;
}
