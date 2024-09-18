import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useAuthStore from "../../store/authStore";
import Input from "@/components/login/Input";
import Button from "@/components/button/Button";
import CropProfileImg from "@/components/login/CropProfileImg";
import Modal from "@/components/common/Modal"; // 모달 컴포넌트

export default function Edit() {
  const { isLoggedIn, token, isInitialized, initialize, logout } =
    useAuthStore(); // 로그아웃 추가
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 회원정보 수정 모달
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 탈퇴 모달 상태
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [initialize, isInitialized]);

  useEffect(() => {
    if (isInitialized && !isLoggedIn) {
      setMessage("로그인이 필요합니다.");
      router.push("/login");
    } else if (isInitialized && isLoggedIn) {
      const storedName = localStorage.getItem("userName");
      const storedEmail = localStorage.getItem("email");
      setEmail(storedEmail || "");
      setUsername(storedName || "");
    }
  }, [isInitialized, isLoggedIn, token, router]);

  // 회원정보 수정
  const handleUpdateProfile = async () => {
    if (!username) {
      setMessage("사용자 이름을 입력해야 합니다.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", username);
      if (profileImg) {
        formData.append("profileImg", profileImg);
      }

      const response = await fetch("/api/users/profile", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("프로필 업데이트에 실패했습니다.");
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        localStorage.setItem("email", data.email);
        localStorage.setItem("userName", data.name);
        localStorage.setItem("profileImg", data.profileUrl);
      }

      setMessage("프로필이 성공적으로 업데이트되었습니다.");
      setIsModalOpen(true); // 수정 성공 모달 열기
    } catch (error) {
      console.error("Error:", error);
      setMessage("프로필 업데이트에 실패했습니다.");
    }
  };

  // 탈퇴 처리
  const handleDeleteAccount = async () => {
    try {
      const response = await fetch("/api/users/profile", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("탈퇴에 실패했습니다.");
      }

      setMessage("탈퇴가 성공적으로 완료되었습니다.");
      logout(); // 로그아웃 처리
      setIsDeleteModalOpen(false); // 탈퇴 모달 닫기
      router.push("/"); // 메인 페이지로 리다이렉트
    } catch (error) {
      console.error("탈퇴 오류:", error);
      setMessage("탈퇴에 실패했습니다.");
    }
  };

  // 모달 닫기 및 페이지 이동
  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push("/mypage");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-2/3 mb-20 relative max-w-[606px] flex flex-col">
        <div className="relative mb-1 mt-15 left-0 w-[103px] h-[38px] text-[20px] flex flex-col justify-center">
          회원 정보
        </div>
        <div className="w-full mb-3 h-0 border-[1px] border-solid border-[#000]"></div>
        <div className="w-full center1">
          <CropProfileImg onImageSelect={(blob) => setProfileImg(blob)} />
        </div>

        <Input
          title="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input title="Email" type="text" value={email} readOnly />

        <div className="flex gap-2 mt-20 mb-2">
          <Button
            text="회원정보 수정"
            className="bg-[#fb5e67] w-full py-5 text-white"
            onClick={handleUpdateProfile}
          />
          <Button
            text="탈퇴"
            className="py-5 border-[#808080] border w-full"
            onClick={() => setIsDeleteModalOpen(true)} // 탈퇴 모달 열기
          />
        </div>
        <Button
          text="취소"
          onClick={() => router.push("/mypage")}
          className="border py-5 border-[#808080]"
        />
      </div>

      {/* 회원정보 수정 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message={message}
      />

      {/* 탈퇴 모달 */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)} // 탈퇴 취소
        message="정말로 탈퇴하시겠습니까?"
      >
        <div className="flex w-full justify-end mt-4">
          <Button
            text="네"
            className="bg-white border w-full border-gray-500 text-gray-500"
            onClick={handleDeleteAccount}
          />
        </div>
      </Modal>
    </div>
  );
}
