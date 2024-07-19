import Image from "next/image";
import { Inter } from "next/font/google";
import Menu from "../components/Menu";
import peach_logo from "../../public/peach_logo.png";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="w-screen flex flex-col items-center justify-center">
      <Image
        src={peach_logo}
        width={200}
        alt="Peach Logo"
        className="sm:flex hidden m-10"
      />
      <p className="text-5xl mb-20">공정하게 추첨하는 Peach Picker</p>
      <section className="flex justify-around w-4/5">
        <article className="w-1/3 justify-center">
          쉽게 추첨이 등록 가능해요
        </article>
        <article className="w-1/3 justify-center">
          해당 시간에 실시간 추첨을 볼 수 있어요
        </article>
        <article className="w-1/3 justify-center">
          이후 추첨 내역에서 당첨자 정보를 확인할 수 있어요
        </article>
      </section>
    </div>
  );
}
