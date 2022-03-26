import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

export const useRedirectIfLogin = (_) => {
  const { user } = useContext(AuthContext);
  let history = useHistory();

  function redirectIfAlreadyLogin() {
    //console.log("user at redirectio>>> ", user);
    if (user) {
      user.userRole === "2" ? history.push("/profile") : history.push("/");
    }
  }

  return { redirectIfAlreadyLogin };
};
