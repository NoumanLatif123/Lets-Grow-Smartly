import React from "react";
import { Link } from "react-router-dom";
import signupUseForm from "./signupUseForm";
import validate from "./validateInfo";
import { useRedirectIfLogin } from "../../hooks/useRedirectIfLogin";
import { UserType } from "../../config/constants";
import "../../CSS/registeration.css";

const Signup = () => {
  const { onChange, handleSubmit, credentials, errors, uploadedImage } =
    signupUseForm(validate);

  const { redirectIfAlreadyLogin } = useRedirectIfLogin();
  redirectIfAlreadyLogin();

  function handleRadioChange(event) {
    credentials.usertype = event.target.value;
    onChange(event);
  }

  return (
    <>
      <div className="register-pic">
        <div className="registrationpic">
          <img src="assets/pictures/signuppic.png" alt="" />
        </div>
      </div>
      <section className="register-form">
        <form onSubmit={handleSubmit} className="register">
          <div className="register-form-container">
            <div className="line1"></div>

            <div className="register-form-heading">
              <h1>Sign Up</h1>
              <p>Please Fill the Form To Create Your Account</p>
            </div>
            {/*  <div className='register-form-avatar'>
                            <img src={uploadedImage} alt="img" className='register-form-avatar__img'/>
    </div> */}
            <div
              className="radioBtn"
              onChange={(event) => handleRadioChange(event)}
            >
              <label>
                <input type="radio" name="usertype" value="1" defaultChecked />
                <span>Patient</span>
              </label>
              <label>
                <input type="radio" name="usertype" value="2" />
                <span>Child Specialists</span>
              </label>
            </div>

            <div className="register-form-input">
              <label htmlFor="user"> User Name </label>
              <input
                placeholder="Username"
                type="text"
                name="name"
                id="name"
                value={credentials.name}
                onChange={onChange}
              />
              {errors.name && <p className="errorMessage">{errors.name}</p>}
            </div>

            <div className="register-form-input">
              <label htmlFor="email"> Email Address </label>
              <input
                placeholder="Email"
                type="email"
                name="email"
                id="email"
                value={credentials.email}
                onChange={onChange}
              />
              {errors.email && <p className="errorMessage">{errors.email}</p>}
            </div>

            {credentials.usertype === UserType.SPECIALIST && (
              <>
                {/*
                <div className="register-form-input">
                  <label htmlFor="qualification"> Qualification </label>
                  <input
                    placeholder="Qualification"
                    type="text"
                    name="qualification"
                    id="qualification"
                    value={credentials.qualification}
                    onChange={onChange}
                  />
                  {errors.qualification && (
                    <p className="errorMessage">{errors.qualification}</p>
                  )}
                </div>
                  */}
                <div className="register-form-input">
                  <label htmlFor="CertificateImg">
                    Upload Certification Scanned Copy{" "}
                  </label>
                  <input
                    placeholder="Certificate"
                    type="file"
                    name="CertificateImg"
                    id="CertificateImg"
                    //value={credentials.CertificateImg}
                    onChange={onChange}
                  />
                  {errors.CertificateImg && (
                    <p className="errorMessage">{errors.CertificateImg}</p>
                  )}
                </div>
              </>
            )}

            <div className="register-form-input">
              <label htmlFor="password"> Password </label>
              <input
                placeholder="Password"
                type="password"
                name="password"
                id="password"
                value={credentials.password}
                onChange={onChange}
              />
              {errors.password && (
                <p className="errorMessage">{errors.password}</p>
              )}
            </div>

            <div className="register-form-input">
              <label htmlFor="confirm password"> Confirm Password </label>
              <input
                placeholder="Confirm Password"
                type="password"
                name="cpassword"
                id="cpassword"
                value={credentials.cpassword}
                onChange={onChange}
              />
              {errors.cpassword && (
                <p className="errorMessage">{errors.cpassword}</p>
              )}
            </div>

            {/* <div className='register-form-input'>
                            <input
                                type="file"
                                name="picture"
                                accept="image/*"
                                onChange={onChange}
                            />
                        </div>
                    */}
            <div className="singup-padding">
              <button
                type="submit"
                className="registerButton-2"
                onSubmit={handleSubmit}
              >
                Sign Up
              </button>
            </div>
          </div>

          <div className="loginRegister-2">
            Already have an account?
            <span>
              <Link to="./login">Login</Link>
            </span>
          </div>
        </form>
      </section>
    </>
  );
};

export default Signup;
