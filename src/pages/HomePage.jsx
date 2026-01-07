import { Link } from 'react-router-dom';

import mouseIMG from '../../public/images/mouse.png';
import keyboardIMG from '../../public/images/keyboard.png';
import wordIMG from '../../public/images/word.png';
import excelIMG from '../../public/images/excel.png';
import powerpointIMG from '../../public/images/powerpoint.png';

const HomePage = () => {
  return (
    <section className="section-home">
      <div className="car__left"></div>
      <div className="flex justify-center gap-8">
        <Link
          to="/mouse-skills"
          className="group flex h-44 w-44 flex-col items-center justify-between rounded-2xl border border-[#67a03f] bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="flex flex-1 items-center justify-center">
            <img
              src={mouseIMG}
              alt="Luyện chuột"
              className="w-26 transition group-hover:scale-110"
            />
          </div>
          <div className="w-full rounded-b-2xl bg-[#67a03f] py-3 text-center font-bold text-white uppercase">
            Chuột
          </div>
        </Link>

        <Link
          to="/typing-skills"
          className="group flex h-44 w-44 flex-col items-center justify-between rounded-2xl border border-[#956600] bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="flex flex-1 items-center justify-center">
            <img
              src={keyboardIMG}
              alt="Luyện gõ phím"
              className="w-22 transition group-hover:scale-110"
            />
          </div>
          <div className="w-full rounded-b-2xl bg-[#956600] py-3 text-center font-bold text-white uppercase">
            bàn phím
          </div>
        </Link>
        <Link
          to="/typing-skills"
          className="group flex h-44 w-44 flex-col items-center justify-between rounded-2xl border border-[#283c82] bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="flex flex-1 items-center justify-center">
            <img
              src={wordIMG}
              alt="Học word"
              className="w-22 transition group-hover:scale-110"
            />
          </div>
          <div className="w-full rounded-b-2xl bg-[#283c82] py-3 text-center font-bold text-white uppercase">
            Word
          </div>
        </Link>
        <Link
          to="/typing-skills"
          className="group flex h-44 w-44 flex-col items-center justify-between rounded-2xl border border-[#20744a] bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="flex flex-1 items-center justify-center">
            <img
              src={excelIMG}
              alt="Học excel"
              className="w-22 transition group-hover:scale-110"
            />
          </div>
          <div className="w-full rounded-b-2xl bg-[#20744a] py-3 text-center font-bold text-white uppercase">
            Excel
          </div>
        </Link>
        <Link
          to="/typing-skills"
          className="group flex h-44 w-44 flex-col items-center justify-between rounded-2xl border border-[#d33922] bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="flex flex-1 items-center justify-center">
            <img
              src={powerpointIMG}
              alt="Học powerpoint"
              className="w-22 transition group-hover:scale-110"
            />
          </div>
          <div className="w-full rounded-b-2xl bg-[#d33922] py-3 text-center font-bold text-white uppercase">
            Powerpoint
          </div>
        </Link>
      </div>
    </section>
  );
};

export default HomePage;
