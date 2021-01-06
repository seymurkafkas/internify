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
  await router.push("/");
}

export async function goToProfilePage(router: NextRouter) {
  await router.push("/Profile");
}

export async function goToExplorePage(router: NextRouter) {
  await router.push("/");
}

export async function goToPostAListingPage(router: NextRouter) {
  await router.push("/");
}

export async function goToMyListingsPage(router: NextRouter) {
  await router.push("/");
}
