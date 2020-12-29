import { NextRouter } from "next/router";

export function goToHome(router: NextRouter) {
  router.push("/Home");
}

export function goToIndex(router: NextRouter) {
  router.push("/");
}
