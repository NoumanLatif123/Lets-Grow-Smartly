const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
export default function validateInfo(credentials) {
  let errors = {};

  if (!credentials.name.trim()) {
    errors.name = "Username required";
  } else if (!/^[A-Za-z]+/.test(credentials.name.trim())) {
    errors.name = "Enter a valid name";
  } else if (credentials.name.length < 5) {
    errors.name = "Name needs to be 5 characters or more";
  }

  if (!credentials.email) {
    errors.email = "Email required";
  } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
    errors.email = "Please enter a valid email.com";
  } else if (!validateEmail(credentials.email)) {
    errors.email = "Please enter a valid email.com";
  } else if (
    !credentials.email.includes("@gmail.com") &&
    !credentials.email.includes("@yahoo.com") &&
    !credentials.email.includes("@hotmail.com") &&
    !credentials.email.includes("@outlook.com")
  ) {
    errors.email = "Please enter a valid email.com e.g. xyz@gmail.com";
  }
  if (!credentials.password) {
    errors.password = "Password is required";
  } else if (credentials.password.length < 5) {
    errors.password = "Password needs to be 5 characters or more";
  }

  if (!credentials.cpassword) {
    errors.cpassword = "Password is required";
  } else if (credentials.cpassword !== credentials.password) {
    errors.cpassword = "Passwords do not match";
  }
  // if (!credentials.qualification.trim()) {
  //   errors.qualification = "Qualification required";
  // } else if (!/^[A-Za-z]+/.test(credentials.qualification.trim())) {
  //   errors.qualification = "Enter a valid Qualification";
  // } else if (credentials.qualification.length < 3) {
  //   errors.qualification =
  //     "Qualification name needs to be 3 characters or more";
  //}
  else if (!credentials.CertificateImg) {
    errors.CertificateImg = "select a certificate";
  }

  return errors;
}
