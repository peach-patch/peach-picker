import React from "react";
import Footer from "../Footer";
import peach_logo from "../../../public/peach_logo.png";
import brandstory from "../../images/brand.png";
import lottery from "../../images/lottery.png";
import Image from "next/image";
export default function LastView() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex">
        <div className="w-3/4 ">
          <Image
            src={brandstory}
            width={100}
            height={100}
            layout="responsive"
            alt="logo"
          />
        </div>
        <div className="w-1/4">
          <Image
            src={lottery}
            width={100}
            height={100}
            layout="responsive"
            alt="logo"
          />
        </div>
      </section>
      <section className="flex flex-col w-full bg-white">
        <div className="flex flex-col w-full h-0 border border-gray-500 "></div>
        <div className="flex ">
          <div className="flex items-center justify-center w-1/6 ">
            <div className="w-3/4 ">
              <Image
                src={peach_logo}
                width={100}
                height={100}
                layout="responsive"
                alt="logo"
              />
            </div>
          </div>
          <article className="w-1/6 pt-10">
            <div className="pb-2 font-bold">추첨</div>
            <div>추첨 등록</div>
            <div>실시간 추첨</div>
            <div>추첨 기록실</div>
            <div>내 추첨 보기</div>
          </article>
          <article className="w-1/6 pt-10">
            <div className="pb-2 font-bold">고객 서비스</div>
            <div>회원 가입</div>
            <div>고객 상담</div>
            <div>추첨 기록실</div>
          </article>
          <article className="w-1/6 pt-10">
            <div className="pb-2 font-bold">회사 소개</div>
            <div>기업 정보</div>
            <div>윤리</div>
            <div>카카오톡</div>
            <div>인스타그램</div>
          </article>
          <article className="items-end">
            <div>피치피커 고객상담</div>
            <div>월~금 08:30~17:00</div>
          </article>
        </div>
      </section>
      <div className="flex-grow bg-white"></div>
      <Footer />
    </div>
  );
}
