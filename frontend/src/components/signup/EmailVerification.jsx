import React, { useState, useEffect } from "react";

const EmailVerification = ({ email, onEmailChange, setVerificationStatus }) => {
  const [emailSent, setEmailSent] = useState(false);
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(600);

  useEffect(() => {
    let countdown;
    if (emailSent && !isVerified) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [emailSent, isVerified]);

  useEffect(() => {
    if (timer <= 0) {
      setTimer(0);
      setVerificationStatus(false);
    }
  }, [timer, setVerificationStatus]);

  const handleEmailVerification = async () => {
    if (!email) {
      alert("이메일을 입력해 주세요.");
      return;
    }

    try {
      const response = await fetch(
        `/api/users/code/send?email=${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setEmailSent(true);
        setShowVerificationInput(true);
        setTimer(600);
        alert("이메일 인증 링크가 전송되었습니다.");
      } else {
        const data = await response.json();
        alert(data.message || "이메일 전송 실패");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("요청 실패");
    }
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleVerificationCheck = async () => {
    if (timer <= 0) {
      alert("유효시간이 만료되었습니다. 재인증해주세요.");
      return;
    }

    if (!verificationCode) {
      alert("인증번호를 입력해 주세요.");
      return;
    }

    try {
      const response = await fetch(
        `/api/users/code/verify?email=${encodeURIComponent(
          email
        )}&code=${encodeURIComponent(verificationCode)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setIsVerified(true);
        setVerificationStatus(true);
        alert("이메일 인증이 완료되었습니다.");
      } else {
        alert("인증번호가 일치하지 않습니다.");
        setIsVerified(false);
        setVerificationStatus(false);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("인증 확인 요청 실패");
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="w-full flex-col items-center">
      <div>Email</div>
      <div className="flex w-full items-center">
        <div className="mb-1 w-full flex items-center py-3 bg-[#f8f8f8] border-[1px] border-solid border-[#808080]">
          <input
            type="email"
            className="bg-[#f8f8f8] ml-3 w-full text-[20px] outline-none flex-grow"
            placeholder="Enter email"
            value={email}
            onChange={onEmailChange}
          />
        </div>
        <button
          type="button"
          className="text-white ml-2 w-28 bg-black h-12 hover:bg-black text-sm px-4 py-2 rounded"
          onClick={handleEmailVerification}
        >
          {emailSent ? "재전송" : "인증하기"}
        </button>
      </div>
      {showVerificationInput && (
        <div className="mb-1 w-full flex flex-col items-center">
          <div className="flex w-full items-center py-3 bg-[#f8f8f8] border-[1px] border-solid border-[#808080] mt-2">
            <input
              type="text"
              className="bg-[#f8f8f8] ml-3 text-[20px] outline-none w-full"
              placeholder="인증번호 입력"
              value={verificationCode}
              onChange={handleVerificationCodeChange}
            />
            <div className="text-red-500 w-32 text-right text-sm mr-3 ml-3">
              {timer > 0 ? formatTime(timer) : "시간초과"}
            </div>
          </div>
          <button
            type="button"
            className="text-white mt-2 w-28 bg-black h-12 hover:bg-black text-sm px-4 py-2 rounded"
            onClick={handleVerificationCheck}
          >
            확인
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
