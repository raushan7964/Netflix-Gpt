const checkValidate = ( email, password) => {
  

  // Email regex
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  // Password regex (min 8 chars, at least 1 letter & 1 number)
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const emailValid = emailRegex.test(email);
  const passwordValid = passwordRegex.test(password);

  if (!emailValid) return "Email is not valid";
  if (!passwordValid) return "Password is not valid";

  return null; // ✅ Everything valid
};

export default checkValidate;
