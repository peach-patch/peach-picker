import Image from "next/image";
import { Inter } from "next/font/google";
import peach_logo from "../../public/peach_logo.png";
import register from "../../public/register.png";
import dailycheck from "../../public/dailycheck.png";
import follow from "../../public/follow.png";
import possible from "../../public/possible.png";
import tips from "../../public/tips.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from "@/components/Footer";

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
      <section className="w-full max-w-screen-lg ">
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          centerMode
          centerSlidePercentage={33.3}
          showStatus={false}
        >
          <div>
            <Image
              src={dailycheck}
              layout="responsive"
              width={300}
              height={300}
              alt="Daily Check"
              className="m-2"
            />
          </div>
          <div>
            <Image
              src={register}
              layout="responsive"
              width={300}
              height={300}
              alt="Register"
              className="m-2"
            />
          </div>
          <div>
            <Image
              src={possible}
              layout="responsive"
              width={300}
              height={300}
              alt="Possible"
              className="m-2"
            />
          </div>
          <div>
            <Image
              src={tips}
              layout="responsive"
              width={300}
              height={300}
              alt="Tips"
              className="m-2"
            />
          </div>
          <div>
            <Image
              src={follow}
              layout="responsive"
              width={300}
              height={300}
              alt="Follow"
              className="m-2"
            />
          </div>
        </Carousel>
      </section>
      <Footer />
    </div>
  );
}
