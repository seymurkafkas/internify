export function enrolledItemTransformDate(enrolledItemContainer) {
  enrolledItemContainer.forEach((enrolledItem) => {
    for (let i = 1; i >= 0; i -= 1) {
      if (enrolledItem.range[i]) {
        enrolledItem.range[i] = enrolledItem.range[i].toDate();
      }
    }
  });
}
