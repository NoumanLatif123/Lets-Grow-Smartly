
export default function validationInfo(credentials) {
    let errors = {};
  
    if (!credentials.email) {
      errors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      errors.email = 'Please enter a valid email.com';
    }
    if (!credentials.password) {
      errors.password = 'Password is required';
    } else if (credentials.password.length < 5) {
      errors.password = 'Password needs to be 5 characters or more';
    }
  
    return errors;
  }