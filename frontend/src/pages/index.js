import Image from "next/image";
import { Inter } from "next/font/google";
import Menu from "../components/Menu";
import peach_logo from "../../public/peach_logo.png";
import register from "../../public/register.png";
import follow from "../../public/follow.png";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen">
      <Image
        src={peach_logo}
        width={200}
        alt="Peach Logo"
        className="hidden m-10 sm:flex"
      />
      <p className="mb-20 text-5xl">공정하게 추첨하는 Peach Picker</p>
      <section className="flex justify-around w-4/5">
        <article className="justify-center w-1/3">
          쉽게 추첨이 등록 가능해요
        </article>
        <article className="justify-center w-1/3">
          해당 시간에 실시간 추첨을 볼 수 있어요
        </article>
        <article className="justify-center w-1/3">
          이후 추첨 내역에서 당첨자 정보를 확인할 수 있어요
        </article>
      </section>
      <section className="mt-10">실시간 랭킹</section>

      <section className="mt-10">NEW EVENT</section>
      <section className="flex">
        <Image
          src={register}
          width={500}
          alt="Peach Logo"
          className="hidden m-10 sm:flex"
        />
        <Image
          src={follow}
          width={500}
          alt="Peach Logo"
          className="hidden m-10 sm:flex"
        />
      </section>
      <section>
        <div>공지사항 이용약관 개인정보처리방침 공식 인스타그램</div>
        <div>Copyright © PHYPS DEPARTMENT. All rights reserved.</div>
      </section>
    </div>
  );
}
