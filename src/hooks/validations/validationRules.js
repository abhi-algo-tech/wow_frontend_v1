export const requiredRule = (message = "This field is required") => ({
  required: true,
  message,
});

export const emailRule = {
  type: "email",
  message: "Please enter a valid email",
};

export const phoneNumberRule = {
  pattern: /^\d{10,10}$/,
  message: "Please enter a valid phone number (10 digits)",
};

export const nameRule = {
  pattern: /^[a-zA-Z\s]*$/,
  message: "Name can only contain letters",
};
