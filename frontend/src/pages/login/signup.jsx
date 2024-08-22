import React, { useState } from "react";
import BasicBtn from "../../components/button/BasicBtn";
import Image from "next/image";
import peach_logo from "../../../public/peach_logo.png";
import kakao from "../../images/kakao_login.png";
import TermsOfService from "../../components/signup/TermsOfService";
import PrivacyPolicy from "../../components/signup/PrivacyPolicy";
import EmailVerification from "../../components/signup/EmailVerification";
import KakaoSignup from "../../components/signup/KakaoSignup";
import Input from "@/components/login/Input";
import CheckBox from "@/components/login/CheckBox";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [termsVisible, setTermsVisible] = useState(false);
  const [privacyVisible, setPrivacyVisible] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowWarning(false);

    let hasError = false;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!name) {
      newErrors.name = "필수정보입니다.";
      hasError = true;
    }
    if (!email) {
      newErrors.email = "필수정보입니다.";
      hasError = true;
    } else if (!isEmailValid) {
      newErrors.email = "이메일 형식이 올바르지 않습니다.";
      hasError = true;
    }
    if (!password) {
      newErrors.password = "필수정보입니다.";
      hasError = true;
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "필수정보입니다.";
      hasError = true;
    }
    if (password !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      hasError = true;
    }
    if (!isVerified) {
      alert("이메일 인증을 완료해 주세요.");
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      return;
    }

    if (!termsAccepted || !privacyAccepted) {
      setShowWarning(true);
      return;
    }

    try {
      const response = await fetch("/api/users/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const responseData = await response.text();
      try {
        const data = JSON.parse(responseData);
        if (response.ok) {
          localStorage.setItem("token", data.token);
          sessionStorage.setItem("token", data.token);
          alert("회원가입이 완료되었습니다.");
          window.location.href = "/";
        } else {
          setMessage(data.message || "회원가입 실패");
        }
      } catch (error) {
        if (response.ok) {
          localStorage.setItem("token", responseData.token);
          sessionStorage.setItem("token", responseData.token);
          localStorage.setItem("email", email);
          localStorage.setItem("userName", name);
          alert("회원가입이 완료되었습니다.");
          window.location.href = "/";
        } else {
          setMessage(responseData || "회원가입 실패");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("요청 실패");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mb-10 ">
      <Image
        src={peach_logo}
        width={200}
        alt="Peach Logo"
        className="hidden sm:flex"
      />
      <form className="w-1/4 mt-10 min-w-60" onSubmit={handleSubmit}>
        <KakaoSignup />

        <div className="flex items-center w-full mb-5">
          <div className="w-5/12 h-[1px] border-[1px] border-black"></div>
          <div className="w-2/12 text-sm text-center">혹은</div>
          <div className="w-5/12 border-[1px] h-[1px] border-black"></div>
        </div>
        <Input
          title="Username"
          type="text"
          placeholder="Enter username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && (
          <div className="text-red-500 mb-3 text-[10px]">{errors.name}</div>
        )}

        <div className="flex items-center w-full mt-4">
          <EmailVerification
            email={email}
            onEmailChange={handleEmailChange}
            setVerificationStatus={setIsVerified}
          />
        </div>
        {!isEmailValid && (
          <div className="text-red-500 mb-3 text-[10px]">
            이메일 형식이 올바르지 않습니다.
          </div>
        )}
        {errors.email && (
          <div className="text-red-500 mb-3 text-[10px]">{errors.email}</div>
        )}

        <Input
          title="Password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <div className="text-red-500 mb-3 text-[10px]">{errors.password}</div>
        )}

        <Input
          title="Confirm Password"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && (
          <div className="text-red-500 mb-3 text-[10px]">
            {errors.confirmPassword}
          </div>
        )}

        <div className="text-red-500 mb-5 text-[10px]">{message}</div>
        <TermsOfService
          visible={termsVisible}
          toggleVisibility={() => setTermsVisible(!termsVisible)}
        />
        <CheckBox
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          text="이용약관에 동의함"
        />

        <div className="mt-5 mb-5">
          <PrivacyPolicy
            visible={privacyVisible}
            toggleVisibility={() => setPrivacyVisible(!privacyVisible)}
          />
          <CheckBox
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            text="개인 정보 수집 및 이용에 동의함"
          />
        </div>

        {showWarning && (
          <div className="text-red-500 mb-3 text-[10px]">
            이용약관 및 개인정보 수집에 모두 동의해야 합니다.
          </div>
        )}

        <BasicBtn
          text={"Submit"}
          bgColor={"#fb5e67"}
          textColor={"#fff"}
          type="submit"
        />
      </form>
    </div>
  );
};

export default Signup;
