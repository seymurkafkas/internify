import { NextRouter } from "next/router";
import { goToHome } from "../../services/navigation/";

export function studentAuthCheck(userObject, router: NextRouter) {
  if (userObject.loadingUser) {
    return false;
  }

  if ((userObject.user?.userType ?? null) === "Student") {
    return true;
  } else {
    (async () => {
      await goToHome(router);
    })();
    return false;
  }
}

export function employerAuthCheck(userObject, router: NextRouter) {
  if (userObject.loadingUser) {
    return false;
  }

  if ((userObject.user?.userType ?? null) === "Employer") {
    return true;
  } else {
    (async () => {
      await goToHome(router);
    })();
    return false;
  }
}
