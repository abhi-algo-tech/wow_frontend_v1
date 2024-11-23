import { Input, Row, Col, Button, Select, DatePicker } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export const image_path = "/wow_images";

function Auth() {
  const navigate = useNavigate();
  const logo_path = "wow_logo";
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", true);
    navigate("/dashboard");
  };

  const handleSignUp = () => {
    // Logic to handle signup form submission can go here
    console.log("Signup successful");
    navigate("/dashboard");
  };

  const toggleAuthForm = () => {
    setIsLogin(!isLogin); // Switch between login and signup
  };

  return (
    <Row
      className="login-screen d-flex text-center align-items-center"
      style={{
        height: "100vh",
      }}
    >
      {/* Image section hidden for xs screens */}
      <Col
        xs={0}
        sm={12}
        md={12}
        lg={12}
        className="image-column d-flex text-center align-items-center"
      >
        <img
          className="login-image"
          src={`${image_path}/login_page_main.png`}
          alt="login_image"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Col>

      {/* Form Section */}
      <Col
        xs={24}
        sm={12}
        md={12}
        lg={12}
        className="form-column"
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className="logo-img">
          <img
            src={`${logo_path}/logo.png`}
            className="logo"
            alt="Logo"
            style={{ marginBottom: "20px" }}
          />
        </div>

        <div className="rectangle-23771" style={{ width: "100%" }}>
          <span className="form-header">
            {isLogin ? "Log in with email" : "Sign up"}
          </span>
          <hr />

          {/* Conditional Rendering for Login or Sign Up */}
          {isLogin ? (
            <>
              {/* Login Form */}
              <Input
                className="input-23775"
                placeholder="Username"
                style={{ marginBottom: "10px" }}
                prefix={
                  <img
                    className="input-icons"
                    src={`${image_path}/Vector@2x.png`}
                    alt="username_icon"
                  />
                }
              />
              <Input.Password
                className="input-23775"
                placeholder="Password"
                style={{ marginBottom: "10px" }}
                prefix={
                  <img
                    className="input-icons"
                    src={`${image_path}/Vector@2x-1.png`}
                    alt="password_icon"
                  />
                }
              />
              <Button
                className="login"
                onClick={handleLogin}
                style={{ width: "100%", marginBottom: "10px" }}
              >
                Login
              </Button>

              <div>
                <span className="Forgot-Password">Forgot Password?</span>
              </div>
              <span className="Dont-have-an-account-Sign-up">
                Don’t have an account?
                <span
                  className="text-style-1"
                  style={{ cursor: "pointer" }}
                  onClick={toggleAuthForm}
                >
                  {" "}
                  Sign up
                </span>
              </span>
            </>
          ) : (
            <>
              {/* Sign Up Form */}
              <Input
                className="input-23775"
                placeholder="Name"
                style={{ marginBottom: "10px" }}
                prefix={
                  <img
                    className="input-icons"
                    src={`${image_path}/Vector@2x.png`}
                    alt="name_icon"
                  />
                }
              />
              <Input
                className="input-23775"
                placeholder="Email"
                style={{ marginBottom: "10px" }}
                prefix={
                  <img
                    className="input-icons"
                    src={`${image_path}/Vector@2x.png`}
                    alt="email_icon"
                  />
                }
              />
              <Input
                className="input-23775"
                placeholder="Phone"
                style={{ marginBottom: "10px" }}
                prefix={
                  <img
                    className="input-icons"
                    src={`${image_path}/Vector@2x.png`}
                    alt="phone_icon"
                  />
                }
              />
              <Input
                className="input-23775"
                placeholder="Address"
                style={{ marginBottom: "10px" }}
                prefix={
                  <img
                    className="input-icons"
                    src={`${image_path}/Vector@2x.png`}
                    alt="address_icon"
                  />
                }
              />
              <Input
                className="input-23775"
                placeholder="Pincode"
                style={{ marginBottom: "10px" }}
                prefix={
                  <img
                    className="input-icons"
                    src={`${image_path}/Vector@2x.png`}
                    alt="pincode_icon"
                  />
                }
              />
              <Row gutter={24} className="align-items-center">
                <Col>
                  <DatePicker
                    className="input-23775"
                    placeholder="Date of Birth"
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                </Col>
                <Col>
                  <Select placeholder="Gender" className="w-100 input-23775">
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                    <Select.Option value="other">Other</Select.Option>
                  </Select>
                </Col>
              </Row>

              <Button
                className="signup"
                onClick={handleSignUp}
                classNames={"w-100 mb-3"}
              >
                Sign Up
              </Button>

              <span className="Dont-have-an-account-Sign-up">
                Already have an account?
                <span
                  className="text-style-1"
                  style={{ cursor: "pointer" }}
                  onClick={toggleAuthForm}
                >
                  {" "}
                  Log in
                </span>
              </span>
            </>
          )}
        </div>
      </Col>
    </Row>
  );
}

export default Auth;
