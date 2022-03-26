import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { updateProfile } from "../apiCalls";
import AES from "crypto-js/aes";
import swal from "sweetalert";

export const useUpdateProfile = () => {
  let { user, dispatch } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: user.name,
      password: "",
      old_password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      if (data.password.trim() !== "") {
        data.password = AES.encrypt(
          data.password,
          "this is very secret"
        ).toString();
      }
      if (data.old_password.trim() == "") {
        // alert("must fill current password field to update user");
        return;
      } else {
        console.log("data.old_password>>>> ", data.old_password);
        data.old_password = AES.encrypt(
          data.old_password,
          "this is very secret"
        ).toString();
      }
      console.log("successfully update");
      const success = await updateProfile(data, dispatch);
      console.log("success result => ", success);
      if (success) {
        swal("Success", "Profile update successfully", "success");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open("/", "_self");
      } else {
        swal("Error", "Couldn't update profile contact support", "error");
      }
      reset();
    } catch (e) {
      console.log(e, "use home fetch error");
    }
  };

  return { register, handleSubmit, errors, onSubmit, user };
};
