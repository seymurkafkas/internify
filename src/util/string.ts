import { stringifyDate } from "./date";

/**
 * @param {string} email- Email which will be checked
 * @returns {boolean} -The email matches the email format
 */

export function isEmailValid(email: string) {
  if (email === "") {
    return false;
  }
  const mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(mailformat)) {
    return true;
  }
  return false;
}

/**
 * @param {string} string1 - The first string
 * @param {string} string2 - The second string
 * @returns {boolean} - Whether the strings are equal
 */

export function areEqual(string1: string, string2: string) {
  if (string1 === "" || string2 === "") {
    return false;
  }
  return string1.localeCompare(string2) === 0;
}

export function formatName(name: string) {
  if (!name) {
    return "Undeclared";
  }
  return name;
}

export function formatTitle(title: string) {
  if (!title) {
    return "Undeclared";
  }
  return title;
}

export function formatEducation(education) {
  let educationString = "Undeclared";

  if (education.length !== 0) {
    if (education[0].degreeName) {
      if (education[0].institutionName) {
        educationString = `${education[0]?.degreeName} at ${education[0].institutionName}`;
      } else {
        educationString = education[0].degreeName;
      }
    } else if (education[0].institutionName) {
      educationString = `Studied at ${education[0].institutionName}`;
    }
  }

  return educationString;
}

export function formatPosition(experience) {
  let positionString = "Undeclared";
  if (experience.length !== 0) {
    if (experience[0].positionName) {
      if (experience[0].companyName) {
        positionString = `${experience[0]?.positionName} at ${experience[0].companyName}`;
      } else {
        positionString = experience[0].positionName;
      }
    } else if (experience[0].companyName) {
      positionString = `Works at ${experience[0].companyName}`;
    }
  }
  return positionString;
}

export function formatLocation(location) {
  let locationString = "Undeclared";

  if (location.city && location.country) {
    locationString = `${location.city}, ${location.country}`;
  } else if (!location.city && !location.country) {
    return locationString;
  } else {
    locationString = `${location?.city ?? ""}${location?.country ?? ""}`;
  }

  return locationString;
}

/* istanbul ignore next */
export function formatDeadline(deadline) {
  return stringifyDate(deadline?.toDate() ?? null);
}
