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

const Card01 = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewContent, setReviewContent] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Fetch reviews when modal opens and get current user ID
  useEffect(() => {
    if (selectedAlbum) {
      const fetchReviews = async () => {
        try {
          const response = await fetch(
            `http://localhost:8000/api/v1/reviews?movieTitle=${encodeURIComponent(
              selectedAlbum.name
            )}`,
            {
              method: "GET",
              credentials: "include",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          let data;
          try {
            data = await response.json();
          } catch (e) {
            console.error("Reviews parsing error:", e);
            setReviews([]);
            return;
          }

          console.log("Fetch reviews response:", data);

          if (response.ok && data.statusCode === 200) {
            setReviews(data.data.reviews || []);
          } else {
            console.error("Failed to fetch reviews:", data.error);
            setReviews([]);
          }
        } catch (error) {
          console.error("Error fetching reviews:", error);
          setReviews([]);
        }
      };

      const fetchCurrentUser = async () => {
        try {
          const response = await fetch(
            "http://localhost:8000/api/v1/users/me",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              credentials: "include",
            }
          );

          const data = await response.json();
          if (response.ok && data.statusCode === 200) {
            setCurrentUserId(data.data._id);
          } else {
            setCurrentUserId(null);
          }
        } catch (error) {
          console.error("Error fetching current user:", error);
          setCurrentUserId(null);
        }
      };

      fetchReviews();
      fetchCurrentUser();
      setUserRating(0);
      setReviewContent("");
      setEditingReviewId(null);
    }
  }, [selectedAlbum]);

  const handleAddToFavorites = async () => {
    const favoriteData = {
      title: selectedAlbum.name,
      posterUrl: selectedAlbum.cover,
      rating: selectedAlbum.rating,
      year: selectedAlbum.year,
      type: "album",
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/favorites/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(favoriteData),
        }
      );

      let data;
      try {
        data = await response.json();
      } catch (e) {
        data = { message: "Invalid or empty response from server" };
      }

      console.log("Add to favorites:", {
        sent: favoriteData,
        status: response.status,
        response: data,
      });

      if (response.ok) {
        alert("Album added to favorites!");
        const storedFavorites = JSON.parse(
          localStorage.getItem("favorites") || "[]"
        );
        localStorage.setItem(
          "favorites",
          JSON.stringify([
            ...storedFavorites.filter(
              (fav) => fav.title !== favoriteData.title
            ),
            favoriteData,
          ])
        );
        setSelectedAlbum(null);
      } else {
        alert(data.message || "Failed to add to favorites");
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Something went wrong");
    }
  };

  const handleRateMovie = async () => {
    if (userRating < 1 || userRating > 5) {
      alert("Please select a rating between 1 and 5 stars.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/v1/ratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify({
          movieTitle: selectedAlbum.name,
          rating: userRating,
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (e) {
        data = { error: "Invalid response from server" };
      }

      console.log("Rate movie response:", {
        sent: { movieTitle: selectedAlbum.name, rating: userRating },
        status: response.status,
        response: data,
      });

      if (response.ok) {
        alert(data.message || "Rating submitted successfully!");
        setUserRating(0);
      } else {
        alert(
          data.error || `Failed to submit rating (Status: ${response.status})`
        );
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Something went wrong while submitting your rating");
    }
  };

  const handleReviewSubmit = async () => {
    if (!reviewContent.trim()) {
      alert("Review content cannot be empty.");
      return;
    }

    try {
      const url = editingReviewId
        ? `http://localhost:8000/api/v1/review/${editingReviewId}`
        : "http://localhost:8000/api/v1/review";
      const method = editingReviewId ? "PUT" : "POST";
      const token = localStorage.getItem("token");

      console.log("Submitting review:", {
        url,
        method,
        token,
        payload: {
          content: reviewContent.trim(),
          movieTitle: selectedAlbum.name,
        },
      });

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          content: reviewContent.trim(),
          movieTitle: selectedAlbum.name,
        }),
      });

      console.log("Response:", {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      });

      let data;
      try {
        data = await response.json();
      } catch (e) {
        console.error("Response parsing error:", e);
        alert(
          "Failed to parse server response. Check the console for details."
        );
        return;
      }

      console.log("Review submit response:", {
        sent: { content: reviewContent, movieTitle: selectedAlbum.name },
        status: response.status,
        response: data,
      });

      if (response.ok) {
        const message =
          typeof data.message === "string"
            ? data.message
            : `Review ${
                editingReviewId ? "updated" : "submitted"
              } successfully!`;
        alert(message);
        setReviewContent("");
        setEditingReviewId(null);

        // Refresh reviews
        try {
          const reviewsResponse = await fetch(
            `http://localhost:8000/api/v1/reviews?movieTitle=${encodeURIComponent(
              selectedAlbum.name
            )}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              credentials: "include",
            }
          );

          console.log("Reviews response:", {
            status: reviewsResponse.status,
            statusText: reviewsResponse.statusText,
          });

          let reviewsData;
          try {
            reviewsData = await reviewsResponse.json();
          } catch (e) {
            console.error("Reviews parsing error:", e);
            alert("Failed to load reviews. Check the console for details.");
            return;
          }

          console.log("Reviews data:", reviewsData);

          if (reviewsResponse.ok && reviewsData.statusCode === 200) {
            setReviews(reviewsData.data.reviews || []);
          } else {
            console.error("Failed to fetch reviews:", reviewsData);
            alert(
              "Failed to load reviews: " +
                (reviewsData.error || "Unknown error")
            );
          }
        } catch (error) {
          console.error("Error fetching reviews:", error);
          alert("Failed to refresh reviews. Check the console for details.");
        }
      } else {
        if (response.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          window.location.href = "/login"; // Adjust to your login route
        } else if (response.status === 400) {
          alert(data.error || "Invalid review data.");
        } else {
          alert(
            data.error || `Failed to submit review (Status: ${response.status})`
          );
        }
      }
    } catch (error) {
      console.error("Error in review submission process:", error);
      alert(
        "Something went wrong while submitting your review. Check the console for details."
      );
    }
  };

  const handleEditReview = (review) => {
    setReviewContent(review.content);
    setEditingReviewId(review._id);
  };

  const handleDeleteReview = async (reviewId) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/review/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
        }
      );

      let data;
      try {
        data = await response.json();
      } catch (e) {
        data = { error: "Invalid response from server" };
      }

      console.log("Delete review response:", {
        reviewId,
        status: response.status,
        response: data,
      });

      if (response.ok) {
        alert(data.message || "Review deleted successfully!");
        // Refresh reviews
        const reviewsResponse = await fetch(
          `http://localhost:8000/api/v1/reviews?movieTitle=${encodeURIComponent(
            selectedAlbum.name
          )}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            credentials: "include",
          }
        );
        const reviewsData = await reviewsResponse.json();
        if (reviewsResponse.ok && reviewsData.statusCode === 200) {
          setReviews(reviewsData.data.reviews || []);
        }
      } else {
        alert(
          data.error || `Failed to delete review (Status: ${response.status})`
        );
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Something went wrong while deleting your review");
    }
  };

  const renderStars = () => {
    return (
      <div className="flex justify-center gap-1 mt-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setUserRating(star)}
            className={`text-2xl ${
              star <= userRating ? "text-yellow-400" : "text-gray-400"
            } hover:text-yellow-400 transition-all duration-200`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="p-5 z-30">
      <h2 className="text-white text-2xl font-semibold text-left mb-4 ml-5">
        Popular Projects
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {albums.map((album, index) => (
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
              src={album.cover}
              alt={album.name}
              className="rounded-lg mb-4 w-full transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
            />
            <h3 className="text-xl font-bold group-hover:text-[#00E4FF] transition-all duration-300">
              {album.name}
            </h3>
            <h1 className="text-gray-300">{album.artist}</h1>
            <div className="flex items-center text-sm text-gray-400 mt-2">
              <div className="flex items-center">
                <img src="/Rating.svg" alt="Rating" className="mr-2 w-4 h-4" />
                <p>{album.rating.toFixed(1)}</p>
              </div>
              <span className="mx-2">•</span>
              <p>{album.year}</p>
            </div>
          </motion.div>
        ))}
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
            className="bg-[#1E1E1E] text-white p-6 rounded-xl w-96 shadow-lg relative max-h-[90vh] overflow-y-auto"
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
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Rate this Album:</h3>
              {renderStars()}
              <div className="flex justify-center mt-2">
                <button
                  onClick={handleRateMovie}
                  className="bg-[#00E4FF]/10 border border-[#00E4FF] text-white px-4 py-2 rounded-lg hover:bg-[#00E4FF]/20 transition-all duration-300"
                >
                  Submit Rating
                </button>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Write a Review:</h3>
              <textarea
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full h-24 p-2 bg-[#2A2A2A] text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#00E4FF] transition-all duration-200"
              />
              <div className="flex justify-center mt-2 gap-2">
                <button
                  onClick={handleReviewSubmit}
                  className="bg-[#00E4FF]/10 border border-[#00E4FF] text-white px-4 py-2 rounded-lg hover:bg-[#00E4FF]/20 transition-all duration-300"
                >
                  {editingReviewId ? "Update Review" : "Submit Review"}
                </button>
                {editingReviewId && (
                  <button
                    onClick={() => {
                      setReviewContent("");
                      setEditingReviewId(null);
                    }}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-all duration-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Reviews:</h3>
              {reviews.length === 0 ? (
                <p className="text-gray-400 text-center">No reviews yet.</p>
              ) : (
                <div className="space-y-4 max-h-60 overflow-y-auto">
                  {reviews.map((review) => (
                    <div
                      key={review._id}
                      className="bg-[#2A2A2A] p-3 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        {review.owner.avatar ? (
                          <img
                            src={review.owner.avatar}
                            alt={review.owner.username}
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white">
                            {review.owner.username[0].toUpperCase()}
                          </div>
                        )}
                        <p className="font-semibold text-gray-200">
                          {review.owner.username}
                        </p>
                      </div>
                      <p className="text-gray-300 mt-1">{review.content}</p>
                      <p className="text-gray-500 text-sm mt-1">
                        Posted on{" "}
                        {new Date(review.createdAt).toLocaleDateString()}
                        {review.createdAt !== review.updatedAt && " (Edited)"}
                      </p>
                      {currentUserId && review.owner._id === currentUserId && (
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleEditReview(review)}
                            la
                            className="text-[#00E4FF] hover:underline text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteReview(review._id)}
                            className="text-red-400 hover:underline text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleAddToFavorites}
                className="bg-[#00E4FF]/10 border border-[#00E4FF] text-white px-4 py-2 rounded-lg hover:bg-[#00E4FF]/20 transition-all duration-300"
              >
                ➕ Add to Favorites
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Card01;
