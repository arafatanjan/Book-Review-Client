"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { registerUser } from "@/utils/actions/registerUser";
import { useRouter } from "next/navigation";
import { loginUser } from "@/utils/actions/loginUser";
import { storeUserInfo } from '@/services/auth.services';

export type UserData = {
  username?: string;
  email: string;
  password: string;
};

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

interface LoginFormData {
  usernameOrEmail: string;
  password: string;
}

const RegisterPage = () => {
  const [isRegister, setIsRegister] = useState<boolean>(true);
  const [registerForm, setRegisterForm] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
  });

  const [loginForm, setLoginForm] = useState<LoginFormData>({
    usernameOrEmail: "",
    password: "",
  });

  const handleToggleForm = () => {
    setIsRegister(!isRegister);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>();

  const router = useRouter();

  const onSubmit = async (data: UserData) => {
    // console.log(data);

    try {
      const res = await registerUser(data);
      // console.log(res)
      if (res.success) {
        alert(res.message);
        // router.push("/login");
        // console.log(res)
        router.refresh();
         router.push("/login");
      }
    } catch (err: any) {
      // console.error(err.message);
      throw new Error(err.message);
    }
  };

  const onSubmitlog = async (data: UserData) => {
     
    try {
      const res = await loginUser(data);
      // console.log(res);
      // if (res.success) {
      //   alert(res.message);
      //   localStorage.setItem('accessToken', res.accessToken)
      //   router.push("/");
      //   //console.log( localStorage.setItem)
      // }
      if (res?.success) {
        alert(res.message);
        storeUserInfo({ accessToken: res?.accessToken });
        router.push("/dashboard");
        router.refresh();
         
     }
    } catch (err: any) {
      // console.error(err.message);
      throw new Error(err.message);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={toggleStyle}>
        <h3
          style={{
            marginRight: "10px",
            color: isRegister ? "#ccc" : "#333",
            fontWeight: !isRegister ? "bold" : "normal",
            cursor: "pointer",
          }}
          onClick={handleToggleForm}
        >
          Login
        </h3>
        <h3
          style={{
            color: isRegister ? "#333" : "#ccc",
            fontWeight: isRegister ? "bold" : "normal",
            cursor: "pointer",
          }}
          onClick={handleToggleForm}
        >
          Register
        </h3>
      </div>

      {isRegister ? (
        <div>
          <p style={textStyle}>
            There are many advantages to creating an account: Use dashboard for more features
          </p>


          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              {...register("username")}
              placeholder="User Name"
              className="input input-bordered"
              style={inputStyle}
              required
            />
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="input input-bordered"
              style={inputStyle}
              required
            />
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="input input-bordered"
              style={inputStyle}
              required
            />

            <p style={privacyTextStyle}>
              Your personal data will be used to support your experience
              throughout this website, and for purposes described in our{" "}
              <a href="#" style={{ color: "#6a2fda" }}>
                privacy policy
              </a>
              .
            </p>

            <button type="submit" style={buttonStyle}>
              Register
            </button>
          </form>
        </div>
      ) : (
        <div>
          <p style={textStyle}>
            If you have an account, sign in with your username or email address.
          </p>


          <form onSubmit={handleSubmit(onSubmitlog)}>
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="input input-bordered"
              style={inputStyle}
              required
            />

            <input
              {...register("password")}
              type="password"
              placeholder="Email"
              className="input input-bordered"
              style={inputStyle}
              required
            />
            <div style={{ textAlign: "left", marginBottom: "20px" }}>
              <label>
                <input type="checkbox" style={{ marginRight: "5px" }} />
                Remember me
              </label>
              <a href="#" style={{ float: "right", color: "#6a2fda" }}>
                Lost your password?
              </a>
            </div>
            <button type="submit" style={buttonStyle}>
              Log in
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  maxWidth: "400px",
  margin: "60px auto",
  textAlign: "center",
  padding: "10px",
  width: "90%",
  height: '68vh'
};

const toggleStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "20px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#6a2fda",
  color: "#fff",
  padding: "12px 20px",
  border: "none",
  borderRadius: "5px",
  width: "100%",
  cursor: "pointer",
  fontWeight: "bold",
};

const textStyle: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "1.5",
};

const privacyTextStyle: React.CSSProperties = {
  fontSize: "12px",
  marginTop: "20px",
};

const styles = `
@media (max-width: 600px) {
  .container {
    padding: 10px;
  }
  .input {
    width: 100%;
    font-size: 16px;
  }
  .button {
    font-size: 16px;
  }
  .text {
    font-size: 14px;
  }
}
`;

export default RegisterPage;
