import React, { useState } from "react";
import {
  Layout,
  Row,
  Col,
  Select,
  DatePicker,
  Card,
  Input,
  Button,
  Typography,
  Space,
} from "antd";

import {
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { image_path } from "./Login";
import { useNavigate } from "react-router-dom";

const { Title, Text, Link } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const logo_path = "wow_logo";
  const [isLogin, setIsLogin] = useState(true);
  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", true);
    navigate("/dashboard");
  };

  const toggleAuthForm = () => {
    setIsLogin(!isLogin); // Switch between login and signup
  };

  const handleSignUp = () => {
    // Logic to handle signup form submission can go here
    console.log("Signup successful");
    navigate("/dashboard");
  };
  return (
    <Row
      className="justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      {/* Image column - Hidden on screens smaller than md */}
      <Col
        xs={0}
        md={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          className="login-image"
          src={`${image_path}/login_page_main.png`}
          alt="Colorful children's illustration"
          style={{ maxWidth: "100%", height: "auto" }} // Make image responsive
        />
      </Col>

      {/* Card column */}
      <Col xs={24} md={12} className="d-flex justify-content-center p-3">
        <Space
          direction="vertical"
          size="large"
          className="text-center"
          style={{ width: "100%" }}
        >
          <img src={`${logo_path}/logo.png`} className="logo" alt="Logo" />
          <div className="rectangle-23771" style={{ width: "100%" }}>
            <span className="form-header">
              {isLogin ? "Log in with email" : "Sign up"}
            </span>
            <hr />

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
                <Row gutter={24}>
                  <Col span={12}>
                    <DatePicker
                      className="input-23775"
                      placeholder="Date of Birth"
                      style={{ width: "100%", marginBottom: "10px" }}
                    />
                  </Col>
                  <Col span={12}>
                    <Select placeholder="Gender" className="w-100">
                      <Select.Option value="male">Male</Select.Option>
                      <Select.Option value="female">Female</Select.Option>
                      <Select.Option value="other">Other</Select.Option>
                    </Select>
                  </Col>
                </Row>
                <Button
                  className="login"
                  onClick={handleSignUp}
                  style={{ width: "100%", marginBottom: "10px" }}
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
        </Space>
      </Col>
    </Row>
  );
};

export default LoginPage;
