import React from "react";
import { motion } from "framer-motion";

const rankingAlbums = [
  { name: "Time Will Tell", artist: "KR$NA", rating: 9.7 },
  { name: "Kshama", artist: "Seedhe Maut", rating: 9.5 },
  { name: "Lunch Break", artist: "Seedhe Maut", rating: 9.0 },
  { name: "Still Here", artist: "KR$NA", rating: 8.4 },
  { name: "Eyes On The Prize", artist: "Karma", rating: 8.1 },
];

const Rankings = () => {
  return (
    <div className="p-6">
      <h2 className="text-white text-3xl font-bold mb-6">Top Ranked Albums</h2>
      <div className="flex flex-col gap-4">
        {rankingAlbums.map((album, index) => (
          <motion.div
            key={index}
            className="bg-[#00E4FF]/10 border border-transparent backdrop-blur-2xl p-4 rounded-lg 
                      flex justify-between items-center text-white transition-all duration-300 
                      hover:scale-105 hover:shadow-[0px_0px_20px_#00E4FF]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-xl font-semibold">
              {index + 1}. {album.name}
            </span>
            <span className="text-gray-300">{album.artist}</span>
            <span className="text-yellow-400 font-bold">{album.rating}⭐</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Rankings;
