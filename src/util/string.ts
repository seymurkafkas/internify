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
 * @returns {boolean} - The strings are equal
 */
export function areEqual(string1: string, string2: string) {
  if (string1 === "" || string2 === "") {
    return false;
  }
  return string1.localeCompare(string2) === 0;
}
