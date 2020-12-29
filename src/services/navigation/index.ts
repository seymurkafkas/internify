import { NextRouter } from "next/router";

export function goToHome(router: NextRouter) {
  router.push("/Home");
}

export function goToIndex(router: NextRouter) {
  router.push("/");
}

export function goToSearchPage(router: NextRouter) {
  router.push("/Search");
}

export function goToMyApplicationsPage(router: NextRouter) {
  router.push("/");
}

export function goToProfilePage(router: NextRouter) {
  router.push("/Profile");
}

export function goToProfilePageEmployer(router: NextRouter) {
  router.push("/CompanyDetail");
}

export function goToExplorePage(router: NextRouter) {
  router.push("/");
}

export function goToPostAListingPage(router: NextRouter) {
  router.push("/");
}

export function goToMyListingsPage(router: NextRouter) {
  router.push("/");
}
