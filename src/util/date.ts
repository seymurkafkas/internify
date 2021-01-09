const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function enrolledItemTransformDate(enrolledItemContainer) {
  enrolledItemContainer.forEach((enrolledItem) => {
    for (let i = 1; i >= 0; i -= 1) {
      if (enrolledItem.range[i]) {
        enrolledItem.range[i] = enrolledItem.range[i].toDate();
      }
    }
  });
}

export function stringifyDate(date: Date) {
  return date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
}
