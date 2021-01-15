import { NextRouter } from "next/router";

export async function goToHome(router: NextRouter) {
  await router.push("/Home");
}

export async function goToIndex(router: NextRouter) {
  await router.push("/");
}

export async function goToSearchPage(router: NextRouter) {
  await router.push("/Search");
}

export async function goToMyApplicationsPage(router: NextRouter) {
  await router.push("/MyApplications");
}

export async function goToProfilePage(router: NextRouter) {
  await router.push("/Profile");
}

export async function goToExplorePage(router: NextRouter) {
  await router.push("/Explore");
}

export async function goToPostAListingPage(router: NextRouter) {
  await router.push("/PostAListing");
}

export async function goToMyListingsPage(router: NextRouter) {
  await router.push("/MyListings");
}

export async function goToViewEmployerPage(router: NextRouter, employerUid: string) {
  await router.push("/employers/" + employerUid);
}

export async function goToViewListingPage(router: NextRouter, employerUid: string, listingId: string) {
  await router.push("/employers/" + employerUid + "/" + listingId);
}

export async function goToCustomPage(router: NextRouter, customUrl: string) {
  await router.push("/" + customUrl);
}

export async function goToViewApplicantPage(router: NextRouter, uid: string) {
  await router.push("/applicant/" + uid);
}

export async function goToMyPostedListingsPage(router: NextRouter, listingId: string) {
  await router.push("/mylistings/" + listingId);
}
