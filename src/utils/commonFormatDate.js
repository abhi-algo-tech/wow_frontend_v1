export const formatDate = (dob) => {
  const date = new Date(dob);
  const options = { month: "long", day: "2-digit", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const now = new Date();
  let years = now.getFullYear() - date.getFullYear();
  let months = now.getMonth() - date.getMonth();
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return `${formattedDate} (${years} years ${months} months)`;
};
