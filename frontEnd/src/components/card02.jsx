import React from "react";
import { motion } from "framer-motion";
import krsna from "../assets/artists/krsna.jpeg";
import karma from "../assets/artists/karma.jpeg";
import raftaar from "../assets/artists/raftaar.jpeg";
import thirtykey from "../assets/artists/30key.jpeg";
import yashraj from "../assets/artists/yashraj.jpeg";

const artists = [
  { name: "KR$NA", image: krsna },
  { name: "Yashraj", image: yashraj },
  { name: "Karma", image: karma },
  { name: "Raftaar", image: raftaar },
  { name: "30KEY!", image: thirtykey },
];

const ArtistCards = () => {
  return (
    <div className="p-5 z-30">
      <h2 className="text-white text-2xl font-bold text-left mb-4 ml-5">
        Top Artists
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {artists.map((artist, index) => (
          <motion.div
            key={index}
            className="relative bg-[#00E4FF]/10 backdrop-blur-2xl border border-transparent text-white p-4 rounded-xl w-56 
                      transition-all duration-300 hover:scale-105 hover:shadow-[0px_0px_20px_#00E4FF] cursor-pointe"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.img
              src={artist.image}
              alt={artist.name}
              className="w-full h-32 mx-auto mb-3 rounded-lg object-cover"
              whileHover={{ scale: 1.05 }}
            />
            <h3 className="text-lg font-bold text-center">{artist.name}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ArtistCards;
