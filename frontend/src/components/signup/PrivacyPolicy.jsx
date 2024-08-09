import React from "react";

const PrivacyPolicy = ({ visible, toggleVisibility }) => {
  return (
    <div>
      <div className="flex items-center justify-between font-bold">
        <span>[필수] 개인정보 수집 및 이용 동의</span>
        <button
          type="button"
          onClick={toggleVisibility}
          className="p-2 mb-1 font-lsTh text-sm text-white bg-black rounded-md"
        >
          {visible ? "닫음" : "펼침"}
        </button>
      </div>
      <div className="w-full h-[1px] border-[1px] border-black"></div>
      {visible && (
        <div
          style={{
            width: "100%",
            height: "100px",
            border: "1px solid #ccc",
            padding: "10px",
            overflowY: "scroll",
          }}
        >
          <p>1. 개인정보 수집목적 및 이용목적</p>

          <p>가. 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산</p>

          <p>
            콘텐츠 제공, 구매 및 요금 결제, 물품배송 또는 청구지 등 발송,
            금융거래 본인 인증 및 금융 서비스
          </p>

          <p>나. 회원 관리</p>

          <p>
            회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량회원의 부정 이용
            방지와 비인가 사용 방지, 가입 의사 확인, 연령확인, 만14세 미만 아동
            개인정보 수집 시 법정 대리인 동의여부 확인, 불만처리 등 민원처리,
            고지사항 전달
          </p>

          <p>
            2. 수집하는 개인정보 항목: 이름, 로그인ID, 비밀번호, 이메일, 14세
            미만 가입자의 경우 법정대리인의 정보
          </p>

          <p>3. 개인정보의 보유기간 및 이용기간</p>

          <p>
            원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를
            지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로
            명시한 기간 동안 보존합니다.
          </p>

          <p>가. 회사 내부 방침에 의한 정보 보유 사유</p>

          <p>o 부정거래 방지 및 쇼핑몰 운영방침에 따른 보관: 5년</p>

          <p>나. 관련 법령에 의한 정보보유 사유</p>

          <p>o 계약 또는 청약철회 등에 관한 기록</p>

          <p>- 보존이유: 전자상거래 등에서의 소비자 보호에 관한 법률</p>

          <p>- 보존기간: 5년</p>

          <p>o 대금 결제 및 재화 등의 공급에 관한 기록</p>

          <p>- 보존이유: 전자상거래 등에서의 소비자 보호에 관한 법률</p>

          <p>- 보존기간: 5년</p>

          <p>o 소비자 불만 또는 분쟁처리에 관한 기록</p>

          <p>- 보존이유: 전자상거래 등에서의 소비자 보호에 관한 법률</p>

          <p>- 보존기간: 3년</p>

          <p>o 로그 기록</p>

          <p>- 보존이유: 통신비밀보호법</p>

          <p>- 보존기간: 3개월</p>

          <p>※ 동의를 거부할 수 있으나 거부 시 회원 가입이 불가능합니다.</p>
        </div>
      )}
    </div>
  );
};

export default PrivacyPolicy;
