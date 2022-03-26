import React from 'react';
import {Link} from 'react-router-dom';
import '../../CSS/registeration.css';
import loginUseForm from './loginUseForm';
import ValidationInfo from './validationInfo';
import {useRedirectIfLogin} from "../../hooks/useRedirectIfLogin";

const Login = () => {

    const {onChange, handleSubmit, credentials, errors} = loginUseForm(ValidationInfo);
    const {redirectIfAlreadyLogin} = useRedirectIfLogin();

    redirectIfAlreadyLogin();

    return (

        <>
        <div className='register-pic'> 
            <div className="registrationpic">
                <img src="assets/pictures/loginpic.png" alt=""/>
            </div>
        </div>
            <div className="register-form">
                <form onSubmit={handleSubmit}>
                    <div className="loginBox">
                        <div className='line1'></div>
                        <h1>Login</h1>
                        <p>Welcome Back! Please Login To Your Account</p>
                        <i className="fas fa-user-circle fas-custom"/>
                        <label htmlFor="email" className='label1'> Email Address </label>
                        <input placeholder="Email" type="email" name="email" id="email" className="loginInput"
                               value={credentials.email} onChange={onChange}/>
                        {errors.email && <p1>{errors.email}</p1>}
                        <label htmlFor="password" className='label2'>Password </label>
                        <input placeholder="Password" type="password" name="password" id="password"
                               className="loginInput1" value={credentials.password} onChange={onChange}/>
                        {errors.password && <p1>{errors.password}</p1>}

                        <button type="submit" className="loginButton" onSubmit={handleSubmit}>Login</button>
                        <div className="loginRegister">
                            Want to create a new account?
                            <span><Link to='./signup'>Sign Up</Link></span>
                        </div>
                    </div>
                </form>
            </div>
        </>


    )
}

export default Login