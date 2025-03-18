import React from "react";

import stillHere from "../assets/albums/stillHere.jpeg";
import kshama from "../assets/albums/kshama.jpeg";
import lunchBreak from "../assets/albums/LunchBreak.jpeg";
import eotp from "../assets/albums/eotp.jpeg";
import twt from "../assets/albums/twt.jpeg";
import openLetter from "../assets/albums/openletter.jpeg";
import sabChahiye from "../assets/albums/sabChahiye.jpeg";
import nayaab from "../assets/albums/nayaab.jpeg";
import hdv1 from "../assets/albums/hdv1.jpeg";
import tadipaar from "../assets/albums/tadipaar.jpeg";

const Card01 = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-5 z-30">
      {/* Card 1 */}
      <div className="bg-[#00E4FF]/10 backdrop-blur-2xl shadow-2xl text-white p-4 rounded-xl w-56  transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <img src={stillHere} alt="Still Here" className="rounded-lg mb-4" />
        <h3 className="text-xl font-bold">Still Here</h3>
        <h1 className="">KR$NA</h1>
        <div className="content flex items-center text-sm text-gray-400">
          <div className="rating flex items-center">
            <img src="/Rating.svg" alt="Rating" className="mr-2 w-4 h-4" />
            <p>8.4</p>
          </div>
          <span className="mx-2">•</span>
          <p className="year">2021</p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-[#00E4FF]/10 backdrop-blur-2xl shadow-2xl text-white p-4 rounded-xl w-56 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <img src={kshama} alt="Kshama" className="rounded-lg mb-4" />
        <h3 className="text-xl font-bold">Kshama</h3>
        <h1 className="">Seedhe Maut</h1>
        <div className="content flex items-center text-sm text-gray-400">
          <div className="rating flex items-center">
            <img src="/Rating.svg" alt="Rating" className="mr-2 w-4 h-4" />
            <p>9.5</p>
          </div>
          <span className="mx-2">•</span>
          <p className="year">2024</p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-[#00E4FF]/10 backdrop-blur-2xl shadow-2xl text-white p-4 rounded-xl w-56 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <img src={eotp} alt="Eyes On The Prize" className="rounded-lg mb-4" />
        <h3 className="text-xl font-bold">Eyes On The Prize</h3>
        <h1 className="">Karma</h1>
        <div className="content flex items-center text-sm text-gray-400">
          <div className="rating flex items-center">
            <img src="/Rating.svg" alt="Rating" className="mr-2 w-4 h-4" />
            <p>8.1</p>
          </div>
          <span className="mx-2">•</span>
          <p className="year">2023</p>
        </div>
      </div>

      {/* Card 4 */}
      <div className="bg-[#00E4FF]/10 backdrop-blur-2xl shadow-2xl text-white p-4 rounded-xl w-56 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <img src={lunchBreak} alt="Lunch Break" className="rounded-lg mb-4" />
        <h3 className="text-xl font-bold">Lunch Break</h3>
        <h1 className="">Seedhe Maut</h1>
        <div className="content flex items-center text-sm text-gray-400">
          <div className="rating flex items-center">
            <img src="/Rating.svg" alt="Rating" className="mr-2 w-4 h-4" />
            <p>9.0</p>
          </div>
          <span className="mx-2">•</span>
          <p className="year">2023</p>
        </div>
      </div>

      {/* Card 5 */}
      <div className="bg-[#00E4FF]/10 backdrop-blur-2xl shadow-2xl text-white p-4 rounded-xl w-56 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <img src={twt} alt="Time Will Tell" className="rounded-lg mb-4" />
        <h3 className="text-xl font-bold">Time Will Tell</h3>
        <h1 className="">KR$NA</h1>
        <div className="content flex items-center text-sm text-gray-400">
          <div className="rating flex items-center">
            <img src="/Rating.svg" alt="Rating" className="mr-2 w-4 h-4" />
            <p>9.7</p>
          </div>
          <span className="mx-2">•</span>
          <p className="year">2023</p>
        </div>
      </div>

      {/* Card 6 */}
      <div className="bg-[#00E4FF]/10 backdrop-blur-2xl shadow-2xl text-white p-4 rounded-xl w-56 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <img src={sabChahiye} alt="Sab Chahiye" className="rounded-lg mb-4" />
        <h3 className="text-xl font-bold">Sab Chahiye</h3>
        <h1 className="">Rawal</h1>
        <div className="content flex items-center text-sm text-gray-400">
          <div className="rating flex items-center">
            <img src="/Rating.svg" alt="Rating" className="mr-2 w-4 h-4" />
            <p>8.2</p>
          </div>
          <span className="mx-2">•</span>
          <p className="year">2021</p>
        </div>
      </div>

      {/* Card 7 */}
      <div className="bg-[#00E4FF]/10 backdrop-blur-2xl shadow-2xl text-white p-4 rounded-xl w-56 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <img src={openLetter} alt="Open Letter" className="rounded-lg mb-4" />
        <h3 className="text-xl font-bold">Open Letter</h3>
        <h1 className="">Talha Anjum</h1>
        <div className="content flex items-center text-sm text-gray-400">
          <div className="rating flex items-center">
            <img src="/Rating.svg" alt="Rating" className="mr-2 w-4 h-4" />
            <p>9.1</p>
          </div>
          <span className="mx-2">•</span>
          <p className="year">2023</p>
        </div>
      </div>

      {/* Card 8 */}
      <div className="bg-[#00E4FF]/10 backdrop-blur-2xl shadow-2xl text-white p-4 rounded-xl w-56 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <img src={nayaab} alt="Nayaab" className="rounded-lg mb-4" />
        <h3 className="text-xl font-bold">Nayaab</h3>
        <h1 className="">Seedhe Maut</h1>
        <div className="content flex items-center text-sm text-gray-400">
          <div className="rating flex items-center">
            <img src="/Rating.svg" alt="Rating" className="mr-2 w-4 h-4" />
            <p>9.9</p>
          </div>
          <span className="mx-2">•</span>
          <p className="year">2022</p>
        </div>
      </div>

      {/* Card 9 */}
      <div className="bg-[#00E4FF]/10 backdrop-blur-2xl shadow-2xl text-white p-4 rounded-xl w-56 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <img src={tadipaar} alt="Tadipaar" className="rounded-lg mb-4" />
        <h3 className="text-xl font-bold">Tadipaar</h3>
        <h1 className="">MC Stan</h1>
        <div className="content flex items-center text-sm text-gray-400">
          <div className="rating flex items-center">
            <img src="/Rating.svg" alt="Rating" className="mr-2 w-4 h-4" />
            <p>9.8</p>
          </div>
          <span className="mx-2">•</span>
          <p className="year">2020</p>
        </div>
      </div>

      {/* Card 10 */}
      <div className="bg-[#00E4FF]/10 backdrop-blur-2xl shadow-2xl text-white p-4 rounded-xl w-56 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <img src={hdv1} alt="HARD DRIVE Vol. 1" className="rounded-lg mb-4" />
        <h3 className="text-xl font-bold">HARD DRIVE Vol. 1</h3>
        <h1 className="">Raftaar</h1>
        <div className="content flex items-center text-sm text-gray-400">
          <div className="rating flex items-center">
            <img src="/Rating.svg" alt="Rating" className="mr-2 w-4 h-4" />
            <p>8.9</p>
          </div>
          <span className="mx-2">•</span>
          <p className="year">2022</p>
        </div>
      </div>
    </div>
  );
};

export default Card01;
