import React from "react";
import stillHere from "../assets/albums/stillHere.jpeg";
import kshama from "../assets/albums/kshama.jpeg";
import lunchBreak from "../assets/albums/LunchBreak.jpeg";
import eotp from "../assets/albums/eotp.jpeg";

const Card01 = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-5 z-30">
      {/* Card 1 */}
      <div className="card bg-gray-800 text-white p-4 rounded-lg shadow-lg w-64">
        <img src={stillHere} alt="Still Here" className="rounded-lg mb-4" />
        <h3 className="text-xl font-bold mb-2">Still Here</h3>
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
      <div className="card bg-gray-800 text-white p-4 rounded-lg shadow-lg w-64">
        <img src={kshama} alt="Kshama" className="rounded-lg mb-4" />
        <h3 className="text-xl font-bold mb-2">Kshama</h3>
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
      <div className="card bg-gray-800 text-white p-4 rounded-lg shadow-lg w-64">
        <img src={lunchBreak} alt="Lunch Break" className="rounded-lg mb-4" />
        <h3 className="text-xl font-bold mb-2">Lunch Break</h3>
        <div className="content flex items-center text-sm text-gray-400">
          <div className="rating flex items-center">
            <img src="/Rating.svg" alt="Rating" className="mr-2 w-4 h-4" />
            <p>9.0</p>
          </div>
          <span className="mx-2">•</span>
          <p className="year">2023</p>
        </div>
      </div>

      {/* Card 4*/}
      <div className="card bg-gray-800 text-white p-4 rounded-lg shadow-lg w-64">
        <img src={eotp} alt="Eyes On The Prize" className="rounded-lg mb-4" />
        <h3 className="text-xl font-bold mb-2">Eyes On The Prize</h3>
        <div className="content flex items-center text-sm text-gray-400">
          <div className="rating flex items-center">
            <img src="/Rating.svg" alt="Rating" className="mr-2 w-4 h-4" />
            <p>8.1</p>
          </div>
          <span className="mx-2">•</span>
          <p className="year">2023</p>
        </div>
      </div>
    </div>
  );
};

export default Card01;
