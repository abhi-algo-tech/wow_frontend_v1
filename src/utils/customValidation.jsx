export const validateMinMaxAge = (_, value, form) => {
  const minYear = form.getFieldValue("minAgeYear") || 0;
  const minMonth = form.getFieldValue("minAgeMonth") || 0;
  const maxYear = form.getFieldValue("maxAgeYear") || 0;
  const maxMonth = form.getFieldValue("maxAgeMonth") || 0;

  const totalMinMonths = minYear * 12 + minMonth;
  const totalMaxMonths = maxYear * 12 + maxMonth;

  // Check if totalMinMonths is less than 2
  if (totalMinMonths < 2) {
    return Promise.reject(new Error("Age must be at least 2 months."));
  }

  if (totalMaxMonths > totalMinMonths) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error("Invalid Age Range."));
  }
};
