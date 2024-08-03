import React, { useState } from "react";
import BasicBtn from "../../components/button/BasicBtn";
import Image from "next/image";
import peach_logo from "../../../public/peach_logo.png";
import kakao from "../../images/kakao_login.png";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [termsVisible, setTermsVisible] = useState(false);
  const [privacyVisible, setPrivacyVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowWarning(false);

    let hasError = false;
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!username) {
      newErrors.username = "필수정보입니다.";
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
      const response = await fetch(
        "http://maewakka123.iptime.org:31765/users/sign-up",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {errors.username && (
          <div className="text-red-500 mb-3 text-[10px]">{errors.username}</div>
        )}

        <div>Email</div>
        <div className="mb-1 w-full flex items-center py-3 bg-[#f8f8f8] border-[1px] border-solid border-[#808080]">
          <input
            type="email"
            className="bg-[#f8f8f8] ml-3 text-[20px] outline-none"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
        <div>
          <div className="flex items-center justify-between font-bold">
            <span>[필수] 이용약관 동의</span>
            <button
              type="button"
              onClick={() => setTermsVisible(!termsVisible)}
              className="p-1 text-sm text-white bg-black rounded-md"
            >
              {termsVisible ? "닫음" : "펼침"}
            </button>
          </div>
          {termsVisible && (
            <div
              style={{
                width: "100%",
                height: "100px",
                border: "1px solid #ccc",
                padding: "10px",
                overflowY: "scroll",
              }}
            >
              <p>제1조(목적)</p>
              <p>표준약관 제10023호</p>
              <p>
                이 약관은 피치피커 회사(전자거래 사업자)가 운영하는 peach-picker
                사이버 몰(이하 "몰"이라 한다)에서 제공하는 인터넷 관련
                서비스(이하 "서비스"라 한다)를 이용함에 있어 사이버몰과 이용자의
                권리·의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
              <p>
                ※ 「PC통신등을 이용하는 전자거래에 대해서도 그 성질에 반하지
                않는한 이 약관을 준용합니다」
              </p>

              <p>제2조(정의)</p>
              <p>
                ① "몰"이란 피치피커 회사가 재화 또는 용역을 이용자에게 제공하기
                위하여 컴퓨터등 정보통신설비를 이용하여 재화 또는 용역을 거래할
                수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버몰을
                운영하는 사업자의 의미로도 사용합니다.
              </p>
              <p>
                ② "이용자"란 "몰"에 접속하여 이 약관에 따라 "몰"이 제공하는
                서비스를 받는 회원 및 비회원을 말합니다.
              </p>
              <p>
                ③ ‘회원’이라 함은 "몰"에 개인정보를 제공하여 회원등록을 한
                자로서, "몰"의 정보를 지속적으로 제공받으며, "몰"이 제공하는
                서비스를 계속적으로 이용할 수 있는 자를 말합니다.
              </p>
              <p>
                ④ ‘비회원’이라 함은 회원에 가입하지 않고 "몰"이 제공하는
                서비스를 이용하는 자를 말합니다.
              </p>

              <p>제3조(약관등의 명시와 설명 및 개정)</p>
              <p>
                ① "몰"은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지
                주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함),
                전화번호·모사전송번호·전자우편주소, 사업자등록번호,
                통신판매업신고번호, 개인정보 보호책임자등을 이용자가 쉽게 알 수
                있도록 "몰"의 초기 서비스화면(전면)에 게시합니다. 다만, 약관의
                내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.
              </p>
              <p>
                ② "몰"은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는
                내용 중 청약철회·배송책임·환불조건 등과 같은 중요한 내용을
                이용자가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을
                제공하여 이용자의 확인을 구하여야 합니다.
              </p>
              <p>
                ③ "몰"은 전자상거래등에서의소비자보호에관한법률,
                약관의규제에관한법률, 전자거래기본법, 전자서명법,
                정보통신망이용촉진등에관한법률, 방문판매등에관한법률,
                소비자보호법 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할
                수 있습니다.
              </p>
              <p>
                ④ "몰"이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여
                현행약관과 함께 몰의 초기화면에 그 적용일자 7일이전부터 적용일자
                전일까지 공지합니다. 다만, 이용자에게 불리하게 약관내용을
                변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고
                공지합니다. 이 경우 "몰“은 개정전 내용과 개정후 내용을 명확하게
                비교하여 이용자가 알기 쉽도록 표시합니다.
              </p>
              <p>
                ⑤ "몰"이 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에
                체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는
                개정전의 약관조항이 그대로 적용됩니다. 다만 이미 계약을 체결한
                이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 제3항에 의한
                개정약관의 공지기간내에 "몰"에 송신하여 "몰"의 동의를 받은
                경우에는 개정약관 조항이 적용됩니다.
              </p>
              <p>
                ⑥ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는
                전자상거래등에서의 소비자보호에 관한 법률, 약관의 규제 등에 관한
                법률, 공정거래위원회가 정하는 전자상거래 등에서의 소비자보호지침
                및 관계법령 또는 상관례에 따릅니다.
              </p>

              <p>제4조(서비스의 제공 및 변경)</p>
              <p>① "몰"은 다음과 같은 업무를 수행합니다.</p>
              <p>1. 재화 또는 용역에 대한 정보 제공 및 구매계약의 체결</p>
              <p>2. 구매계약이 체결된 재화 또는 용역의 배송</p>
              <p>3. 기타 "몰"이 정하는 업무</p>
              <p>
                ② "몰"은 재화 또는 용역의 품절 또는 기술적 사양의 변경 등의
                경우에는 장차 체결되는 계약에 의해 제공할 재화 또는 용역의
                내용을 변경할 수 있습니다. 이 경우에는 변경된 재화 또는 용역의
                내용 및 제공일자를 명시하여 현재의 재화 또는 용역의 내용을
                게시한 곳에 즉시 공지합니다.
              </p>
              <p>
                ③ "몰"이 제공하기로 이용자와 계약을 체결한 서비스의 내용을
                재화등의 품절 또는 기술적 사양의 변경 등의 사유로 변경할
                경우에는 그 사유를 이용자에게 통지 가능한 주소로 즉시
                통지합니다.
              </p>
              <p>
                ④ 전항의 경우 "몰"은 이로 인하여 이용자가 입은 손해를
                배상합니다. 다만, "몰"이 고의 또는 과실이 없음을 입증하는
                경우에는 그러하지 아니합니다.
              </p>

              <p>제5조(서비스의 중단)</p>
              <p>
                ① "몰"은 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의
                두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로
                중단할 수 있습니다.
              </p>
              <p>
                ② "몰"은 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로
                인하여 이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 단,
                "몰"이 고의 또는 과실이 없음을 입증하는 경우에는 그러하지
                아니합니다.
              </p>
              <p>
                ③ 사업종목의 전환, 사업의 포기, 업체간의 통합 등의 이유로
                서비스를 제공할 수 없게 되는 경우에는 "몰"은 제8조에 정한
                방법으로 이용자에게 통지하고 당초 "몰"에서 제시한 조건에 따라
                소비자에게 보상합니다. 다만, "몰"이 보상기준 등을 고지하지
                아니한 경우에는 이용자들의 마일리지 또는 적립금 등을 "몰"에서
                통용되는 통화가치에 상응하는 현물 또는 현금으로 이용자에게
                지급합니다.
              </p>

              <p>제6조(회원가입)</p>
              <p>
                ① 이용자는 "몰"이 정한 가입 양식에 따라 회원정보를 기입한 후 이
                약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.
              </p>
              <p>
                ② "몰"은 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음
                각호에 해당하지 않는 한 회원으로 등록합니다.
              </p>
              <p>
                1. 가입신청자가 이 약관 제7조제3항에 의하여 이전에 회원자격을
                상실한 적이 있는 경우, 다만 제7조제3항에 의한 회원자격 상실후
                3년이 경과한 자로서 "몰"의 회원재가입 승낙을 얻은 경우에는
                예외로 한다.
              </p>
              <p>2. 등록 내용에 허위, 기재누락, 오기가 있는 경우</p>
              <p>
                3. 기타 회원으로 등록하는 것이 "몰"의 기술상 현저히 지장이
                있다고 판단되는 경우
              </p>
              <p>
                ③ 회원가입계약의 성립시기는 "몰"의 승낙이 회원에게 도달한
                시점으로 합니다.
              </p>
              <p>
                ④ 회원은 제15조제1항에 의한 등록사항에 변경이 있는 경우, 즉시
                전자우편 기타 방법으로 "몰"에 대하여 그 변경사항을 알려야
                합니다.
              </p>
              <p>
                ⑤ "몰" 내에서 구매한 상품을 타 사이트에서 재 판매하는 회원의
                경우, 별도의 고지 없이 탈퇴 처리되며, 법적인 조치가 진행될 수
                있습니다.
              </p>

              <p>제7조(회원 탈퇴 및 자격 상실 등)</p>
              <p>
                ① 회원은 "몰"에 언제든지 탈퇴를 요청할 수 있으며 "몰"은 즉시
                회원탈퇴를 처리합니다.
              </p>
              <p>
                ② 회원이 다음 각호의 사유에 해당하는 경우, "몰"은 회원자격을
                제한 및 정지시킬 수 있습니다.
              </p>
              <p>1. 가입 신청시에 허위 내용을 등록한 경우</p>
              <p>
                2. "몰"을 이용하여 구입한 재화등의 대금, 기타 "몰"이용에
                관련하여 회원이 부담하는 채무를 기일에 지급하지 않는 경우
              </p>
              <p>
                3. 다른 사람의 "몰" 이용을 방해하거나 그 정보를 도용하는 등
                전자상거래 질서를 위협하는 경우
              </p>
              <p>
                4. "몰"을 이용하여 법령 또는 이 약관이 금지하거나 공서양속에
                반하는 행위를 하는 경우
              </p>
              <p>
                ③ "몰"이 회원 자격을 제한·정지 시킨후, 동일한 행위가 2회이상
                반복되거나 30일이내에 그 사유가 시정되지 아니하는 경우 "몰"은
                회원자격을 상실시킬 수 있습니다.
              </p>
              <p>
                ④ "몰"이 회원자격을 상실시키는 경우에는 회원등록을 말소합니다.
                이 경우 회원에게 이를 통지하고, 회원등록 말소전에 최소한 30일
                이상의 기간을 정하여 소명할 기회를 부여합니다.
              </p>

              <p>제8조(회원에 대한 통지)</p>
              <p>
                ① "몰"이 회원에 대한 통지를 하는 경우, 회원이 "몰"과 미리
                약정하여 지정한 전자우편 주소로 할 수 있습니다.
              </p>
              <p>
                ② "몰"은 불특정다수 회원에 대한 통지의 경우 1주일이상 "몰"
                게시판에 게시함으로서 개별 통지에 갈음할 수 있습니다. 다만, 회원
                본인의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는
                개별통지를 합니다.
              </p>

              <p>
                제9조(구매신청) "몰"이용자는 "몰"상에서 다음 또는 이와 유사한
                방법에 의하여 구매를 신청하며, "몰"은 이용자가 구매신청을 함에
                있어서 다음의 각 내용을 알기 쉽게 제공하여야 합니다. 단, 회원인
                경우 제2호 내지 제4호의 적용을 제외할 수 있습니다.
              </p>
              <p>1. 재화등의 검색 및 선택</p>
              <p>
                2. 성명, 주소, 전화번호, 전자우편주소(또는 이동전화번호) 등의
                입력
              </p>
              <p>
                3. 약관내용, 청약철회권이 제한되는 서비스, 배송료·설치비 등의
                비용부담과 관련한 내용에 대한 확인
              </p>
              <p>
                4. 이 약관에 동의하고 위 3.호의 사항을 확인하거나 거부하는
                표시(예, 마우스 클릭)
              </p>
              <p>
                5. 재화등의 구매신청 및 이에 관한 확인 또는 "몰"의 확인에 대한
                동의
              </p>
              <p>6. 결제방법의 선택</p>

              <p>제10조 (계약의 성립)</p>
              <p>
                ① "몰"은 제9조와 같은 구매신청에 대하여 다음 각호에 해당하면
                승낙하지 않을 수 있습니다. 다만, 미성년자와 계약을 체결하는
                경우에는 법정대리인의 동의를 얻지 못하면 미성년자 본인 또는
                법정대리인이 계약을 취소할 수 있다는 내용을 고지하여야 합니다.
              </p>
              <p>1. 신청 내용에 허위, 기재누락, 오기가 있는 경우</p>
              <p>
                2. 미성년자가 담배, 주류등 청소년보호법에서 금지하는 재화 및
                용역을 구매하는 경우
              </p>
              <p>
                3. 기타 구매신청에 승낙하는 것이 "몰" 기술상 현저히 지장이
                있다고 판단하는 경우
              </p>
              <p>
                ② "몰"의 승낙이 제12조제1항의 수신확인통지형태로 이용자에게
                도달한 시점에 계약이 성립한 것으로 봅니다.
              </p>
              <p>
                ③ "몰"의 승낙의 의사표시에는 이용자의 구매 신청에 대한 확인 및
                판매가능 여부, 구매신청의 정정 취소등에 관한 정보등을 포함하여야
                합니다.
              </p>

              <p>
                제11조(지급방법) "몰"에서 구매한 재화 또는 용역에 대한
                대금지급방법은 다음 각호의 방법중 가용한 방법으로 할 수
                있습니다. 단, "몰"은 이용자의 지급방법에 대하여 재화 등의 대금에
                어떠한 명목의 수수료도 추가하여 징수할 수 없습니다.
              </p>
              <p>1. 폰뱅킹, 인터넷뱅킹, 메일 뱅킹 등의 각종 계좌이체</p>
              <p>2. 선불카드, 직불카드, 신용카드 등의 각종 카드 결제</p>
              <p>3. 온라인무통장입금</p>
              <p>4. 전자화폐에 의한 결제</p>
              <p>5. 수령시 대금지급</p>
              <p>6. 마일리지 등 "몰"이 지급한 포인트에 의한 결제</p>
              <p>7. "몰"과 계약을 맺었거나 "몰"이 인정한 상품권에 의한 결제</p>
              <p>8. 기타 전자적 지급 방법에 의한 대금 지급 등</p>

              <p>제12조(수신확인통지·구매신청 변경 및 취소)</p>
              <p>
                ① "몰"은 이용자의 구매신청이 있는 경우 이용자에게 수신확인통지를
                합니다.
              </p>
              <p>
                ② 수신확인통지를 받은 이용자는 의사표시의 불일치등이 있는
                경우에는 수신확인통지를 받은 후 즉시 구매신청 변경 및 취소를
                요청할 수 있고 "몰"은 배송전에 이용자의 요청이 있는 경우에는
                지체없이 그 요청에 따라 처리하여야 합니다. 다만 이미 대금을
                지불한 경우에는 제15조의 청약철회 등에 관한 규정에 따릅니다.
              </p>

              <p>제13조(재화등의 공급)</p>
              <p>
                ① "몰"은 이용자와 재화등의 공급시기에 관하여 별도의 약정이 없는
                이상, 이용자가 청약을 한 날부터 7일 이내에 재화 등을 배송할 수
                있도록 주문제작, 포장 등 기타의 필요한 조치를 취합니다. 다만,
                "몰"이 이미 재화 등의 대금의 전부 또는 일부를 받은 경우에는
                대금의 전부 또는 일부를 받은 날부터 2영업일 이내에 조치를
                취합니다. 이때 "몰"은 이용자가 재화등의 공급 절차 및 진행 사항을
                확인할 수 있도록 적절한 조치를 합니다.
              </p>
              <p>
                ② "몰"은 이용자가 구매한 재화에 대해 배송수단, 수단별 배송비용
                부담자, 수단별 배송기간 등을 명시합니다. 만약 "몰"이 약정
                배송기간을 초과한 경우에는 그로 인한 이용자의 손해를 배상하여야
                합니다. 다만 "몰"이 고의·과실이 없음을 입증한 경우에는 그러하지
                아니합니다.
              </p>

              <p>제14조(환급)</p>
              <p>
                "몰"은 이용자가 구매신청한 재화등이 품절 등의 사유로 인도 또는
                제공을 할 수 없을 때에는 지체없이 그 사유를 이용자에게 통지하고
                사전에 재화 등의 대금을 받은 경우에는 대금을 받은 날부터 2영업일
                이내에 환급하거나 환급에 필요한 조치를 취합니다.
              </p>

              <p>제15조(청약철회 등)</p>
              <p>
                ① "몰"과 재화등의 구매에 관한 계약을 체결한 이용자는 수신확인의
                통지를 받은 날부터 7일 이내에는 청약의 철회를 할 수 있습니다.
              </p>
              <p>
                ② 이용자는 재화등을 배송받은 경우 다음 각호의 1에 해당하는
                경우에는 반품 및 교환을 할 수 없습니다.
              </p>
              <p>
                1. 이용자에게 책임 있는 사유로 재화 등이 멸실 또는 훼손된
                경우(다만, 재화 등의 내용을 확인하기 위하여 포장 등을 훼손한
                경우에는 청약철회를 할 수 있습니다)
              </p>
              <p>
                2. 이용자의 사용 또는 일부 소비에 의하여 재화 등의 가치가 현저히
                감소한 경우
              </p>
              <p>
                3. 시간의 경과에 의하여 재판매가 곤란할 정도로 재화등의 가치가
                현저히 감소한 경우
              </p>
              <p>
                4. 같은 성능을 지닌 재화등으로 복제가 가능한 경우 그 원본인 재화
                등의 포장을 훼손한 경우
              </p>
              <p>
                ③ 제2항제2호 내지 제4호의 경우에 "몰"이 사전에 청약철회 등이
                제한되는 사실을 소비자가 쉽게 알 수 있는 곳에 명기하거나
                시용상품을 제공하는 등의 조치를 하지 않았다면 이용자의
                청약철회등이 제한되지 않습니다.
              </p>
              <p>
                ④ 이용자는 제1항 및 제2항의 규정에 불구하고 재화등의 내용이
                표시·광고 내용과 다르거나 계약내용과 다르게 이행된 때에는 당해
                재화등을 공급받은 날부터 3월이내, 그 사실을 안 날 또는 알 수
                있었던 날부터 30일 이내에 청약철회 등을 할 수 있습니다.
              </p>

              <p>제16조(청약철회 등의 효과)</p>
              <p>
                ① "몰"은 이용자로부터 재화 등을 반환받은 경우 3영업일 이내에
                이미 지급받은 재화등의 대금을 환급합니다. 이 경우 "몰"이
                이용자에게 재화등의 환급을 지연한 때에는 그 지연기간에 대하여
                공정거래위원회가 정하여 고시하는 지연이자율을 곱하여 산정한
                지연이자를 지급합니다.
              </p>
              <p>
                ② "몰"은 위 대금을 환급함에 있어서 이용자가 신용카드 또는
                전자화폐 등의 결제수단으로 재화등의 대금을 지급한 때에는
                지체없이 당해 결제수단을 제공한 사업자로 하여금 재화등의 대금의
                청구를 정지 또는 취소하도록 요청합니다.
              </p>
              <p>
                ③ 청약철회등의 경우 공급받은 재화등의 반환에 필요한 비용은
                이용자가 부담합니다. "몰"은 이용자에게 청약철회등을 이유로
                위약금 또는 손해배상을 청구하지 않습니다. 다만 재화등의 내용이
                표시·광고 내용과 다르거나 계약내용과 다르게 이행되어
                청약철회등을 하는 경우 재화등의 반환에 필요한 비용은 "몰"이
                부담합니다.
              </p>
              <p>
                ④ 이용자가 재화등을 제공받을때 발송비를 부담한 경우에 "몰"은
                청약철회시 그 비용을 누가 부담하는지를 이용자가 알기 쉽도록
                명확하게 표시합니다.
              </p>

              <p>제17조(개인정보보호)</p>
              <p>
                ① "몰"은 이용자의 정보수집시 구매계약 이행에 필요한 최소한의
                정보를 수집합니다. 다음 사항을 필수사항으로 하며 그 외 사항은
                선택사항으로 합니다.
              </p>
              <p>1. 성명</p>
              <p>2. 주소</p>
              <p>3. 전화번호</p>
              <p>4. 희망ID(회원의 경우)</p>
              <p>5. 비밀번호(회원의 경우)</p>
              <p>6. 전자우편주소(또는 이동전화번호)</p>
              <p>
                ② "몰"이 이용자의 개인식별이 가능한 개인정보를 수집하는 때에는
                반드시 당해 이용자의 동의를 받습니다.
              </p>
              <p>
                ③ 제공된 개인정보는 당해 이용자의 동의없이 목적외의 이용이나
                제3자에게 제공할 수 없으며, 이에 대한 모든 책임은 몰이 집니다.
                다만, 다음의 경우에는 예외로 합니다.
              </p>
              <p>
                1. 배송업무상 배송업체에게 배송에 필요한 최소한의 이용자의
                정보(성명, 주소, 전화번호)를 알려주는 경우
              </p>
              <p>
                2. 통계작성, 학술연구 또는 시장조사를 위하여 필요한 경우로서
                특정 개인을 식별할 수 없는 형태로 제공하는 경우
              </p>
              <p>3. 재화등의 거래에 따른 대금정산을 위하여 필요한 경우</p>
              <p>4. 도용방지를 위하여 본인확인에 필요한 경우</p>
              <p>
                5. 법률의 규정 또는 법률에 의하여 필요한 불가피한 사유가 있는
                경우
              </p>
              <p>
                ④ "몰"이 제2항과 제3항에 의해 이용자의 동의를 받아야 하는
                경우에는 개인정보 보호책임자의 신원(소속, 성명 및 전화번호, 기타
                연락처), 정보의 수집목적 및 이용목적, 제3자에 대한 정보제공
                관련사항(제공받은자, 제공목적 및 제공할 정보의 내용) 등
                정보통신망이용촉진등에관한법률 제22조제2항이 규정한 사항을 미리
                명시하거나 고지해야 하며 이용자는 언제든지 이 동의를 철회할 수
                있습니다.
              </p>
              <p>
                ⑤ 이용자는 언제든지 "몰"이 가지고 있는 자신의 개인정보에 대해
                열람 및 오류정정을 요구할 수 있으며 "몰"은 이에 대해 지체없이
                필요한 조치를 취할 의무를 집니다. 이용자가 오류의 정정을 요구한
                경우에는 "몰"은 그 오류를 정정할 때까지 당해 개인정보를 이용하지
                않습니다.
              </p>
              <p>
                ⑥ "몰"은 개인정보 보호를 위하여 관리자를 한정하여 그 수를
                최소화하며 신용카드, 은행계좌 등을 포함한 이용자의 개인정보의
                분실, 도난, 유출, 변조 등으로 인한 이용자의 손해에 대하여 모든
                책임을 집니다.
              </p>
              <p>
                ⑦ "몰" 또는 그로부터 개인정보를 제공받은 제3자는 개인정보의
                수집목적 또는 제공받은 목적을 달성한 때에는 당해 개인정보를
                지체없이 파기합니다.
              </p>
            </div>
          )}
          <div className="mt-3 h-[1px] border-[1px] border-[#808080]"></div>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <span className="ml-2 text-sm">이용약관에 동의함</span>
          </div>
        </div>
        <div className="mt-5 mb-5">
          <div className="flex items-center justify-between font-bold">
            <span>[필수] 개인정보 수집 및 이용 동의</span>
            <button
              type="button"
              onClick={() => setPrivacyVisible(!privacyVisible)}
              className="p-1 text-sm text-white bg-black rounded-md"
            >
              {privacyVisible ? "닫음" : "펼침"}
            </button>
          </div>
          {privacyVisible && (
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

              <p>
                가. 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산
              </p>

              <p>
                콘텐츠 제공, 구매 및 요금 결제, 물품배송 또는 청구지 등 발송,
                금융거래 본인 인증 및 금융 서비스
              </p>

              <p>나. 회원 관리</p>

              <p>
                회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량회원의 부정
                이용 방지와 비인가 사용 방지, 가입 의사 확인, 연령확인, 만14세
                미만 아동 개인정보 수집 시 법정 대리인 동의여부 확인, 불만처리
                등 민원처리, 고지사항 전달
              </p>

              <p>
                2. 수집하는 개인정보 항목: 이름, 로그인ID, 비밀번호, 이메일,
                14세 미만 가입자의 경우 법정대리인의 정보
              </p>

              <p>3. 개인정보의 보유기간 및 이용기간</p>

              <p>
                원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당
                정보를 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의
                이유로 명시한 기간 동안 보존합니다.
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
          <div className="mt-3 h-[1px] border-[1px] border-[#808080]"></div>
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
