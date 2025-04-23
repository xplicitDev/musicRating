import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Import album covers
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

// Album data
const albums = [
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

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load localStorage favorites on mount
  useEffect(() => {
    console.log("Favourites component mounted");
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    console.log("Initial favorites from localStorage:", storedFavorites);
    setFavorites(storedFavorites);
    fetchFavorites();
  }, []);

  const fetchFavorites = async (retries = 3, delay = 1000) => {
    setIsLoading(true);
    setError(null);

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch("http://localhost:8000/api/v1/favorites", {
          method: "GET",
          credentials: "include",
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        let data;
        try {
          data = await response.json();
        } catch (e) {
          data = { message: "Failed to parse JSON response" };
        }

        console.log(`Fetch favorites (attempt ${attempt}):`, {
          status: response.status,
          ok: response.ok,
          headers: Object.fromEntries(response.headers.entries()),
          data,
        });

        if (response.ok) {
          const favoritesData = data.favorites || data.data || data || [];
          const validFavorites = Array.isArray(favoritesData)
            ? favoritesData
            : [];
          console.log("Backend favorites:", validFavorites);

          // Merge backend favorites with localStorage
          const storedFavorites = JSON.parse(
            localStorage.getItem("favorites") || "[]"
          );
          const mergedFavorites = [
            ...storedFavorites,
            ...validFavorites.filter(
              (fav) =>
                !storedFavorites.some((stored) => stored.title === fav.title)
            ),
          ];
          localStorage.setItem("favorites", JSON.stringify(mergedFavorites));
          setFavorites(mergedFavorites);
          setIsLoading(false);
          return;
        } else {
          throw new Error(data.message || `HTTP ${response.status}`);
        }
      } catch (error) {
        console.error(`Fetch favorites error (attempt ${attempt}):`, {
          message: error.message,
          name: error.name,
        });
        if (attempt === retries || error.name === "AbortError") {
          setError(
            `Failed to fetch favorites: ${error.message}. Using local data.`
          );
          const storedFavorites = JSON.parse(
            localStorage.getItem("favorites") || "[]"
          );
          setFavorites(storedFavorites);
          setIsLoading(false);
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  };

  const handleRemoveFromFavorites = async (title) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/favorites/remove",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ title }),
        }
      );

      let data;
      try {
        data = await response.json();
      } catch (e) {
        data = { message: "Invalid or empty response from server" };
      }

      console.log("Remove from favorites:", {
        title,
        status: response.status,
        response: data,
      });

      if (response.ok) {
        const updatedFavorites = favorites.filter((fav) => fav.title !== title);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        alert("Album removed from favorites!");
        setSelectedAlbum(null);
      } else {
        alert(data.message || "Failed to remove from favorites");
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
      const updatedFavorites = favorites.filter((fav) => fav.title !== title);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      alert("Album removed locally due to network error.");
      setSelectedAlbum(null);
    }
  };

  useEffect(() => {
    console.log("Favorites state updated:", favorites);
  }, [favorites]);

  return (
    <div className="p-5 z-30">
      <h2 className="text-white text-2xl font-semibold text-left mb-4 ml-5">
        Your Favorites
      </h2>
      <button
        onClick={() => fetchFavorites()}
        className="bg-[#00E4FF]/10 border border-[#00E4FF] text-white px-4 py-2 rounded-lg hover:bg-[#00E4FF]/20 mb-4 ml-5"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Refresh Favorites"}
      </button>
      <div className="flex flex-wrap justify-center gap-6">
        {error && <p className="text-red-400">{error}</p>}
        {favorites.length === 0 && !isLoading ? (
          <p className="text-gray-400">No favorites yet.</p>
        ) : (
          favorites.map((favorite, index) => {
            const album = albums.find((a) => a.name === favorite.title);
            return (
              <motion.div
                key={index}
                className="relative bg-[#00E4FF]/10 backdrop-blur-2xl border border-transparent text-white p-4 rounded-xl w-56 
                          transition-all duration-300 hover:scale-105 hover:shadow-[0px_0px_20px_#00E4FF] cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.1, rotate: 1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedAlbum(album)}
              >
                <motion.img
                  src={album?.cover || "/placeholder.jpg"}
                  alt={favorite.title}
                  className="rounded-lg mb-4 w-full transition-transform duration-300"
                  whileHover={{ scale: 1.05 }}
                />
                <h3 className="text-xl font-bold group-hover:text-[#00E4FF] transition-all duration-300">
                  {favorite.title}
                </h3>
                <h1 className="text-gray-300">
                  {album?.artist || "Unknown Artist"}
                </h1>
                <div className="flex items-center text-sm text-gray-400 mt-2">
                  <div className="flex items-center">
                    <img
                      src="/Rating.svg"
                      alt="Rating"
                      className="mr-2 w-4 h-4"
                    />
                    <p>{favorite.rating.toFixed(1)}</p>
                  </div>
                  <span className="mx-2">•</span>
                  <p>{favorite.year}</p>
                </div>
              </motion.div>
            );
          })
        )}
        {isLoading && favorites.length === 0 && (
          <p className="text-gray-400">Loading favorites...</p>
        )}
      </div>

      {selectedAlbum && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/70 backdrop-blur-lg z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedAlbum(null)}
        >
          <motion.div
            className="bg-[#1E1E1E] text-white p-6 rounded-xl w-96 shadow-lg relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-6 text-gray-400 hover:text-white text-xl"
              onClick={() => setSelectedAlbum(null)}
            >
              ✖
            </button>
            <img
              src={selectedAlbum.cover}
              alt={selectedAlbum.name}
              className="w-40 h-40 rounded-lg mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-center">
              {selectedAlbum.name}
            </h2>
            <p className="text-center text-gray-400">{selectedAlbum.artist}</p>
            <p className="text-center text-sm text-gray-300 mt-2">
              🔥 Rated {selectedAlbum.rating}/10
            </p>
            <p className="text-center text-sm text-gray-400">
              {selectedAlbum.year}
            </p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Tracklist:</h3>
              <ul className="list-disc list-inside text-gray-300">
                {selectedAlbum.tracks.map((track, idx) => (
                  <li key={idx} className="mb-1">
                    {track}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => handleRemoveFromFavorites(selectedAlbum.name)}
                className="bg-red-500/10 border border-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-500/20 transition-all duration-300"
              >
                🗑 Remove from Favorites
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Favourites;
