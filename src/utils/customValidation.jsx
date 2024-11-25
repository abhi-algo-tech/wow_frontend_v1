export const validateMinMaxAge = (_, value, form) => {
  const minYear = form.getFieldValue("minAgeYear") || 0;
  const minMonth = form.getFieldValue("minAgeMonth") || 0;
  const maxYear = form.getFieldValue("maxAgeYear") || 0;
  const maxMonth = form.getFieldValue("maxAgeMonth") || 0;

  const totalMinMonths = minYear * 12 + minMonth;
  const totalMaxMonths = maxYear * 12 + maxMonth;

  if (totalMaxMonths >= totalMinMonths) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error("Max Age must not be less than Min Age."));
  }
};
