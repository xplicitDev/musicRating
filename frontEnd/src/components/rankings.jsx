import React from "react";
import { motion } from "framer-motion";

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

const rankingAlbums = [
  {
    name: "Still Here",
    artist: "KR$NA",
    cover: stillHere,
    rating: 8.4,
    year: 2021,
    tracks: ["Intro", "Roll Up", "Lil Bunty", "I Guess", "Saza-e-Maut"],
  },
  {
    name: "Kshama",
    artist: "Seedhe Maut",
    cover: kshama,
    rating: 9.5,
    year: 2024,
    tracks: ["Kshama", "Naya Zamana", "Galtiyaan", "Baatein"],
  },
  {
    name: "Lunch Break",
    artist: "Seedhe Maut",
    cover: lunchBreak,
    rating: 9.0,
    year: 2023,
    tracks: ["Lunch Break", "Do Guna", "Batti"],
  },
  {
    name: "Eyes On The Prize",
    artist: "Karma",
    cover: eotp,
    rating: 8.1,
    year: 2023,
    tracks: ["Eyes On The Prize", "Cold World", "Day Ones"],
  },
  {
    name: "Time Will Tell",
    artist: "KR$NA",
    cover: twt,
    rating: 9.7,
    year: 2023,
    tracks: ["Time Will Tell", "No Cap", "Crisis"],
  },
  {
    name: "Sab Chahiye",
    artist: "Rawal, Bharg",
    cover: sabChahiye,
    rating: 8.2,
    year: 2021,
    tracks: ["Intro", "Roll Up", "Lil Bunty", "I Guess", "Saza-e-Maut"],
  },
  {
    name: "Open Letter",
    artist: "Talha Anjum",
    cover: openLetter,
    rating: 9.1,
    year: 2023,
    tracks: ["Intro", "Roll Up", "Lil Bunty", "I Guess", "Saza-e-Maut"],
  },
  {
    name: "Nayaab",
    artist: "Seedhe Maut",
    cover: nayaab,
    rating: 9.9,
    year: 2022,
    tracks: ["Intro", "Roll Up", "Lil Bunty", "I Guess", "Saza-e-Maut"],
  },
  {
    name: "Tadipaar",
    artist: "MC Stan",
    cover: tadipaar,
    rating: 9.8,
    year: 2020,
    tracks: ["Intro", "Roll Up", "Lil Bunty", "I Guess", "Saza-e-Maut"],
  },
  {
    name: "HARD DRIVE Vol. 1",
    artist: "Raftaar",
    cover: hdv1,
    rating: 8.9,
    year: 2022,
    tracks: ["Intro", "Roll Up", "Lil Bunty", "I Guess", "Saza-e-Maut"],
  },
];

const Rankings = () => {
  // Sort albums by rating in descending order
  const sortedAlbums = [...rankingAlbums].sort((a, b) => b.rating - a.rating);

  return (
    <div className="p-6 flex justify-center mt-20">
      <div className="w-full max-w-3xl">
        <h2 className="text-white text-3xl font-bold mb-6">
          Top Ranked Albums
        </h2>
        <div className="flex flex-col gap-4">
          {sortedAlbums.map((album, index) => (
            <motion.div
              key={index}
              className="bg-[#00E4FF]/10 border border-transparent backdrop-blur-2xl p-4 rounded-lg 
                        flex items-center text-white transition-all duration-300 
                        hover:scale-105 hover:shadow-[0px_0px_20px_#00E4FF]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Left-aligned content */}
              <div className="flex flex-col flex-1">
                <h3 className="text-xl font-semibold mb-1">
                  {index + 1}. {album.name}
                </h3>
                <h2 className="text-gray-300 text-sm">{album.artist}</h2>
              </div>

              <span className="flex justify-center text-gray-400 text-sm w-20">
                {album.year}
              </span>

              {/* Right-aligned rating */}
              <span className="text-yellow-400 font-bold text-lg">
                {album.rating.toFixed(1)}⭐
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rankings;
