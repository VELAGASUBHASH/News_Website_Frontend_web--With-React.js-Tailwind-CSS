export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidPassword = (password) => {
  // Minimum 6 characters
  return typeof password === "string" && password.length >= 6;
};

export const validateLoginForm = ({ email, password }) => {
  const errors = {};
  if (!email) errors.email = "Email is required";
  else if (!isValidEmail(email)) errors.email = "Enter a valid email";

  if (!password) errors.password = "Password is required";

  return errors;
};

export const validateRegisterForm = ({ name, email, password, confirmPassword }) => {
  const errors = {};
  if (!name || name.trim().length < 2) errors.name = "Name is required";

  if (!email) errors.email = "Email is required";
  else if (!isValidEmail(email)) errors.email = "Enter a valid email";

  if (!password) errors.password = "Password is required";
  else if (!isValidPassword(password))
    errors.password = "Password must be at least 6 characters";

  if (confirmPassword !== password)
    errors.confirmPassword = "Passwords do not match";

  return errors;
};