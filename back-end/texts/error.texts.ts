export const errorTexts = {
  common: {
    jwtError: "JWT_SECRET not found in .env",
    500: 'Internal Server Error'
  },
  auth: {
    unauthorized: "Unauthorized. Please login first",
    confirmPassword: "Password don't match",
    userExist: "Username already exist",
    invalidUser: "Invalid user data",
    notFound: "User not found",
    passwordError: "Password not correct"
  },
  message: {
    notEmpty: "Message not be empty"
  }
};
