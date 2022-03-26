import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import validationInfo from "./validationInfo";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { setAuthToken } from "../../utils/setAuthToken";
import swal from "sweetalert";

const LoginUseForm = () => {
  const { user } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let history = useHistory();
  const { isFetching, dispatch } = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validationInfo(credentials));

    const data = await loginCall(
      { email: credentials.email, password: credentials.password },
      dispatch
    );
    if (data?.success) {
      localStorage.removeItem("token");
      localStorage.setItem("token", data.authtoken);
      setAuthToken(data.authtoken);

      if (data.userData.userRole === "2") {
        history.push("/profile");
      } else {
        history.push("/");
      }
    } else {
      swal("Error", "Invalid Credentials", "error");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return { onChange, handleSubmit, credentials, errors, user };
};

export default LoginUseForm;
