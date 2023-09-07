import { Press_Start_2P as font_ } from "next/font/google";
const font = font_({ subsets: ["latin"], weight: ["400"] });

export default function header() {
  return (
    <header
      className={`flex justify-evenly mt-1 text-3xl md:pt-12 pt-3 ${font.className}`}
    >
      <h1>
        Quiz A<span className="text-[#88a788]">I</span>
      </h1>
    </header>
  );
}
