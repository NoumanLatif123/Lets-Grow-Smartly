import { useState } from "react";
import { useHistory } from "react-router-dom";
import AES from "crypto-js/aes";
import swal from "sweetalert";
import { register } from "../../apiCalls";
import { UserType } from "../../config/constants";
import axios from "axios";
var validator = require("email-validator");

const SignupUseForm = (validate) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    qualification: "",
    usertype: "1",
    picture: "",
    CertificateImg: "",
  });
  const [uploadedImage, setUploadedImage] = useState(
    "assets/pictures/dummyavatar.jpg"
  );
  let history = useHistory();
  const [errors, setErrors] = useState({});
  const [certificateImgUrl, setCertificateImgUrl] = useState();

  const validateEmail = (email) => {
    console.log("validating email>>>> ", email);
    let test;
    let length = email.length;
    let demail = email.slice(length - 4, length);
    console.log("demail>>>", demail);
    if (demail !== ".com") {
      setErrors({ errors, email: "Please enter a valid email" });

      return false;
    }
    let count = 0;
    let email2 = email.slice(0, length - 4);
    if (email2.includes(".com")) {
      setErrors({ errors, email: "Please enter a valid email" });
      return false;
    }
    if (
      !email.includes("@gmail.com") &&
      !email.includes("@yahoo.com") &&
      !email.includes("@hotmail.com") &&
      !email.includes("@outlook.com")
    ) {
      setErrors({ errors, email: "Please enter a valid email" });
      return false;
    }
    if (!validator.validate(credentials.email)) {
      setErrors({ errors, email: "Please enter a valid email" });
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validate(credentials));
    // console.log("handle submit", errors);
    const {
      name,
      email,
      password,
      qualification,
      usertype,
      CertificateImg,
      picture,
    } = credentials;
    // console.log("email", credentials.email);
    // console.log(
    //   "credentials.email valid",
    //   validator.validate(credentials.email)
    // );
    // console.log("errors.email", errors.email);
    if (!credentials.password) {
      errors.password = "Password is required";
    } else if (credentials.password.length < 5) {
      errors.password = "Password needs to be 5 characters or more";
    } else if (!credentials.cpassword) {
      errors.cpassword = "Password is required";
    } else if (credentials.cpassword !== credentials.password) {
      errors.cpassword = "Passwords do not match";
    } else if (!validateEmail(credentials.email)) {
      setErrors({ errors, email: "Please enter a valid email" });
    } else if (credentials.usertype === "2" && !credentials.CertificateImg) {
      console.log("errorrs", errors);
    } else {
      // console.log("errors>", errors);
      // if (!Object.getOwnPropertyNames(errors).length === 0) {
      //   return;
      // }
      //console.log("test>>>>", !Object.getOwnPropertyNames(errors).length === 0);
      var pass = AES.encrypt(password, "this is very secret").toString();
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("pass", pass);
      formData.append("qualification", qualification);
      formData.append("picture", picture);
      formData.append("usertype", usertype);
      formData.append("certificateImg", certificateImgUrl);
      // console.log("certificateImgUrl>>>> ", certificateImgUrl);
      const response = await register(formData);
      if (response?.data?.success) {
        //console.log("res at signup>> ", response?.data);
        if (credentials.usertype === UserType.SPECIALIST) {
          swal("Good job!", "Please wait for the admin approval!", "success");
          console.log("credentials>>>>>>>>>>>>>>>>>", credentials);

          //send notifications

          axios
            .post(`http://localhost:5000/api/notifications/`, {
              forAdmins: true,
              text: `${credentials.name} requested an approval.`,
              read: false,
            })
            .then((res) => {
              console.log("request approval notification>> ", res.data);
            })
            .catch((err) => {
              console.log(err);
            });
          history.push("/signup");
        } else {
          swal(
            "Good job!",
            "Your Account has been Created Successfully",
            "success"
          );
          history.push("/signup");
        }
      } else {
        swal(
          "Error!",
          "Something went wrong contact support for assistance",
          "error"
        );
      }
    }
  };

  const onChange = (e) => {
    const isFileType = e.target.type === "file";
    //const value = isFileType ? e.target.files[0].name : e.target.value;
    const value = e.target.value;
    if (isFileType) {
      const imgFile = e.target.files[0];
      console.log("file at signUp>>> ", imgFile);
      //setUploadedImage(URL.createObjectURL(value));
      if (imgFile.name !== "") {
        const formData = new FormData();
        formData.append("img", imgFile);

        axios
          .post("http://localhost:5000/api/upload", formData)
          .then((r) => {
            /*console.log(r);*/
          })
          .catch((e) => {
            console.log(e);
          });
      }
      setCertificateImgUrl(`http://localhost:5000/api/upload/${imgFile?.name}`);
      // value = imgFile;
    }
    setCredentials({ ...credentials, [e.target.name]: value });
  };

  return { onChange, handleSubmit, credentials, errors, uploadedImage };
};

export default SignupUseForm;
