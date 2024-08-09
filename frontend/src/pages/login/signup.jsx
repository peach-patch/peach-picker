import React, { useState } from "react";
import BasicBtn from "../../components/button/BasicBtn";
import Image from "next/image";
import peach_logo from "../../../public/peach_logo.png";
import kakao from "../../images/kakao_login.png";
import TermsOfService from "../../components/signup/TermsOfService";
import PrivacyPolicy from "../../components/signup/PrivacyPolicy";

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
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [termsVisible, setTermsVisible] = useState(false);
  const [privacyVisible, setPrivacyVisible] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleEmailVerification = async () => {
    if (!email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "이메일을 입력해 주세요.",
      }));
      return;
    }

    try {
      const response = await fetch("/api/users/send-verification-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setEmailSent(true);
        alert("이메일 인증 링크가 전송되었습니다.");
      } else {
        const data = await response.json();
        setMessage(data.message || "이메일 전송 실패");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("요청 실패");
    }
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
        <div className="mb-5 w-full justify-center flex items-center py-3 border-[1px] border-solid border-[#808080]">
          <Image src={kakao} width={20} alt="Kakao Login" />
          <div className="ml-5">카카오 로그인</div>
        </div>
        <div className="flex items-center w-full mb-5">
          <div className="w-5/12 h-[1px] border-[1px] border-[#808080]"></div>
          <div className="w-2/12 text-sm text-center text-gray-500">혹은</div>
          <div className="w-5/12 border-[1px] h-[1px] border-[#808080]"></div>
        </div>
        <div>Username</div>
        <div className="mb-1 w-full flex items-center py-3 bg-[#f8f8f8] border-[1px] border-solid border-[#808080]">
          <input
            type="text"
            className="bg-[#f8f8f8] ml-3 text-[20px] outline-none"
            placeholder="Enter username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {errors.name && (
          <div className="text-red-500 mb-3 text-[10px]">{errors.name}</div>
        )}

        <div>Email</div>
        <div className="flex w-full items-center">
          <div className="mb-1 w-full flex items-center py-3 bg-[#f8f8f8] border-[1px] border-solid border-[#808080]">
            <input
              type="email"
              className="bg-[#f8f8f8] ml-3 w-full text-[20px] outline-none flex-grow"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="text-white ml-2 w-28 bg-black h-12 hover:bg-black text-sm px-4 py-2 rounded"
            onClick={handleEmailVerification}
            disabled={emailSent}
          >
            {emailSent ? "이메일 전송됨" : "인증하기"}
          </button>
        </div>
        {errors.email && (
          <div className="text-red-500 mb-3 text-[10px]">{errors.email}</div>
        )}

        <div>Password</div>
        <div className="mb-1 w-full flex items-center py-3 bg-[#f8f8f8] border-[1px] border-solid border-[#808080]">
          <input
            type="password"
            className="bg-[#f8f8f8] ml-3 text-[20px] outline-none"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errors.password && (
          <div className="text-red-500 mb-3 text-[10px]">{errors.password}</div>
        )}

        <div>Confirm Password</div>
        <div className="mb-1 w-full flex items-center py-3 bg-[#f8f8f8] border-[1px] border-solid border-[#808080]">
          <input
            type="password"
            className="bg-[#f8f8f8] ml-3 text-[20px] outline-none"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
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
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <span className="ml-2 text-sm">이용약관에 동의함</span>
        </div>
        <div className="mt-5 mb-5">
          <PrivacyPolicy
            visible={privacyVisible}
            toggleVisibility={() => setPrivacyVisible(!privacyVisible)}
          />
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              checked={privacyAccepted}
              onChange={(e) => setPrivacyAccepted(e.target.checked)}
            />
            <span className="ml-2 text-sm">
              개인 정보 수집 및 이용에 동의함
            </span>
          </div>
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
